echo "copying duke-extend to sakai-master-docker for compiling"
rm -rf ~/dev/profmikegreene/sakai-master-docker/maven/src/library/src/duke-extend/*
cp -R src/duke-extend/* ~/dev/profmikegreene/sakai-master-docker/maven/src/library/src/duke-extend

cd ~/dev/profmikegreene/sakai-master-docker

docker run -it --rm --name sakai-maven \
  -v "$PWD/maven/src":/usr/src/mymaven/src \
  -v "$PWD/maven/target":/usr/src/mymaven/target \
  -v "$PWD/maven/.m2":/root/.m2 \
  972db5b77aa2 mvn \
  -f src/library \
  clean install \
  -Pcompile-skin \
  -Dsakai.skin.source=duke-extend \
  -Dsakai.skin.target=duke-extend \
  -Dsakai.skin.customization.file=src/duke-extend/sass/customization.scss

echo "copying compiled duke-extend skin to duke-sakai-skins/target"
rm -rf ~/dev/dukelearninginnovation/duke-sakai-skins/target/duke-extend/*
cp -R maven/src/library/target/library-12-SNAPSHOT/skin/duke-extend/* ~/dev/dukelearninginnovation/duke-sakai-skins/target/duke-extend
cd ~/dev/dukelearninginnovation/duke-sakai-skins
DATE=`date +%Y-%m-%d_%H-%M-%S`
echo "\n/* Compiled on $DATE */\n" >> target/duke-extend/tool.css