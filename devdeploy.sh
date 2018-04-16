rm -rf dev/qa2-us.nightly.sakaiproject.org/library/skin/morpheus-default/*
cp -R target/duke-default/* dev/qa2-us.nightly.sakaiproject.org/library/skin/morpheus-default
cd dev/qa2-us.nightly.sakaiproject.org/library/skin/morpheus-default
mv access.css access.css%3fversion=12.1-RC01%252004%2f11%2f2018
mv portal.css portal.css%3fversion=12.1-RC01%252004%2f11%2f2018
mv print.css print.css%3fversion=12.1-RC01%252004%2f11%2f2018
mv tool.css tool.css%3fversion=12.1-RC01%252004%2f11%2f2018
cd ~/dev/dukelearninginnovation/duke-sakai-skins