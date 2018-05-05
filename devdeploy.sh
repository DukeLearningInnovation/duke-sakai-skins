rm -rf dev/dukedev.longsight.com/library/skin/duke-default/*
cp -R target/duke-default/* dev/dukedev.longsight.com/library/skin/duke-default
cd dev/dukedev.longsight.com/library/skin/duke-default
mv access.css access.css%3fversion=ad
mv portal.css portal.css%3fversion=ad
mv print.css print.css%3fversion=ad
mv tool.css tool.css%3fversion=ad
cd ~/dev/dukelearninginnovation/duke-sakai-skins