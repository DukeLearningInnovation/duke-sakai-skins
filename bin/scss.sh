#!/usr/bin/env bash

echo "bin/scss.sh $1 start: Compiling SCSS to CSS"

if [[ $1 == *"morpheus"* ]]; then
    SKIN='morpheus-default';
    #emulate maven
    mkdir -p tmp/src/$1default/sass/ tmp/dist/$1default dist/$1default
    touch tmp/src/$1default/sass/_customization.scss

    cp -R src/$1master/sass/ tmp/src/$1default/sass/
    
    node-sass -r tmp/src/$1default \
    -o tmp/dist/$1default \
    --include-path tmp/src/$1default/sass/ \
    --include-path src/$1master/bootstrap-sass-3.3.7/assets/stylesheets/ \
    --include-path src/$1master/font-awesome-sass-4.7.0/assets/stylesheets/ \
    --output-style compressed \
    --output-file "tool.css"

    mv -f tmp/dist/$1default/sass/* dist/$1default/
    rm -rf tmp/
else
    MORPHEUS='19.x/morpheus-master'
    DUKE_DEFAULT='19.x/duke-default'
    DATE=`date +%Y-%m-%d_%H-%M-%S`

    mkdir -p tmp/src/$1/sass tmp/dist/$1 dist/$1
    cp src/$1/sass/* tmp/src/$1/sass/

    cp src/$MORPHEUS/sass/access.scss tmp/src/$1/sass/
    cp src/$MORPHEUS/sass/portal.scss tmp/src/$1/sass/

    if [ $1 != "19.x/duke-default" ]; then
        cp src/$DUKE_DEFAULT/sass/print.scss tmp/src/$1/sass/
    fi
        node-sass -r tmp/src/$1 \
        -o tmp/dist/$1 \
        --include-path src/$MORPHEUS/sass/ \
        --include-path src/$MORPHEUS/bootstrap-sass-3.3.7/assets/stylesheets/ \
        --include-path src/$MORPHEUS/font-awesome-sass-4.7.0/assets/stylesheets/ \
        --include-path src/$DUKE_DEFAULT/sass/ \
        --include-path tmp/src/$1/sass/ \
        --output-style compressed \
        --output-file "tool.css" \
        --source-map-root / \
        --source-map-embed true


    # echo '/* Compiled on ${DATE} */' | cat - tmp/dist/$1/sass/tool.css > tmp/dist/$1/temp && mv tmp/dist/$1/temp tmp/dist/$1/sass/tool.css

    mv -f tmp/dist/$1/sass/* dist/$1/
    rm -rf tmp/
    # rm -rf tmp/dist/$1/sass
    # printf "\n/* Compiled on $DATE */\n" >> dist/$1/tool.css

    # rm -f dist/$1/*.css dist/$1/*.css.map
    # mv -v tmp/dist/$1/* dist/$1/








    # cp src/$MORPHEUS/sass/access.scss src/$1/sass/
    # cp src/$MORPHEUS/sass/portal.scss src/$1/sass/
    # if [ $1 != "19.x/duke-default" ]; then
    #     cp src/$DUKE_DEFAULT/sass/print.scss src/$1/sass/
    # fi
    # node-sass -r src/$1 \
    # -o dist/$1 \
    # --include-path src/$MORPHEUS/sass/ \
    # --include-path src/$MORPHEUS/bootstrap-sass-3.3.7/assets/stylesheets/ \
    # --include-path src/$MORPHEUS/font-awesome-sass-4.7.0/assets/stylesheets/ \
    # --include-path src/$DUKE_DEFAULT/sass/ \
    # --include-path src/$1/sass/ \
    # --output-style compressed \
    # --output-file "tool.css" \
    # --source-map-root / \
    # --source-map dist/$1/ \
    # --source-map-embed false

    # mv -v dist/$1/sass/* dist/$1/
    # rm -rf dist/$1/sass
    # printf "\n/* Compiled on $DATE */\n" >> dist/$1/tool.css

    # rm src/$1/sass/access.scss
    # rm src/$1/sass/portal.scss


fi

echo "bin/scss.sh $1 done"
