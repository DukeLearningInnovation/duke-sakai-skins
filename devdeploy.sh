rm -rf dev/sakai.duke.edu/library/skin/duke-default/*
cp -R target/duke-default/* dev/sakai.duke.edu/library/skin/duke-default
cd dev/sakai.duke.edu/library/skin/duke-default
mv access.css access.css%3fversion=ae
mv portal.css portal.css%3fversion=ae
mv print.css print.css%3fversion=ae
mv tool.css tool.css%3fversion=ae
cd ~/dev/dukelearninginnovation/duke-sakai-skins