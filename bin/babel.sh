#!/usr/bin/env bash

echo "bin/babel.sh $1 start"

MORPHEUS='19.x/morpheus-master'
DATE=`date +%Y-%m-%d_%H-%M-%S`

rm -rf dist/$1/js
mkdir dist/$1/js

if [ $1 == "19.x/duke-default" ]; then
    babel --verbose src/$MORPHEUS/js/src src/$1/js/src --out-file dist/$1/js/morpheus.scripts.js
    
else
    babel --verbose src/$MORPHEUS/js/src src/19.x/duke-default/js/src src/$1/js/src --out-file dist/$1/js/morpheus.scripts.js
fi

babel dist/$1/js/morpheus.scripts.js --minified --out-file dist/$1/js/morpheus.scripts.min.js

printf "\n/* Compiled on $DATE */\n" >> dist/$1/js/morpheus.scripts.min.js

mkdir dist/$1/js/lib
cp -R src/$MORPHEUS/js/lib/ dist/$1/js/lib

mkdir dist/$1/js/ie
cp -R src/$MORPHEUS/js/ie/ dist/$1/js/ie

echo "bin/babel.sh $1 done"
