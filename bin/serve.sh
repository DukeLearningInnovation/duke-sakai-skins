#!/usr/bin/env bash

SERVER_V='ah'



# this exists for when Longsight changes the version on their deployment
case $2 in
    sakai-test.duke.edu)
        SVR_SKIN=$(expr $1 : ".*\(duke-[a-zA-Z]*\).*")
        SERVER_V='af'
        ;;
    sakai.duke.edu)
        SVR_SKIN=$(expr $1 : ".*\(duke-[a-zA-Z]*\).*")
        SERVER_V='ah'
        ;;
    nightly)
        SVR_SKIN='morpheus-default'
        SERVER_V='65c2b156'
        ;;
    *)
        SVR_SKIN=$(expr $1 : ".*\(duke-[a-zA-Z]*\).*")
        SERVER_V='ah'
esac

if ! [ $SVR_SKIN ]; then
    SVR_SKIN=$SKIN
fi

# If a server is specified
if ! [ -z "$2" ]; then 
    printf "Copying skin from $HOSTNAME dist/$1 to dev/$2/$SVR_SKIN for browser development\n"

    rm -rf dev/$2/library/skin/$SVR_SKIN
    mkdir -p dev/$2/library/skin/$SVR_SKIN
    cp -R dist/$1/* dev/$2/library/skin/$SVR_SKIN/

    find dev/$2/library/skin/$SVR_SKIN -type f -name '*.css' -exec mv {} {}%3fversion=$SERVER_V \;
    find dev/$2/library/skin/$SVR_SKIN -type f -name '*.js' -exec mv {} {}%3fversion=$SERVER_V \;
else
# if a server isn't specific, serve to sakai and sakai-test

    #serve to sakai
    printf "Copying skin from $HOSTNAME dist/$1 to dev/sakai.duke.edu/$SVR_SKIN for browser development\n"

    rm -rf dev/sakai.duke.edu/library/skin/$SVR_SKIN
    mkdir -p dev/sakai.duke.edu/library/skin/$SVR_SKIN
    cp -R dist/$1/* dev/sakai.duke.edu/library/skin/$SVR_SKIN/

    find dev/sakai.duke.edu/library/skin/$SVR_SKIN -type f -name '*.css' -exec mv {} {}%3fversion=$SERVER_V \;
    find dev/sakai.duke.edu/library/skin/$SVR_SKIN -type f -name '*.js' -exec mv {} {}%3fversion=$SERVER_V \;

    #set for sakai-test
    SERVER_V='af'
    printf "Copying skin from $HOSTNAME dist/$1 to dev/sakai-test.duke.edu/$SVR_SKIN for browser development\n"

    rm -rf dev/sakai-test.duke.edu/library/skin/$SVR_SKIN
    mkdir -p dev/sakai-test.duke.edu/library/skin/$SVR_SKIN
    cp -R dist/$1/* dev/sakai-test.duke.edu/library/skin/$SVR_SKIN/

    find dev/sakai-test.duke.edu/library/skin/$SVR_SKIN -type f -name '*.css' -exec mv {} {}%3fversion=$SERVER_V \;
    find dev/sakai-test.duke.edu/library/skin/$SVR_SKIN -type f -name '*.js' -exec mv {} {}%3fversion=$SERVER_V \;
fi

echo "//////////////////////// bin/serve.sh done ///////////////////////////////"