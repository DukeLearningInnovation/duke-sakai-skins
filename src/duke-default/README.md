# Duke skins

These skins are based off Morpheus.

Step 1: Duplicate morpheus-default and rename duke-default

Step 2: Move customizations.scss to the end
Morpheus put customizations at the front, which I think makes no sense. I duplicated morpheus-default into this directory and edit the files directly

I moved the customization import out of _defaults.scss and to the end of tool.scss so that it can act as an overrides.

Step 3: Edit defaults.scss and anything else

Step 4: Build
If you're using profmikegreene/sakai-master-docker you'll already have a maven image and can deploy via

`docker run -it --rm --name sakai-maven \
  -v "$PWD/maven/src":/usr/src/mymaven/src \
  -v "$PWD/maven/target":/usr/src/mymaven/target \
  -v "$PWD/maven/.m2":/root/.m2 \
  sakaimasterdocker_maven mvn \
  -f src/library \
  clean install \
  -Pcompile-skin \
  -Dsakai.skin.source=duke-default \
  -Dsakai.skin.target=duke-default \
  sakai:deploy`

If not, a standard
`mvn clean install  -Pcompile-skin \
  -Dsakai.skin.source=duke-default \
  -Dsakai.skin.target=duke-default \
  sakai:deploy`
