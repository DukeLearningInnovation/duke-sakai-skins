echo "Copying default to divinity"
rm -rf target/duke-divinity
cp -R target/duke-default target/duke-divinity
echo ".Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: 'images/divinityLogo.png'; background-size: 97px 43px;}" >> target/duke-divinity/tool.css
DATE=`date +%Y-%m-%d_%H-%M-%S`
echo "\n/* Compiled on $DATE */\n" >> target/duke-divinity/tool.css