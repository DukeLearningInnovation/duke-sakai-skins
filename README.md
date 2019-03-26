# Duke Sakai Skins

## Stage 1: Install and setup

1. Install Node and NPM. I recommend using [Homebrew](https://brew.sh/) which makes the install pretty easy. [dyclassrom](https://www.dyclassroom.com/howto-mac/how-to-install-nodejs-and-npm-on-mac-using-homebrew) has a good tutorial.

    I recommend copying the homebrew install command directly from Homebrew's website to ensure you get the right one.

    I'm using the follow versions at this time

   * Homebrew 1.9.3
   * Node 11.6.0
   * npm 6.7.0

1. Run `git clone https://github.com/DukeLearningInnovation/duke-sakai-skins.git`
1. Run `npm install`

## Stage 2: Development

1. Change the arguments on on `package.json scripts:watch` to the skin and environment you are developing for. The defaults are duke-default and nightly. Environment options are:
    1. dev =        dukedev.longsight.com
    1. test =       sakai-test.duke.edu
    1. prod =       sakai.duke.edu
    1. nightly =    qa19-mysql.nightly.sakaiproject.org
1. If you are developing against any of the Sakai Community Nightly servers, you'll need to change the version number in `bin/serve.sh`.
   1. Open Chrome Devtools and visit the environment you wish to develop against.
   1. Open the Network tab and find a CSS or JS file.
   1. Copy the string at the end of the filename `version=XXX`
   1. Replace the `VERSION` variable with the current version and save.
1. Run `npm run watch`
1. Open Chrome Devtools and go to the environment you are currently watching.
1. In Devtools go to the Sources Tab and the Overrides sub-tab (in the left pane)
1. Enable local overrides and select the `dev` folder. Chrome will find the correct subfolder based on the domain name of the server.
1. Edit SCSS or JS in `src` and save. Upon save, watch will auto-compile and about 10-15s later, Chrome will auto-update with your edited code.

Use `js/src/{{SKIN}}.js` to add javascript.

Use `sass/_customization.scss` to edit the variables inherited from morpheus-master.  
Use `sass/{{SKIN}}.scss` to override anything else. This saves us from having to merge individual edits across the rest of the skin as Sakai updates.

You can do a full compile at any time build running `npm run build`.

**Look at the scripts section of package.json** Some scripts have default arguments in them. Change them and save the file to change the skin or environment you want to dev against.

## Organization

* `bin` contains bash scripts used in package.json
* `dev` contains compiled versions of `src` that have been modified to match different servers for testing and development
* `dist` contains compiled versions of `src` ready for sending to Longsight
* `src` contains the source files for the skins. Edit here.

All skins except `duke-extend` are based off the `duke-default` skin which is why there are only two folders in `src`.

## Scripts

Most of the tools in the npm ecosystem don't build Sakai compatible skins out of the box. That's why you'll see several scripts in `bin`.

### autoprefixer.sh

Example use `npm run autoprefixer`

This script does not currently use any arguments. It runs autoprefixer for all skins in the dist directory.

### create-skin.sh

Exmple use `npm run create-skin morpheus-master new-skin`

This script accepts 2 arguments

1. the skin you want to base the new skin on
1. the name of the new skin. The example will create a skin called new-skin based off of src/morpheus-master.

### fetch-src.sh

Example use `npm run fetch-src branches/19.x`.

**This script overwrites `src/morpheus-master`**.

This script accepts 1 argument which determines where to grab morpheus-master from on github:sakaiproject/sakai.

* Use `branches/RELEASE.x` to grab the latest code.
* Use `tags/19.2` to grab the specific dot release you are looking for.

### fonts.sh

Example use `npm run fonts duke-default nightly /src/{{SKIN}}/sass/images/{{FILE}}.png`

This script accepts 3 arguments

1. skin name which determines what folder to grab font files from to copy
1. this script does not use this variable but it's required for other scripts and my bash-foo needs work
1. a path to file

This script only runs if the third argument is a png file or the string `{{changed}}` so that is works with the watch and build scripts.

### imagemin.sh

Example use `npm run imagemin duke-default nightly /src/{{SKIN}}/sass/images/{{FILE}}.png`

This script accepts 3 arguments

1. skin name which determines what folder to grab image files from to minimize
1. this script does not use this variable but it's required for other scripts and my bash-foo needs work
1. a path to file

This script only runs if the third argument is a png file or the string `{{changed}}` so that is works with the watch and build scripts. If you upload a new image to `{{SKIN}}/images` it will minimize it for you in the build and watch scripts.

### scss.sh

Example use `npm run scss duke-default nightly /src/{{SKIN}}/sass/_customization.scss`

This script accepts 3 arguments

1. skin name which determines what folder to grab scss files from for compiling
1. this script does not use this variable but it's required for other scripts and my bash-foo needs work
1. a path to file

This script only runs if the third argument is a scss file or the string `{{changed}}` so that is works with the watch and build scripts. If you edit a scss to `{{SKIN}}/sass` it will compile it for you in the build and watch scripts.

### serve.sh

Example use `npm run serve duke-default nightly /src/{{SKIN}}/sass/_customization.scss`

This script accepts 2 arguments

1. skin name whic determines the src and dev locations
1. an environment that you want to develop against. Pass in one of the following or list a domain name of your choice
    1. dev =        dukedev.longsight.com
    1. test =       sakai-test.duke.edu
    1. prod =       sakai.duke.edu
    1. nightly =    qa19-mysql.nightly.sakaiproject.org

### sub-skins.sh

Example use `npm run sub-skins duke-default`. 

This script accepts 1 arguement and only runs if = `duke-default` because we have no "sub-skins" built off another base skin. This also prevents skins being created incorrectly when using the build, watch, or serve commands.

### uglify.sh

Example use `npm run uglify duke-default nightly /src/{{SKIN}}/js/src/{{SKIN}}.js`

This script accepts 3 arguments

1. skin name which determines what folder to grab js files from for compiling
1. this script does not use this variable but it's required for other scripts and my bash-foo needs work
1. a path to javascript file for compiling

This script only runs if the third argument is a js file or the string `{{changed}}` so that is works with the watch and build scripts. If you edit a js in `{{SKIN}}/js/src` it will compile it for you in the build and watch scripts.

## To report a bug

1. Take a screenshot
1. In Chrome, right click and Inspect it.
1. In the Developer Tools Elements tab, right click the HTML element and Copy :: Copy Selector
1. Create a [new Github Issue](https://github.com/DukeLearningInnovation/duke-sakai-skins/issues/new)
1. Drop the screenshot into the Write Comment box, paste the Selector, and describe the issue.
1. If you want to fix it, assign yourself under Assignees

## Troubleshooting

Thanks to https://github.com/cilt-uct/sakai-skin-vula and https://css-tricks.com/why-npm-scripts/ for the inspiration!!

* [Grunt based build](https://github.com/cilt-uct/sakai-skin-vula/blob/r/12.x/Gruntfile.js)
* [Sakai 19 skin POM](https://github.com/sakaiproject/sakai/blob/19.x/library/pom.xml)

If something's not right, those are two places to look and see what's wrong with the build.