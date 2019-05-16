#!/usr/bin/env bash

echo "bin/uglify.sh $1 start"

MORPHEUS='19.x/morpheus-master'
DATE=`date +%Y-%m-%d_%H-%M-%S`

rm -rf dist/$1/js
mkdir dist/$1/js

if [ $1 == "19.x/duke-default" ]; then
    terser src/$MORPHEUS/js/src/*.js src/$1/js/src/*.js  \
           -o dist/$1/js/morpheus.scripts.min.js \
           --verbose --warn --compress --mangle \
           --beautify max_line_len=650,beautify=false
else
    terser src/$MORPHEUS/js/src/*.js src/19.x/duke-default/js/src/*.js src/$1/js/src/*.js  \
        -o dist/$1/js/morpheus.scripts.min.js \
        --verbose --warn --compress --mangle \
        --beautify max_line_len=650,beautify=false
fi

# terser dist/$1/js/morpheus.scripts.js -m -o dist/$1/js/morpheus.scripts.min.js -b max_line_len=650,beautify=false --verbose

printf "\n/* Compiled on $DATE */\n" >> dist/$1/js/morpheus.scripts.min.js

mkdir dist/$1/js/lib
cp -R src/$MORPHEUS/js/lib/ dist/$1/js/lib

mkdir dist/$1/js/ie
cp -R src/$MORPHEUS/js/ie/ dist/$1/js/ie

echo "bin/uglify.sh $1 done"
