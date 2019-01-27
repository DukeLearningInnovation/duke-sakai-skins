#!/usr/bin/env bash
if [ $1 = "duke-default" ]; then
    echo "bin/build-other-skins.sh $1 start"
    SAK_V_CUR='12.x'
    SAK_V_NEW='19.x'
    DATE=`date +%Y-%m-%d_%H-%M-%S`

    echo "Copying default to crtp"
    rm -rf dist/$SAK_V_NEW/duke-crtp
    cp -R dist/$SAK_V_NEW/$1 dist/$SAK_V_NEW/duke-crtp
    printf "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/crtpLogo.png'); background-size: 293px 35px; width:293px;}\n" >> dist/$SAK_V_NEW/duke-crtp/tool.css

    echo "Copying default to divinity"
    rm -rf dist/$SAK_V_NEW/duke-divinity
    cp -R dist/$SAK_V_NEW/$1 dist/$SAK_V_NEW/duke-divinity
    printf "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/divinityLogo.png'); background-size: 93px 35px; width:93px;}\n" >> dist/$SAK_V_NEW/duke-divinity/tool.css

    echo "Copying default to DKU"
    rm -rf dist/$SAK_V_NEW/duke-dku
    cp -R dist/$SAK_V_NEW/$1 dist/$SAK_V_NEW/duke-dku
    printf "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/DKULogo.png'); background-size: 158px 52px; width:158px;}\n" >> dist/$SAK_V_NEW/duke-dku/tool.css

    echo "Copying default to law"
    rm -rf dist/$SAK_V_NEW/duke-law
    cp -R dist/$SAK_V_NEW/$1 dist/$SAK_V_NEW/duke-law
    printf "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/lawLogo.png'); background-size: 125px 28px; width:125px;}\n" >> dist/$SAK_V_NEW/duke-law/tool.css

    echo "Copying default to nursing"
    rm -rf dist/$SAK_V_NEW/duke-nursing
    cp -R dist/$SAK_V_NEW/$1 dist/$SAK_V_NEW/duke-nursing
    printf "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/dusonLogo.png'); background-size: 162px 35px; width:162px;}\n" >> dist/$SAK_V_NEW/duke-nursing/tool.css

    echo "Copying default to samsi"
    rm -rf dist/$SAK_V_NEW/duke-samsi
    cp -R dist/$SAK_V_NEW/$1 dist/$SAK_V_NEW/duke-samsi
    printf "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/samsiLogo.png'); background-size: 107px 50px;width:107px;}\n" >> dist/$SAK_V_NEW/duke-samsi/tool.css
    echo "bin/build-other-skins.sh $1 end"
fi