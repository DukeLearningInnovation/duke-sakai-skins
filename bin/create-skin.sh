#!/usr/bin/env bash
# Creates a new skin based off morpheus-master
# If you want to create a skin based off duke-default, use sub-skins

# Parameters
# $1 = name of the new skin
echo "bin/create-skin.sh start: creating skin $1"
SAK_V='19.x'
MORPHEUS='19.x/morpheus-master'

### Check if a directory does not exist ###
if [ -d "src/$SAK_V/$1" ] 
then
    echo "Directory src/$SAK_V/$1 already exists. Please delete and try again." 
    exit 9999 # die with error code 9999
fi

echo "Importing from $MORPHEUS..."

#scss
mkdir -p src/$SAK_V/$1/sass
# cp src/$MORPHEUS/sass/_defaults.scss src/$SAK_V/$1/sass/_defaults.scss
cp src/$MORPHEUS/sass/_customization.scss src/$SAK_V/$1/sass/_customization.scss
cp src/$MORPHEUS/sass/tool.scss src/$SAK_V/$1/sass/tool.scss
printf "\n\n@import \"overrides\";\n" >> src/$SAK_V/$1/sass/tool.scss
sed -i '' -e 's/@import "defaults";/@import "customization";/' src/$SAK_V/$1/sass/tool.scss 
touch src/$SAK_V/$1/sass/_overrides.scss
if ! [ $1 = "duke-default" ]; then
    printf "@import \"../../duke-default/sass/defaults\";\n" >> src/$SAK_V/$1/sass/_customization.scss
    printf "@import \"../../duke-default/sass/defaults\";\n" >> src/$SAK_V/$1/sass/_overrides.scss
    printf "@import \"../../duke-default/sass/overrides\";\n" >> src/$SAK_V/$1/sass/_overrides.scss
fi

#javascript
mkdir -p src/$SAK_V/$1/js/src
touch src/$SAK_V/$1/js/src/_customization.js
printf "(function ($) {\n\tconsole.log('$1/_customization.js loaded');\n}) (\$PBJQ);" >> src/$SAK_V/$1/js/src/_customization.js
#images
mkdir -p src/$SAK_V/$1/images
cp -R src/$MORPHEUS/images/ src/$SAK_V/$1/images

## wrapup
echo "bin/create-skin.sh done creating $1"