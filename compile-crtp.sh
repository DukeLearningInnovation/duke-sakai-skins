echo "Copying default to crtp"
rm -rf target/duke-crtp
cp -R target/duke-default target/duke-crtp
echo ".Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/crtpLogo.png'); background-size: 293px 35px; width:293px;}" >> target/duke-crtp/tool.css
DATE=`date +%Y-%m-%d_%H-%M-%S`
echo "\n/* Compiled on $DATE */\n" >> target/duke-crtp/tool.css