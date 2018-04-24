echo "copying duke-default to sakai-master-docker for compiling"
rm -rf ~/dev/profmikegreene/sakai-master-docker/maven/src/library/src/duke-default/*
cp -R src/duke-default/* ~/dev/profmikegreene/sakai-master-docker/maven/src/library/src/duke-default

cd ~/dev/profmikegreene/sakai-master-docker

docker run -it --rm --name sakai-maven \
  -v "$PWD/maven/src":/usr/src/mymaven/src \
  -v "$PWD/maven/target":/usr/src/mymaven/target \
  -v "$PWD/maven/.m2":/root/.m2 \
  972db5b77aa2 mvn \
  -f src/library \
  clean install \
  -Pcompile-skin \
  -Dsakai.skin.source=duke-default \
  -Dsakai.skin.target=duke-default \
  -Dsakai.skin.customization.file=src/duke-default/dukeoverrides.scss

echo "copying compiled duke-default skins to duke-sakai-skins/target"
rm -rf ~/dev/dukelearninginnovation/duke-sakai-skins/target/duke-default/*
cp -R maven/src/library/target/library-12-SNAPSHOT/skin/duke-default/* ~/dev/dukelearninginnovation/duke-sakai-skins/target/duke-default

cd ~/dev/dukelearninginnovation/duke-sakai-skins