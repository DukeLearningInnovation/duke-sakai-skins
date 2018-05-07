echo "Copying default to divinity"
rm -rf target/duke-divinity
cp -R target/duke-default target/duke-divinity
echo "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/divinityLogo.png'); background-size: 93px 35px; width:93px;}\n" >> target/duke-divinity/tool.css