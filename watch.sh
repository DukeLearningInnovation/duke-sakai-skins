#!/usr/bin/env bash

DEV='dev/sakai.duke.edu/library/skin'
DATE=`date +%Y-%m-%d_%H-%M-%S`

node-sass -r src/duke-default \
    -o dev/sakai.duke.edu/library/skin \
    --include-path src/duke-default/bootstrap-sass-3.3.7/assets/stylesheets/ \
    --include-path src/duke-default/font-awesome-sass-4.7.0/assets/stylesheets/ \
    --include-path src/duke-default/sass/ \
    --output-style compressed \
    --source-map true

echo "Moving files to $DEV"
echo "\n/* Compiled on $DATE */\n" >> $DEV/tool.css


mv $DEV/sass/dd-defaults.css $DEV/duke-default/dd-defaults.css%3fversion=af
mv $DEV/sass/dd-overrides.css $DEV/duke-default/dd-overrides.css%3fversion=af
mv $DEV/sass/tool.css $DEV/duke-default/tool.css%3fversion=af
mv $DEV/sass/access.css $DEV/duke-default/access.css%3fversion=af
mv $DEV/sass/portal.css $DEV/duke-default/portal.css%3fversion=af
mv $DEV/sass/print.css $DEV/duke-default/print.css%3fversion=af

echo "Copying default to crtp"
# rm -rf target/duke-crtp
cp -R $DEV/duke-default dev/sakai.duke.edu/library/skin/duke-crtp
echo "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/crtpLogo.png'); background-size: 293px 35px; width:293px;}\n" >> target/duke-crtp/tool.css

echo "Copying default to divinity"
# rm -rf target/duke-divinity
cp -R $DEV/duke-default dev/sakai.duke.edu/library/skin/duke-divinity
echo "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/divinityLogo.png'); background-size: 93px 35px; width:93px;}\n" >> target/duke-divinity/tool.css

echo "Copying default to DKU"
# rm -rf target/duke-dku
cp -R $DEV/duke-default dev/sakai.duke.edu/library/skin/duke-dku
echo "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/DKULogo.png'); background-size: 158px 52px; width:158px;}\n" >> target/duke-dku/tool.css

echo "Copying default to law"
# rm -rf target/duke-law
cp -R $DEV/duke-default dev/sakai.duke.edu/library/skin/duke-law
echo "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/lawLogo.png'); background-size: 125px 28px; width:125px;}\n" >> target/duke-law/tool.css

echo "Copying default to nursing"
# rm -rf target/duke-nursing
cp -R $DEV/duke-default dev/sakai.duke.edu/library/skin/duke-nursing
echo "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/dusonLogo.png'); background-size: 162px 35px; width:162px;}\n" >> target/duke-nursing/tool.css

echo "Copying default to samsi"
# rm -rf target/duke-samsi
cp -R $DEV/duke-default dev/sakai.duke.edu/library/skin/duke-samsi
echo "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/samsiLogo.png'); background-size: 107px 50px;width:107px;}\n" >> target/duke-samsi/tool.css

echo "All done"