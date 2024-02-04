
for file in examples/**/*.html; do
    dir="${file%/*}"
    echo $file $dir

    mkdir -p lib/$dir
    cp $file lib/$file
done
