echo "Copying default to nursing"
rm -rf target/duke-nursing
cp -R target/duke-default target/duke-nursing
echo "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: 'images/dusonLogo.png'; background-size: 162px 35px;}\n" >> target/duke-nursing/tool.css
DATE=`date +%Y-%m-%d_%H-%M-%S`
echo "\n/* Compiled on $DATE */\n" >> target/duke-nursing/tool.css