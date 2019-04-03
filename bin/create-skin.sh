#change this to the version of sakai you want to checkout from github
echo "bin/create-skin.sh from $1 named $2 start"
SAK_V_CUR='12.x'
SAK_V_NEW='19.x'


echo "Importing from $SAK_V_NEW/$1..."
rm -rf src/$SAK_V_NEW/$2
cp -R src/$SAK_V_NEW/$1 src/$SAK_V_NEW/$2
printf "\n\n@import \"$2\";" >> src/$SAK_V_NEW/$2/sass/tool.scss

cp src/$SAK_V_NEW/$1/sass/_customization.scss src/$SAK_V_NEW/$2/sass/_customization.scss
cp src/$SAK_V_NEW/$1/sass/$1.scss src/$SAK_V_NEW/$2/sass/$2.scss
cp src/$SAK_V_NEW/$1/js/src/$1.js src/$SAK_V_NEW/$2/js/src/$2.js
cp src/$SAK_V_NEW/duke-default/images/logo-*.png src/$SAK_V_NEW/$2/images
cp src/$SAK_V_NEW/duke-default/images/playposit.png src/$SAK_V_NEW/$2/images/playposit.png

rm -rf src/$SAK_V_NEW/$2/sass/examples
rm src/$SAK_V_NEW/$2/.gitignore
rm src/$SAK_V_NEW/$2/*.md
rm src/$SAK_V_NEW/$2/sass/morpheus-master.scss

echo "bin/create-skin.sh done creating $2 from $1"