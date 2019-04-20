#change this to the version of sakai you want to checkout from github
echo "bin/fetch-src.sh start"
SAK_V='19.x'

#overwrite previous src/morpheus-master folder with desired release
rm -rf src/$SAK_V/morpheus-master

# Once an official release is put out, you can use the tags URL to grab that code
# ex. tags/19.0
# Otherwise use branches/19.x to grab the latest version for that release
svn export https://github.com/sakaiproject/sakai/$1/library/src/morpheus-master src/$SAK_V/morpheus-master

touch src/$SAK_V/morpheus-master/js/src/morpheus-master.js
touch src/$SAK_V/morpheus-master/sass/morpheus-master.scss
touch src/$SAK_V/morpheus-master/sass/_customization.scss

#this fixes a bug in morpheus. @profmikegreene to put a PR in to fix
sed -i '' -e 's/#{$nonPhone}/@media #{$nonPhone}/g; s/#{$phone}/@media #{$phone}/g' src/$SAK_V/morpheus-master/sass/modules/tool/mycalendar/_mycalendar.scss 
rm src/$SAK_V/morpheus-master/sass/modules/tool/mycalendar/_mycalendar.scss-e
echo "bin/fetch-src.sh done"