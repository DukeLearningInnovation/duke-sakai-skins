#!/usr/bin/env bash

DEV='dev/sakai.duke.edu/library/skin'
DATE=`date +%Y-%m-%d_%H-%M-%S`

node-sass -r src/duke-default \
    -o dev/sakai.duke.edu/library/skin \
    --include-path src/duke-default/sass/ \
    --include-path src/duke-default/bootstrap-sass-3.3.7/assets/stylesheets/ \
    --include-path src/duke-default/font-awesome-sass-4.7.0/assets/stylesheets/ \
    --output-style compressed \
    --output-file "tool.css" \
    --source-map-root file://${PWD}/dev/sakai.duke.edu/ \
    --source-map true

echo "Moving files to $DEV"
printf "\n/* Compiled on $DATE */\n" >> $DEV/sass/tool.css

mv -v $DEV/sass/* $DEV/duke-default/
mv $DEV/duke-default/dd-defaults.css $DEV/duke-default/dd-defaults.css%3fversion=af
mv $DEV/duke-default/dd-overrides.css $DEV/duke-default/dd-overrides.css%3fversion=af
mv $DEV/duke-default/tool.css $DEV/duke-default/tool.css%3fversion=af
mv $DEV/duke-default/access.css $DEV/duke-default/access.css%3fversion=af
mv $DEV/duke-default/portal.css $DEV/duke-default/portal.css%3fversion=af
mv $DEV/duke-default/print.css $DEV/duke-default/print.css%3fversion=af


echo "Copying default to crtp"
rm -rf $DEV/duke-crtp
cp -R $DEV/duke-default $DEV/duke-crtp
printf "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/crtpLogo.png'); background-size: 293px 35px; width:293px;}\n" >> $DEV/duke-crtp/tool.css%3fversion=af

echo "Copying default to divinity"
rm -rf $DEV/duke-divinity
cp -R $DEV/duke-default $DEV/duke-divinity
printf "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/divinityLogo.png'); background-size: 93px 35px; width:93px;}\n" >> $DEV/duke-divinity/tool.css%3fversion=af

echo "Copying default to DKU"
rm -rf $DEV/duke-dku
cp -R $DEV/duke-default $DEV/duke-dku
printf "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/DKULogo.png'); background-size: 158px 52px; width:158px;}\n" >> $DEV/duke-dku/tool.css%3fversion=af

echo "Copying default to law"
rm -rf $DEV/duke-law
cp -R $DEV/duke-default $DEV/duke-law
printf "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/lawLogo.png'); background-size: 125px 28px; width:125px;}\n" >> $DEV/duke-law/tool.css%3fversion=af

echo "Copying default to nursing"
rm -rf $DEV/duke-nursing
cp -R $DEV/duke-default $DEV/duke-nursing
printf "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/dusonLogo.png'); background-size: 162px 35px; width:162px;}\n" >> $DEV/duke-nursing/tool.css%3fversion=af

echo "Copying default to samsi"
rm -rf $DEV/duke-samsi
cp -R $DEV/duke-default $DEV/duke-samsi
printf "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/samsiLogo.png'); background-size: 107px 50px;width:107px;}\n" >> $DEV/duke-samsi/tool.css%3fversion=af

echo "All done"