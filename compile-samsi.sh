echo "Copying default to samsi"
rm -rf target/duke-samsi
cp -R target/duke-default target/duke-samsi
echo ".Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: 'images/samsiLogo.png'; background-size: 107px 50px;}" >> target/duke-samsi/tool.css
DATE=`date +%Y-%m-%d_%H-%M-%S`
echo "\n/* Compiled on $DATE */\n" >> target/duke-samsi/tool.css