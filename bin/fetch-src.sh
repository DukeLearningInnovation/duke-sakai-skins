#change this to the version of sakai you want to checkout from github
echo "bin/fetch-src.sh start"
SAK_V='20.x'

#overwrite previous src/morpheus-master folder with desired release
rm -rf src/$SAK_V/morpheus-master

# Once an official release is put out, you can use the tags URL to grab that code
# ex. tags/19.0
# Otherwise use branches/19.x to grab the latest version for that release
svn export https://github.com/sakaiproject/sakai/$1/library/src/morpheus-master src/$SAK_V/morpheus-master

# TODO move to create-skin
touch src/$SAK_V/morpheus-master/js/src/morpheus-master.js
touch src/$SAK_V/morpheus-master/sass/morpheus-master.scss
touch src/$SAK_V/morpheus-master/sass/_customization.scss

echo "bin/fetch-src.sh done"