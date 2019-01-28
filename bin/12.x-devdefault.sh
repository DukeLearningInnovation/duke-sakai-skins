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
  -Dsakai.skin.customization.file=src/duke-default/sass/dd-defaults.scss

echo "copying compiled duke-default skin to duke-sakai-skins/target"
rm -rf ~/dev/dukelearninginnovation/duke-sakai-skins/target/duke-default/*
cp -R maven/src/library/target/library-12-SNAPSHOT/skin/duke-default/* ~/dev/dukelearninginnovation/duke-sakai-skins/target/duke-default
cd ~/dev/dukelearninginnovation/duke-sakai-skins
DATE=`date +%Y-%m-%d_%H-%M-%S`
echo "\n/* Compiled on $DATE */\n" >> target/duke-default/tool.css

echo "Copying default to crtp"
rm -rf target/duke-crtp
cp -R target/duke-default target/duke-crtp
echo "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/crtpLogo.png'); background-size: 293px 35px; width:293px;}\n" >> target/duke-crtp/tool.css

echo "Copying default to divinity"
rm -rf target/duke-divinity
cp -R target/duke-default target/duke-divinity
echo "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/divinityLogo.png'); background-size: 93px 35px; width:93px;}\n" >> target/duke-divinity/tool.css

echo "Copying default to DKU"
rm -rf target/duke-dku
cp -R target/duke-default target/duke-dku
echo "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/DKULogo.png'); background-size: 158px 52px; width:158px;}\n" >> target/duke-dku/tool.css

echo "Copying default to law"
rm -rf target/duke-law
cp -R target/duke-default target/duke-law
echo "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/lawLogo.png'); background-size: 125px 28px; width:125px;}\n" >> target/duke-law/tool.css

echo "Copying default to nursing"
rm -rf target/duke-nursing
cp -R target/duke-default target/duke-nursing
echo "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/dusonLogo.png'); background-size: 162px 35px; width:162px;}\n" >> target/duke-nursing/tool.css

echo "Copying default to samsi"
rm -rf target/duke-samsi
cp -R target/duke-default target/duke-samsi
echo "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/samsiLogo.png'); background-size: 107px 50px;width:107px;}\n" >> target/duke-samsi/tool.css


echo "copying skins to dev"
rm -rf dev/sakai.duke.edu/library/skin/duke-default/*
cp -R target/duke-default/* dev/sakai.duke.edu/library/skin/duke-default
cd dev/sakai.duke.edu/library/skin/duke-default
mv access.css access.css%3fversion=af
mv portal.css portal.css%3fversion=af
mv print.css print.css%3fversion=af
mv tool.css tool.css%3fversion=af
mv js/morpheus.scripts.min.js js/morpheus.scripts.min.js%3fversion=af
cd ~/dev/dukelearninginnovation/duke-sakai-skins

rm -rf dev/dukedev.longsight.com/library/skin/duke-default/*
cp -R target/duke-default/* dev/dukedev.longsight.com/library/skin/duke-default
cd dev/dukedev.longsight.com/library/skin/duke-default
mv access.css access.css%3fversion=af
mv portal.css portal.css%3fversion=af
mv print.css print.css%3fversion=af
mv tool.css tool.css%3fversion=af
mv js/morpheus.scripts.min.js js/morpheus.scripts.min.js%3fversion=af
cd ~/dev/dukelearninginnovation/duke-sakai-skins
echo "all done"