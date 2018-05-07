echo "Copying default to samsi"
rm -rf target/duke-samsi
cp -R target/duke-default target/duke-samsi
echo "\n.Mrphs-mainHeader .Mrphs-headerLogo .Mrphs-headerLogo--institution{background-image: url('images/samsiLogo.png'); background-size: 107px 50px;width:107px;}\n" >> target/duke-samsi/tool.css