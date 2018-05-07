echo "Copying default to law"
rm -rf target/duke-law
cp -R target/duke-default target/duke-law
echo "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/lawLogo.png'); background-size: 125px 28px; width:125px;}\n" >> target/duke-law/tool.css
