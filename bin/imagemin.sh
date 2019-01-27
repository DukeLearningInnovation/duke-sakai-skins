#!/usr/bin/env bash
FILEEXTENSION=${3##*.}

if [ $FILEEXTENSION = "png" ]; then
    echo "bin/imagemin.sh start"
    SAK_V_CUR='12.x'
    SAK_V_NEW='19.x'
    imagemin src/!SAK_V_NEW/$1/images/* -o dist/$SAK_V_NEW/$1/images
    echo "bin/imagemin.sh end"
fi