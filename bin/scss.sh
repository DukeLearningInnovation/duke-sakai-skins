#!/usr/bin/env bash

FILEEXTENSION=${3##*.}

if [ $FILEEXTENSION = "scss" ]; then
    echo "bin/scss.sh $1 start: Compiling SCSS to CSS"
    SAK_V_CUR='12.x'
    SAK_V_NEW='19.x'
    DATE=`date +%Y-%m-%d_%H-%M-%S`

    node-sass -r src/$SAK_V_NEW/$1 \
    -o dist/$SAK_V_NEW/$1 \
    --include-path src/$SAK_V_NEW/$1/sass/ \
    --include-path src/$SAK_V_NEW/$1/bootstrap-sass-3.3.7/assets/stylesheets/ \
    --include-path src/$SAK_V_NEW/$1/font-awesome-sass-4.7.0/assets/stylesheets/ \
    --output-style compressed \
    --output-file "tool.css" \
    --source-map-root https://sakai.duke.edu \
    --source-map true

    mv -v dist/$SAK_V_NEW/$1/sass/* dist/$SAK_V_NEW/$1/
    rm -rf dist/$SAK_V_NEW/$1/sass
    printf "\n/* Compiled on $DATE */\n" >> dist/$SAK_V_NEW/$1/tool.css

    echo "bin/scss.sh $1 done"
fi