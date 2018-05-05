echo "Copying default to law"
rm -rf target/duke-law
cp -R target/duke-default target/duke-law
echo ".Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/lawLogo.png'); background-size: 125px 28px;width:125px;}" >> target/duke-law/tool.css
DATE=`date +%Y-%m-%d_%H-%M-%S`
echo "\n/* Compiled on $DATE */\n" >> target/duke-law/tool.css