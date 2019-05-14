SERVER_V='ae'
# this exists for when Longsight changes the version on their deployment
case $2 in
    dukedev.longsight.com)
        SVR_SKIN=$(expr $1 : ".*\(duke-[a-zA-Z]*\).*")
        ;;
    sakai-test.duke.edu)
        SVR_SKIN=$(expr $1 : ".*\(duke-[a-zA-Z]*\).*")
        ;;
    sakai.duke.edu)
        SVR_SKIN=$(expr $1 : ".*\(duke-[a-zA-Z]*\).*")
        SERVER_V='ag'
        ;;
    *)
        SVR_SKIN='morpheus-default'
        SERVER_V='65c2b156'
esac

if ! [ $SVR_SKIN ]; then
    SVR_SKIN=$SKIN
fi

printf "Copying skin from dist/$1 to dev/$2/$SVR_SKIN for browser development\n"

rm -rf dev/$2/library/skin/$SVR_SKIN
mkdir -p dev/$2/library/skin/$SVR_SKIN
cp -R dist/$1/ dev/$2/library/skin/$SVR_SKIN

find dev/$2/library/skin/$SVR_SKIN -type f -name '*.css' -exec mv {} {}%3fversion=$SERVER_V \;
find dev/$2/library/skin/$SVR_SKIN -type f -name '*.js' -exec mv {} {}%3fversion=$SERVER_V \;

echo "bin/serve.sh done"