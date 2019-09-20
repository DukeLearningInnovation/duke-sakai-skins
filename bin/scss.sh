#!/usr/bin/env bash

echo "bin/scss.sh $1 start: Compiling SCSS to CSS"

MORPHEUS='19.x/morpheus-master'
DUKE_DEFAULT='19.x/duke-default'
DATE=`date +%Y-%m-%d_%H-%M-%S`
cp src/$MORPHEUS/sass/access.scss src/$1/sass/
cp src/$MORPHEUS/sass/portal.scss src/$1/sass/
if [ $1 != "19.x/duke-default" ]; then
    cp src/$DUKE_DEFAULT/sass/print.scss src/$1/sass/
fi
node-sass -r src/$1 \
-o dist/$1 \
--include-path src/$MORPHEUS/sass/ \
--include-path src/$MORPHEUS/bootstrap-sass-3.3.7/assets/stylesheets/ \
--include-path src/$MORPHEUS/font-awesome-sass-4.7.0/assets/stylesheets/ \
--include-path src/$DUKE_DEFAULT/sass/ \
--include-path src/$1/sass/ \
--output-style compressed \
--output-file "tool.css" \
--source-map-root / \
--source-map dist/$1/ \
--source-map-embed false

mv -v dist/$1/sass/* dist/$1/
rm -rf dist/$1/sass
printf "\n/* Compiled on $DATE */\n" >> dist/$1/tool.css

rm src/$1/sass/access.scss
rm src/$1/sass/portal.scss
# rm src/$1/sass/print.scss

echo "bin/scss.sh $1 done"
