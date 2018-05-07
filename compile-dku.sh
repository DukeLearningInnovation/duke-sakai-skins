echo "Copying default to DKU"
rm -rf target/duke-dku
cp -R target/duke-default target/duke-dku
echo "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/DKULogo.png'); background-size: 158px 52px; width:158px;}\n" >> target/duke-dku/tool.css
