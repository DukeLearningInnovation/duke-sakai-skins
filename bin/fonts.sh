#!/usr/bin/env bash
MORPHEUS='19.x/morpheus-master'
FONTAWESOME='font-awesome-sass-4.7.0/assets/fonts/font-awesome'
BOOTSTRAP='bootstrap-sass-3.3.7/assets/fonts/bootstrap'

echo "bin/build-fonts.sh $1 start"

mkdir -p dist/$1/fonts/font-awesome
cp -R src/$MORPHEUS/$FONTAWESOME/* dist/$1/fonts/font-awesome/

mkdir -p dist/$1/fonts/bootstrap
cp -R src/$MORPHEUS/$BOOTSTRAP/* dist/$1/fonts/bootstrap/

echo "bin/build-fonts.sh $1 end"
