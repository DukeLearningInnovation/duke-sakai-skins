# Duke Sakai Skins

[![Build Status](https://travis-ci.org/DukeLearningInnovation/duke-sakai-skins.svg?branch=master)](https://travis-ci.org/DukeLearningInnovation/duke-sakai-skins)  
![Build Date](https://img.shields.io/badge/built%20on-Tue,%2012%20Nov%202019%2008:54:10%20EST-blue)

## Stage 1: Install and setup

1. Install Node and NPM. I recommend using [Homebrew](https://brew.sh/) which makes the install pretty easy. [dyclassrom](https://www.dyclassroom.com/howto-mac/how-to-install-nodejs-and-npm-on-mac-using-homebrew) has a good tutorial.

    I recommend copying the homebrew install command directly from Homebrew's website to ensure you get the right one.

    I'm using the follow versions at this time

   * Homebrew 1.9.3
   * Node 11.6.0
   * npm 6.7.0

1. Run `git clone https://github.com/DukeLearningInnovation/duke-sakai-skins.git`
1. Run `cd duke-sakai-skins`
1. Run `npm install`

## Stage 2: Development

## Editing an already created skin

1. Run `npm run watch`

   This script watches the src directory for changes. When you save a file, it rebuilds the skin and deploys it to `dist/dukedev.longsight.com`.

1. Open Chrome and navigate to dukedev.longsight.com
1. Open Devtools and go to the Sources Tab then the Overrides sub-tab (in the left pane)
1. Enable local overrides and select the `dev` folder in your duke-sakai-skins directory. Chrome will find the correct subfolder based on the domain name of the server.
1. Edit SCSS or JS in `src` and save. Upon save, watch will auto-compile and about 10-15s later, Chrome will auto-update with your edited code.
1. When you're done, `Control + C` to stop the `npm run watch` script
1. Run `npm run build-all` to build all skins so they pick up the changes you made.
1. Move onto Stage 3 below

### More options

1. Change the argument on on `package.json scripts:watch` to the server you are developing against.
1. If you are developing against any of the Sakai Community Nightly servers, you'll need to change the version number in `bin/serve.sh` to match the current build which changes daily.
   1. Open Chrome Devtools and visit the environment you wish to develop against.
   1. Open the Network tab and find a CSS or JS file.
   1. Copy the string at the end of the filename `version=XXX`
   1. Replace the `VERSION` variable with the current version and save.
1. Run `npm run watch`
1. Open Chrome Devtools and go to the environment you are currently watching.
1. In Devtools go to the Sources Tab and the Overrides sub-tab (in the left pane)
1. Enable local overrides and select the `dev` folder. Chrome will find the correct subfolder based on the domain name of the server.
1. Edit SCSS or JS in `src` and save. Upon save, watch will auto-compile and about 10-15s later, Chrome will auto-update with your edited code.

Use `{{SKIN}}/js/src/_customization.js` to add javascript.

Use `{{SKIN}}sass/_customization.scss` to edit the variables inherited from morpheus-master.  

Use `{{SKIN}}sass/_overrides.scss` to override anything else. This saves us from having to merge individual edits across the rest of the skin as core Sakai updates.

### Rebuild a skin without having to make file changes

1. Run `npm run build 19.x/{{SKIN}}`
1. Run `npm run serve 19.x/{{SKIN}} {{SERVER.COM`}}

## Stage 3: Continuous Deployment

The github repo currently uses Travis-CI to watch the `master` branch for commits/pull requests and will automatically send the changed `dist/19.x` files to the [`dukedev`](https://github.com/DukeLearningInnovation/duke-sakai-skins/tree/dukedev) branch. 

Longsight scrapes the `dukedev` branch every hour and updates the skins on dukedev.longsight.com automatically. `CMD` + `SHIFT` + `R` to force refresh if you're not seeing the changes.

## Organization

### Main Directories

* `bin` contains bash scripts used in package.json
* `dev` contains compiled versions of `src` that have been modified to match different servers for testing and development
* `dist` contains compiled versions of `src` ready for sending to Longsight
* `src` contains the source files for the skins. Edit here.

### Individual Skins

All duke skins first look to inherit styles from duke-default and then from morpheus-master. This allows you to primarily focus on editing the duke-default skin and only change things in the individual skins that need to be different from duke-default.

`js/src/_customization.js` will be the last JavaScript file compiled into `morpheus.scripts.min.js`

`sass/_customization.scss` contains any morpheus variables you want to change. Review `src/19.x/morpheus-master/sass/_defaults.scss` for reference of what you can change and `src/19.x/duke-default/sass/_customization.scss` for the changes inherited from the duke-default skin.

`sass/_overrides.scss` contains any overrides that cannot be made in `sass/_customization.scss`. Refer to `src/19.x/duke-default/sass/_overrides.scss` for the changes inherited from the duke-default skin.

`sass/tool.scss` contains all the `@import` statements used to generate the `tool.css` file for the skin. The first and last lines are changed from `src/19.x/morpheus-master/sass/tool.scss`

All other files are inherited from `src/19.x/morpheus-master/`.

## Scripts

### package.json:watch and bin/watch.sh

Example use `npm run watch`

This script watches the entire `src` directory for changes and runs the appropriate scripts depending on the file type changed.

The script will then rebuild the skin and deploy it to the `dev/dukedev.longsight.com` directory for use with Chrome DevTools.

The script includes a server domain variable which is set to `dukedev.longsight.com`. Change the variable to whatever server you want to dev against.

### package.json:build

Example use `npm run build 19.x/duke-default`

Manually build a specific skin.

### package.json:autoprefixer

Example use `npm run autoprefixer`

This script does not currently use any arguments. It runs autoprefixer for all skins in the dist directory.

### package.json:fetch-src and bin/fetch-src.sh

Example use `npm run fetch-src branches/19.x`.

**This script overwrites `src/morpheus-master`**.

This script accepts 1 argument which determines where to grab morpheus-master from on github:sakaiproject/sakai.

* Use `branches/RELEASE.x` to grab the latest code.
* Use `tags/19.2` to grab the specific dot release you are looking for.

### package.json:fonts and bin/fonts.sh

Example use `npm run fonts 19.x/duke-default`

This script copys the fontawesome and bootstrap fonts from `morpheus-master` to the `dist/{{skin}}` of your choosing. It accepts 1 argument

1. skin name which determines where to put the font files

### package.json:create-skin and bin/create-skin.sh

Example usage `npm run create-skin {{skin}}`

This skin will create a brand new skin with the necessary files to start developing. The newly created skin will be generated in `src/19.x/` with whatever you used for `{{skin}}`.

### package.json:imagemin and bin/imagemin.sh

### package.json:lint and bin/lint.sh

### package.json:scss and bin/scss.sh

Example usage `npm run scss 19.x/{{skin}}`

This script will compile all of the SCSS files into CSS. It accepts 1 argument

1. skin name which determines where to put the font files

### package.json:serve and bin/serve.sh

Example use `npm run serve 19.x/{{skin}} dukedev.longsight.com`

This script copies the `dist/19.x/{{skin}}` to `dev/dukedev.longsight.com/{{skin}}` and appends the appropriate server version numbers to the files for use with Chrome DevTools.

### package.json:uglify and bin/uglify.sh

Example use `npm run uglify 19.x/{{skin}}`

This script compiles the JavaScript files from `19.x/{{skin}}/js` and `19.x/morpheus-master/js` into `dist/19.x/{{skin}}/js/morpheus.scripts.min.js`.

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
