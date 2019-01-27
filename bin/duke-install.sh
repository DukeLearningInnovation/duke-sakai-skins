#change this to the version of sakai you want to checkout from github
echo "bin/duke-install.sh start"
SAK_V_CUR='12.x'
SAK_V_NEW='19.x'

echo "Importing from $SAK_V_CUR/$1..."
rm -rf src/$SAK_V_NEW/new-$1
cp -R src/$SAK_V_NEW/morpheus-master src/$SAK_V_NEW/new-$1
printf "\n\n@import \"$1\";" >> src/$SAK_V_NEW/new-$1/sass/tool.scss

cp src/$SAK_V_CUR/$1/sass/_customization.scss src/$SAK_V_NEW/new-$1/sass/_customization.scss
cp src/$SAK_V_CUR/$1/sass/$1.scss src/$SAK_V_NEW/new-$1/sass/$1.scss
cp src/$SAK_V_CUR/$1/js/src/$1.js src/$SAK_V_NEW/new-$1/js/src/$1.js
cp src/$SAK_V_CUR/$1/images/logo-*.png src/$SAK_V_NEW/new-$1/images
cp src/$SAK_V_CUR/$1/images/playposit.png src/$SAK_V_NEW/new-$1/images/playposit.png

rm -rf src/$SAK_V_NEW/new-$1/sass/examples
rm src/$SAK_V_NEW/new-$1/.gitignore
rm src/$SAK_V_NEW/new-$1/*.md

echo "Rename src/$SAK_V_NEW/new-$1 and start coding."
echo "bin/duke-install.sh done"