#!/usr/bin/env bash
FILEEXTENSION=${3##*.}

if [ $FILEEXTENSION = "png" ]; then
    SAK_V_CUR='12.x'
    SAK_V_NEW='19.x'
    FONTAWESOME='font-awesome-sass-4.7.0/assets/fonts/font-awesome'
    BOOTSTRAP='bootstrap-sass-3.3.7/assets/fonts/boostrap/'
    echo "bin/build-fonts.sh $1 start"

    mkdir -p dist/$SAK_V_NEW/$1/fonts/font-awesome
    cp -R src/$SAK_V_NEW/$1/$FONTAWESOME/ dist/$SAK_V_NEW/$1/fonts/font-awesome

    mkdir -p dist/$SAK_V_NEW/$1/fonts/bootstrap
    cp -R src/$SAK_V_NEW/$1/$BOOSTRAP/ dist/$SAK_V_NEW/$1/fonts/bootsrap

    echo "bin/build-fonts.sh $1 end"
fi