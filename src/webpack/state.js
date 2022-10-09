
const esprima = require('esprima');
const escodegen = require('../escodegen/escodegen-jsx')

function _get_identifiers(can_be_set, set, get, expr) {
    if (!expr) return ;
    if (expr.expression) { return _get_identifiers(can_be_set, set, get, expr.expression) }

    if (expr.type == "CallExpression") {
        _get_identifiers(false, set, get, expr.callee);
        
        for (let arg of expr.arguments) _get_identifiers(false, set, get, arg);
    }
    if (expr.type == "Identifier") {
        if (can_be_set) set.add(expr.name)
        else get.add(expr.name)

        return ;
    }

    if (expr.left)  _get_identifiers(can_be_set, set, get, expr.left);
    if (expr.right) _get_identifiers(false, set, get, expr.right);
}

function get_identifiers(expression) {
    let Setters = new Set();
    let Getters = new Set();
    
    if (expression?.expression?.type == "AssignmentExpression") {
        _get_identifiers(true,  Setters, Getters, expression.expression.left);
        _get_identifiers(false, Setters, Getters, expression.expression.right);
    } else if (expression) _get_identifiers(false, Setters, Getters, expression);

    return { Setters, Getters }
}

function runDeclaration (body, scope_states, create_new_scope=false) {
    let scope = create_new_scope ? new Set() : scope_states;
    let functions = {}
    if (create_new_scope) for (let state of scope_states) scope.add(state)

    let idx = 0;
    while (idx < body.length) {
        let declaration = body[idx];

        if (declaration.body) {
            if (declaration.type == "FunctionDeclaration" && declaration.id && declaration.id.name && declaration.id.name.startsWith("__molyb_render_")) {
                let name = declaration.id.name.replace("__molyb_render_", "");
                scope.add(name)
                functions[name] = declaration;
            }

            runDeclaration(declaration.body.body, scope, declaration.type == "FunctionDeclaration");
        } else {
            if (declaration.type == "ExpressionStatement") {
                let { Setters, Getters } = get_identifiers(declaration);
                
                for (let X of Setters) {
                    if (scope.has(X)) {
                        const render_function = `__molyb_render_${X}`

                        idx += 1;
                        body.splice(idx, 0, { "type": "ExpressionStatement", "expression": { "type": "CallExpression", "callee": { "type": "Identifier", "name": render_function }, "arguments": []}})
                    }
                }
            }
        };

        idx += 1;
    }
}

module.exports = function transformState (code) {
    let index       = -1;
    let state_count = 0;
    const names = [];
    while ((index = code.indexOf("state", index + 1)) != -1) {
        if (index != 0 && code[index - 1] != ' ' && code[index - 1] != "\t" && code[index - 1] != "\n") continue;
        if (index + 5 < code.length && code[index + 5] != ' ' && code[index + 5] != "\t" && code[index + 5] != "\n") continue;
        
        let sindex = index;
        index = index + 5;
        while (index < code.length && (code[index] == " " || code[index] == "\t")) index += 1;

        if (index < code.length && code[index] != ';' && code[index] != '\n') {
            let start_i_name = index;
            while (index < code.length && !" \t\n\r;=+-*/^&|()[]{}<>.".includes(code[index])) index += 1;

            let name = code.substring(start_i_name, index);

            let render_template = 0;
            code = code.substring(0, sindex) + `function __molyb_render_${name}(from_scope=0) {console.log(from_scope); if (from_scope == 1) throw "Scope recursion detected"; let scope = 1; }; let ` + code.substring(start_i_name); // TODO create render function scope
        
            state_count += 1;
        }
    }

    if (state_count == 0) return code;

    let program = esprima.parseModule(code, { jsx: true })
    runDeclaration(program.body, new Set(), true);
    code = escodegen.generate(program);
    console.log(code)
    return code;
}

