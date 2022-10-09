
const babel = require('@babel/core')
const fs    = require('fs')
const babel_config = JSON.parse(fs.readFileSync('./babel.config.json'))
const path  = require('path')
const stateTransformer = require(path.join(__dirname, 'state'))

/**
 * Esprima based loader
 * @param {string|Buffer} content Content of the resource file
 * @param {object} [map] SourceMap data consumable by https://github.com/mozilla/source-map
 * @param {any} [meta] Meta data, could be anything
 */
module.exports = function webpackLoader(content, map, meta) {
    content = stateTransformer(content);
    content = babel.transformSync(content, babel_config).code;
    return content;
}