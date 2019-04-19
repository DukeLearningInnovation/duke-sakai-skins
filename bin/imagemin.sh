#!/usr/bin/env bash

echo "bin/imagemin.sh start"
echo "imagemin src/$1/images/* -o=dist/$1/images"

rm -rf dist/$1/images
imagemin src/$1/images/* --out-dir=dist/$1/images

echo "bin/imagemin.sh end"

