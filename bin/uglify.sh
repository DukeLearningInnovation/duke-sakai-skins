#!/usr/bin/env bash
FILEEXTENSION=${3##*.}

if [ $FILEEXTENSION = "js" ] || [ $FILEEXTENSION = "{{changed}}" ]; then
    echo "bin/uglify.sh $1 start"
    SAK_V_CUR='12.x'
    SAK_V_NEW='19.x'
    DATE=`date +%Y-%m-%d_%H-%M-%S`

    rm -rf dist/$SAK_V_NEW/$1/js
    mkdir dist/$SAK_V_NEW/$1/js
    uglifyjs src/$SAK_V_NEW/$1/js/src/*.js -o dist/$SAK_V_NEW/$1/js/morpheus.scripts.js && \
    uglifyjs src/$SAK_V_NEW/$1/js/src/*.js -m -c -o dist/$SAK_V_NEW/$1/js/morpheus.scripts.min.js
    printf "\n/* Compiled on $DATE */\n" >> dist/$SAK_V_NEW/$1/js/morpheus.scripts.min.js

    mkdir dist/$SAK_V_NEW/$1/js/lib
    cp -R src/$SAK_V_NEW/$1/js/lib/ dist/$SAK_V_NEW/$1/js/lib

    mkdir dist/$SAK_V_NEW/$1/js/ie
    cp -R src/$SAK_V_NEW/$1/js/ie/ dist/$SAK_V_NEW/$1/js/ie

    echo "bin/uglify.sh $1 done"
fi