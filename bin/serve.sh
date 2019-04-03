#!/usr/bin/env bash
echo "bin/serve.sh start"
SAK_V_CUR='12.x'
SAK_V_NEW='19.x'
DATE=`date +%Y-%m-%d_%H-%M-%S`

#list any servers you want to use Chrome Overrides on here
DEV='dukedev.longsight.com'
TEST='sakai-test.duke.edu'
PROD='sakai.duke.edu'
NIGHTLY='qa1-us.nightly.sakaiproject.org'

COLOR='\033[1;35m'
NC='\033[0m'

if [ $1 ] && [ $2 ];
    then
        USER_ENV=$2
        USER_SKIN=$1
else
    echo "You can skip the selection by using the command in this format"
    echo "bash bin/serve.sh ENVIRONMENT SKIN"
    echo "or"
    echo "npm run serve ENVIRONMENT SKIN"

    printf "=============================================\n"
    printf "Which ENVIRONMENT to do want to dev against?\n"
    printf "=============================================\n"
    printf "\tdev: ${COLOR}dukedev.longsight.com${NC}\n"
    printf "\ttest:${COLOR}sakai-test.duke.edu${NC}\n"
    printf "\tprod:${COLOR}sakai.duke.edu${NC}\n"
    printf "\tnightly: ${COLOR}qa1-us.nightly.sakaiproject.org${NC}\n"
    printf "\tor manually enter a domain name\n"

    read USER_ENV

    printf "=============================================\n"
    printf "Which SKIN are you developing?\n"
    printf "=============================================\n"
    printf "\t${COLOR}duke-default${NC}\n"
    printf "\t${COLOR}duke-extend${NC}\n"
    printf "\tor other skin name\n"

    read USER_SKIN
fi

case $USER_ENV in
dev)
    ENV=$DEV
    VERSION='ae'
    ;;
test)
    ENV=$TEST
    VERSION='ae'
    ;;
prod)
    ENV=$PROD
    VERSION='ae'
    ;;
nightly)
    ENV=$NIGHTLY
    VERSION='b5f86457'
    SVR_SKIN='morpheus-default'
    ;;
*)
    ENV=$USER_ENV
    SVR_SKIN='morpheus-default'
    VERSION='65c2b156'
esac

SKIN=$USER_SKIN

if ! [ $SVR_SKIN ]
    then
        SVR_SKIN=$SKIN
fi

printf "Copying skin from dist/$SAK_V_NEW/${COLOR}$SKIN${NC} to dev/${COLOR}$ENV${NC}/${COLOR}$SVR_SKIN${NC} for browser development\n"

rm -rf dev/$ENV/library/skin/$SVR_SKIN
mkdir -p dev/$ENV/library/skin/$SVR_SKIN
cp -R dist/$SAK_V_NEW/$SKIN/ dev/$ENV/library/skin/$SVR_SKIN

if [[ $USER_ENV = "nightly" ]]; then
    mv dev/$ENV/library/skin/$SVR_SKIN/images/logo-duke@2x-blue.png dev/$ENV/library/skin/$SVR_SKIN/images/logo-jewel.png
fi

find dev/$ENV/library/skin/$SVR_SKIN -type f -name '*.css' -exec mv {} {}%3fversion=$VERSION \;
find dev/$ENV/library/skin/$SVR_SKIN -type f -name '*.js' -exec mv {} {}%3fversion=$VERSION \;

echo "bin/serve.sh done"