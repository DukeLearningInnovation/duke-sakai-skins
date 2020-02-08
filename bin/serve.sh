#!/usr/bin/env bash





# this exists for when Longsight changes the version on their deployment
# case $1 in
#     sakai-test.duke.edu)
#         SVR_SKIN=$(expr $1 : ".*\(duke-[a-zA-Z]*\).*")
#         SERVER_V='af'
#         ;;
#     sakai.duke.edu)
#         SVR_SKIN=$(expr $1 : ".*\(duke-[a-zA-Z]*\).*")
#         SERVER_V='ai'
#         ;;
#     qa20-mysql.nightly.sakaiproject.org)
#         SVR_SKIN='morpheus-default'
#         SERVER_V='867ff688'
#         ;;
#     *)
#         SVR_SKIN=$(expr $1 : ".*\(duke-[a-zA-Z]*\).*")
#         SERVER_V='ai'
# esac

# if ! [ $SVR_SKIN ]; then
#     SVR_SKIN=$SKIN
# fi

# Send to nightly server for morpheus
if [[ $1 == *"20.x/morpheus-"* ]]; then 
    SVR='trunk-mysql.nightly.sakaiproject.org'
    SVR_SKIN='morpheus-default'
    SERVER_V='30b89538'
    printf "Copying skin on $HOSTNAME from  dist/$1 to dev/$SVR/$SVR_SKIN for browser development\n"

    rm -rf dev/$SVR/library/skin/$SVR_SKIN
    mkdir -p dev/$SVR/library/skin/$SVR_SKIN
    cp -R dist/$1default/* dev/$SVR/library/skin/$SVR_SKIN/

    find dev/$SVR/library/skin/$SVR_SKIN -type f -name '*.css' -exec mv {} {}%3fversion=$SERVER_V \;
    find dev/$SVR/library/skin/$SVR_SKIN -type f -name '*.js' -exec mv {} {}%3fversion=$SERVER_V \;
else
# if a server isn't specific, serve to sakai and sakai-test
    SERVER_V='ai'
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