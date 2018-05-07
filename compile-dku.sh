echo "Copying default to DKU"
rm -rf target/duke-dku
cp -R target/duke-default target/duke-dku
echo ".Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/DKULogo.png'); background-size: 158px 52px;width:158px;}" >> target/duke-dku/tool.css
DATE=`date +%Y-%m-%d_%H-%M-%S`
echo "\n/* Compiled on $DATE */\n" >> target/duke-dku/tool.css