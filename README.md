# 12.x branches

`src` contains the source files for the skins. Final edits are placed here and compiled for deployment

`dev` contains compiled versions of `src` for testing and development

Chrome 66+ has a new feature called [local overrides](https://developers.google.com/web/updates/2018/01/devtools#overrides) we can use to make the live updating process easier

`target` skins from `src` are compiled and placed here for deployment to Duke Sakai environments.

## Upgrading to a new Sakai 12 release
1. Clone sakaiproject/sakai
2. Checkout the tag or branch you're working on
3. Copy the `library/src/morpheus-master` folder from sakaiproject/sakai to `src`
4. Copy the `sass/duke.scss` and `sass/overrides.scss` files from previous version of skin to `morpheus-master/sass`
5. Copy the `images/LOGOS` files from the previous version to `morpheus-master/images`
6. Add `@import "overrides";` to the end of `morpheus-master/sass/tool.scss`
7. Rename morpheus-master to duke-default
8. Run `devdefault.sh` to create the skins
9. Begin dev To report a bug

10. Take a screenshot
11. In Chrome, right click and Inspect it.
12. In the Developer Tools Elements tab, right click the HTML element and Copy :: Copy Selector
13. Create a [new Github Issue](https://github.com/DukeLearningInnovation/duke-sakai-skins/issues/new)
14. Drop the screenshot into the Write Comment box, paste the Selector, and describe the issue.
15. If you want to fix it, assign yourself under Assignees


# Archive, not currently in use

## 12.0 branch

`src` is cloned from sakaiproject/sakai:12.x

Because we have limited dev resources, all edits will be placed in `_customization.scss`.
Effectively, everything will be an override of the morpheus-master style. This will slightly
the CSS file size, but not by much.

### Dev Process

**Step 1.** To debug/dev the skin, open Chrome and the developer tools

**Step 2.** Login to the instance you're designing against

* `https://qa12-mysql.nightly.sakaiproject.org/portal`
* `https://dukedev.longsight.com`
* `https://sakai.duke.edu`



**Step 4.** To fix a bug

1. Clone the repo in Github Desktop or terminal `git clone https://github.com/DukeLearningInnovation/duke-sakai-skins.git`
2. `git pull` to make sure you have everything
3. Create a branch `git branch -b issue-number-fix`
4. In Chrome dev tools, click the Sources tab and select a folder for overrides
5. Select the duke-sakai-skins/dev folder on your computer
6. Allow Chrome access to the folder
7. Select the Network tab, find tool.css and right click Open in Sources panel
8. After a few seconds, you will see the tool.css. Add a few lines to the bottom
9. Write your fix and save tool.css **resist the temptation to use the styles pane**
10. Open up duke-sakai-skins/src/duke-default_customization.scss
11. Add a CSS comment /* Fixes #xxxxx */ and paste your fix in
12. Commit your fix, include "Fixes #xxxx " in your commit summary and it will link it to the issue you're working on
13. Submit a pull request against the 12.0 branch **not master**

**Step 5.** Deploy fixes

1. `git pull`
2. Create a branch `git branch -b compile-fixes`
3. Copy duke-sakai-skins/src/duke-default to a Sakai installation
4. Compile
5. Copy the compiled folders back to duke-sakai-skins/target
6. Submit a ticket for Longsight to deploy to dev

Morpheus put customizations at the front of the compile, which I think makes
no sense. I duplicated morpheus-default into duke-default and edit the files
directly. I moved the customization import out of _customization.scss and to
the end of tool.scss so that it can act as an overrides.

#### Don't forget to do that the next time you pull in morpheus from sakaiproject/sakai

### To override Morpheus on another Sakai server

1. Open Chrome dev tools and make sure you have overrides enabled
2. Find the tool.css in the Network panel, right click and open in Source
3. Navigate to the `duke-sakai-skins/dev/sername.com` folder Chrome just created
4. Paste in everything from `duke-sakai-skins/target/duke-default` into that folder

Because nightly is rebuilt so often there is a `version` query parameter on the tool.css filename. Copy that and append it to the tool.css filename you just pasted into `duke-sakai-skins/dev/sername.com`