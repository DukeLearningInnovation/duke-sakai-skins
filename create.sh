#change this to the directory of your sakai clone
SAKAI='/Users/mg287/Cloud/GoogleDrive/dev/profmikegreene/sakai-master-docker/maven/src'

#change this to the directory your duke-sakai-skins is cloned to
DSS=' /Users/mg287/Cloud/GoogleDrive/dev/dukelearninginnovation/duke-sakai-skins'

#change this to the version of sakai you want to checkout from github
RELEASE='12.x'

#don't change this
MM='/library/src/morpheus-master'

echo "///////////////////////////"
echo "Updating $SAKAI to $RELEASE"
echo "///////////////////////////"
cd $SAKAI
git pull origin $RELEASE
git checkout $RELEASE

echo "///////////////////////////"
echo "Creating temp directoy"
echo "///////////////////////////"
cd $DSS
mkdir -p ./src/assets/images
mkdir -p ./src/assets/sass
cp -R ./src/duke-default/images/* ./src/assets/images
cp ./src/duke-default/sass/dd-defaults.scss ./src/assets/sass
cp ./src/duke-default/sass/dd-overrides.scss ./src/assets/sass
cp ./src/duke-extend/sass/de-defaults.scss ./src/assets/sass
cp ./src/duke-extend/sass/de-overrides.scss ./src/assets/sass

echo "///////////////////////////"
echo "Removing old skins"
echo "///////////////////////////"
rm -rf ./src/duke-default
rm -rf ./src/duke-extend

echo "///////////////////////////"
echo "Copying morpheus-master to $DSS"
echo "///////////////////////////"
cp -R $SAKAI$MM ./src/duke-default
echo '\n@import "dd-overrides";' >> src/duke-default/sass/tool.scss
cp -R $SAKAI$MM ./src/duke-extend
echo '\n@import "de-overrides";' >> src/duke-extend/sass/tool.scss

echo "///////////////////////////"
echo "Merging Duke changes into morpheus-master:$RELEASE"
echo "///////////////////////////"
cp -R ./src/assets/images/* ./src/duke-default/images
cp -R ./src/assets/images/* ./src/duke-extend/images
cp ./src/assets/sass/dd-defaults.scss ./src/duke-default/sass
cp ./src/assets/sass/dd-overrides.scss ./src/duke-default/sass
cp ./src/assets/sass/de-defaults.scss ./src/duke-extend/sass
cp ./src/assets/sass/de-overrides.scss ./src/duke-extend/sass

echo "///////////////////////////"
echo "Removing temp directory"
echo "///////////////////////////"
rm -rf ./src/assets

echo "///////////////////////////"
echo "Initializing skins for $RELEASE"
echo "///////////////////////////"
sh deploy.sh