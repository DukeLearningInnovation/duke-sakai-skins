#!/usr/bin/env bash
FILEEXTENSION=${3##*.}

if [[ $FILEEXTENSION = "png" ]] || [[ $FILEEXTENSION = "{{changed}}" ]]; then
    echo "bin/imagemin.sh start"
    SAK_V_CUR='12.x'
    SAK_V_NEW='19.x'
    echo "imagemin src/$SAK_V_NEW/$1/images/* -o=dist/$SAK_V_NEW/$1/images"
    rm -rf dist/$SAK_V_NEW/$1/images
    imagemin src/$SAK_V_NEW/$1/images/* --out-dir=dist/$SAK_V_NEW/$1/images
    echo "bin/imagemin.sh end"

fi