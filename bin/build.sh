#!/usr/bin/env bash
SAK_V='20.x';

build_scss () {
    npm run scss -- $SKIN;
}

build_js () {
    npm run uglify -- $SKIN;
}

build_images () {
    npm run imagemin -- $SKIN;
}

build_fonts () {
    npm run fonts -- $SKIN;
}

if [[ $1 == "change" ]] && [[ ! "$2" == *"morpheus"* ]]; then
    DIRECTORY=${2%/*};
    FILEEXTENSION=${2##*.};
    SKIN=$(expr $2 : ".*\($SAK_V/duke-[a-zA-Z]*\).*");
    
    case $FILEEXTENSION in
        scss)
            build_scss
            ;;
        js)
            build_js
            ;;
        png|jpg|jpeg|gif)
            build_images
            ;;
        css|map|sh)
            # do nothing
            ;;
        
        *)
            printf "Unsure what to do with changes to $1\n";
    esac
    if ! [ -z "$3" ]; then 
        npm run serve $SKIN $3; 
    else 
        npm run serve $SKIN;
    fi
elif [[ $1 == "change" ]] && [[ "$2" == *"morpheus"* ]]; then
    
    DIRECTORY=${2%/*};
    FILEEXTENSION=${2##*.};
    SAK_V='20.x';
    SKIN="$SAK_V/morpheus-";
    
    case $FILEEXTENSION in
        scss)
            build_scss
            ;;
        js)
            build_js
            ;;
        png|jpg|jpeg|gif)
            build_images
            ;;
        css|map|sh)
            # do nothing
            ;;
        
        *)
            printf "Unsure what to do with changes to $1\n";
    esac
    
    npm run serve $SKIN; 

elif [ $1 = "build" ]; then
    SKIN=$2;
    rm -rf dist/$2
    mkdir -p dev/$2
    
    build_scss
    build_js
    build_images
    build_fonts
    npm run autoprefixer -- dist/$SKIN/*.css;
fi;

