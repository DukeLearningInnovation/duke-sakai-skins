/*******************************************************************************
 * $URL:  $
 * $Id:  $
 * **********************************************************************************
 *
 * Copyright (c) 2010 The Sakai Foundation
 *
 * Licensed under the Educational Community License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.opensource.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 ******************************************************************************/
var sakai = sakai || {};
sakai.editor = sakai.editor || {};
sakai.editor.editors = sakai.editor.editors || {};
// Temporarily disable enableResourceSearch till citations plugin is ported (SAK-22862)
sakai.editor.enableResourceSearch = false;

sakai.editor.editors.ckeditor = sakai.editor.editors.ckeditor || {} ;

//get path of directory ckeditor
var basePath = "/library/editor/ckextraplugins/";
var webJars = "/library/webjars/"

// Update properties in one object from another: https://stackoverflow.com/a/12534361/3708872
// I believe this is available as lodash.merge but don't see that available here yet and this looked like the simplest version of that
function objectMerge(obj/*, ...*/) {
    for (var i=1; i<arguments.length; i++) {
        for (var prop in arguments[i]) {
            var val = arguments[i][prop];
            if (typeof val == "object") // this also applies to arrays or null!
                objectMerge(obj[prop], val);
            else
                obj[prop] = val;
        }
    }
    return obj;
}

// Please note that no more parameters should be added to this signature.
// The config object allows for name-based config options to be passed.
// The w and h parameters should be removed as soon as their uses can be migrated.
sakai.editor.editors.ckeditor.launch = function(targetId, config, w, h) {
    //http://www.quirksmode.org/js/findpos.html
    function findPos(obj) {
        var curleft = curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return [curleft,curtop];
        }
    }

    //http://stackoverflow.com/a/1038781/3708872
    function getWidth() {
      if (self.innerHeight) {
        return self.innerWidth;
      }

      if (document.documentElement && document.documentElement.clientWidth) {
        return document.documentElement.clientWidth;
      }

      if (document.body) {
        return document.body.clientWidth;
      }
    }

    function addClassOnLoad(){
        try {
            if (typeof this.instances !== 'undefined'){
                //Run on all ckeditor instances on the page
                for (const instance in this.instances) {
                    //check for the instance to be an object not a function
                    if (Object.hasOwnProperty.call(this.instances, instance)) {
                        const instanceDoc = this.instances[instance];
                        //Add sakai-dark-theme class to ckeditor iframe
                        instanceDoc.document.$.documentElement.classList.add('sakaiUserTheme-dark');
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    function addClassOnModeChange(){
        try {
            //Only run when switching out of source mode into mysiwyg mode
            if (this.mode === 'wysiwyg') {
                //Check for the editor to be an object not a function
                if (Object.prototype.hasOwnProperty.call(this, 'document')) {
                    const instanceDoc = this.document.$;
                    //Add sakai-dark-theme class to ckeditor iframe
                    instanceDoc.documentElement.classList.add('sakaiUserTheme-dark');
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    var folder = "";

    var collectionId = "";
    if (config != null && config.collectionId) {
        collectionId=config.collectionId;
    }
    else if (sakai.editor.collectionId) {
        collectionId=sakai.editor.collectionId
    }

    if (collectionId) {
        folder = "CurrentFolder=" + collectionId
    }

    var language = sakai.locale && sakai.locale.userLanguage || '';
    var country = sakai.locale && sakai.locale.userCountry || null;

    if (sakai.editor.editors.ckeditor.browser === "elfinder") {
        var elfinderUrl = '/library/editor/elfinder/sakai/elfinder.html?connector=elfinder-connector/elfinder-servlet/connector';

        // Add tilde to userId in order to avoid permission error while getting resources from user workspace
        collectionId = collectionId.replace('/user/','/user/~');

        var filebrowser = {
            browseUrl :      elfinderUrl + '&startdir=' + collectionId,
            imageBrowseUrl : elfinderUrl + '&startdir=' + collectionId + '&type=images',
            flashBrowseUrl : elfinderUrl + '&startdir=' + collectionId + '&type=flash'
        };

    } else {
        var fckeditorUrl = '/library/editor/FCKeditor/editor/filemanager/browser/default/browser.html' +
            '?Connector=/sakai-fck-connector/web/editor/filemanager/browser/default/connectors/jsp/connector';

        var filebrowser = {
            browseUrl : fckeditorUrl + collectionId + '&' + folder,
            imageBrowseUrl : fckeditorUrl + collectionId + '&' + folder + "&Type=Image",
            flashBrowseUrl : fckeditorUrl + collectionId + '&' + folder + "&Type=Flash"
        };
    }

    var ckconfig = {
	//Some defaults for audio recorder
        audiorecorder : {
            "maxSeconds" : 180,
            "attemptAllowed" : Number.MAX_VALUE,
            "attemptsRemaining": Number.MAX_VALUE
        },
        skin: 'moono-lisa',
        uiColor: 'themeswitcher',
        defaultLanguage: 'en',
        // SAK-31829, SAK-33279 Disable functionality in table plugin
        //https://docs.ckeditor.com/#!/guide/dev_disallowed_content-section-how-to-allow-everything-except...
        allowedContent: {
            $1: {
                // Use the ability to specify elements as an object.
                elements: CKEDITOR.dtd,
                attributes: true,
                styles: true,
                classes: true
            }
        },
        disallowedContent: 'table[cellspacing,cellpadding,border,summary];',

        contentsCss: [(webJars+'bootstrap/3.3.7/css/bootstrap.min.css')],

        language: language + (country ? '-' + country.toLowerCase() : ''),
        // This is used for uploading by the autorecorder plugin.
        // TODO Get this to work with elfinder.
        fileConnectorUrl : '/sakai-fck-connector/web/editor/filemanager/browser/default/connectors/jsp/connector' + collectionId + '?' + folder,

        // These are the general URLs for browsing generally and specifically for images/flash object.
        filebrowserBrowseUrl :      filebrowser.browseUrl,
        filebrowserImageBrowseUrl : filebrowser.imageBrowseUrl,
        filebrowserFlashBrowseUrl : filebrowser.flashBrowseUrl,

        extraPlugins: (sakai.editor.enableResourceSearch ? 'resourcesearch,' : '')+'uploadimage,magicline,bt_table,a11ychecker,audiorecorder,autogrow,smiley,autolink,codesnippet,mentions,justify,balloontoolbar,balloonpanel,bidi,templates,mathjax,preview,showblocks,find,removeformat,pastetools,image2,warpwirecontentitem,contentitem,wordcount,notification,autosave,sakaiopenlink,sakaidropdowntoolbar,sakaiformat,iframe,iframedialog,indentblock,indentlist,pastefromgdocs,pastefromlibreoffice,pastefromword',
        mentions: [{
            feed: `/direct/roster/site/${portal.siteId}.json`,
            marker: '@',
            minChars: 0
        }],
        // These two settings enable the browser's native spell checking and context menus.
        // Control-Right-Click (Windows/Linux) or Command-Right-Click (Mac) on highlighted words
        // will cause the CKEditor menu to be suppressed and display the browser's standard context
        // menu. In some cases (Firefox and Safari, at least), this supplies corrections, suggestions, etc.
        disableNativeSpellChecker: false,
        browserContextMenuOnCtrl: true,
        removeButtons: '',
        autoGrow_minHeight: 200,
        autoGrow_maxHeight: 600,
        autoGrow_bottomSpace: 32,
        autoGrow_onStartup: true,
        sakaiDropdownToolbar: true,
        toolbarCanCollapse: true,
        toolbarStartupExpanded: false,
        sakaiOpenLinkToolbar: true,
        stylesSet: [
        // Block-level styles
        { name: 'Paragraph', element: 'p', attributes: { 'class': 'none' } },
        { name: 'Heading Large', element: 'h3', attributes: { 'class': 'none' } },
        { name: 'Heading Medium' , element: 'h4', attributes: { 'class': 'none' }  },
        { name: 'Heading Small', element: 'h5', attributes: { 'class': 'none' }  },
        { name: 'Single space', element: 'div', attributes: { 'class': 'none' } },
        // { name: 'Duke heading', element: 'h4', attributes: { 'class': 'bg-primary' } },
        { name: 'Gray heading', element: 'h4', attributes: { 'class': 'bg-dimmed' } },
        { name: 'Green heading', element: 'h4', attributes: { 'class': 'bg-success' } },
        { name: 'Yellow heading', element: 'h4', attributes: { 'class': 'bg-warning' } },
        { name: 'Blue heading', element: 'h4', attributes: { 'class': 'bg-info' } },
        { name: 'Red heading', element: 'h4', attributes: { 'class': 'bg-danger' } },
        { name: 'Navy heading', element: 'h4', attributes: { 'class': 'bg-navy' } },
        { name: 'Copper heading', element: 'h4', attributes: { 'class': 'bg-copper' } },
        { name: 'Dandelion heading', element: 'h4', attributes: { 'class': 'bg-dandelion' } },
        { name: 'Piedmont heading', element: 'h4', attributes: { 'class': 'bg-piedmont' } },
        { name: 'Magnolia heading', element: 'h4', attributes: { 'class': 'bg-magnolia' } },
        // { name: 'Ironweed heading', element: 'h4', attributes: { 'class': 'bg-ironweed' } },

        // { name: 'Duke highlight', element: 'span', attributes: { 'class': 'bg-primary' } },
        { name: 'Gray highlight', element: 'span', attributes: { 'class': 'bg-dimmed' } },
        { name: 'Green highlight', element: 'span', attributes: { 'class': 'bg-success' } },
        { name: 'Yellow highlight', element: 'span', attributes: { 'class': 'bg-warning' } },
        { name: 'Blue highlight', element: 'span', attributes: { 'class': 'bg-info' } },
        { name: 'Red highlight', element: 'span', attributes: { 'class': 'bg-danger' } },
        { name: 'Navy highlight', element: 'span', attributes: { 'class': 'bg-navy' } },
        { name: 'Copper highlight', element: 'span', attributes: { 'class': 'bg-copper' } },
        { name: 'Dandelion highlight', element: 'span', attributes: { 'class': 'bg-dandelion' } },
        { name: 'Piedmont highlight', element: 'span', attributes: { 'class': 'bg-piedmont' } },
        { name: 'Magnolia highlight', element: 'span', attributes: { 'class': 'bg-magnolia' } },
        // { name: 'Ironweed highlight', element: 'span', attributes: { 'class': 'bg-ironweed' } },
        //Object styles
        { name: 'Link Button', element: 'a', attributes: { 'class': 'btn btn-primary' } }, 
    ],

        // These two settings enable the browser's native spell checking and context menus.
        // Control-Right-Click (Windows/Linux) or Command-Right-Click (Mac) on highlighted words
        // will cause the CKEditor menu to be suppressed and display the browser's standard context
        // menu. In some cases (Firefox and Safari, at least), this supplies corrections, suggestions, etc.
        // disableNativeSpellChecker: false,
        // browserContextMenuOnCtrl: true,

        // Fix the smileys to a single location
        smiley_path: "/library/webjars/ckeditor4/4.16.1/plugins/smiley/images/",

        toolbar_Basic:
        [
            ['Styles', 'Bold', 'Italic', '-', 'Link', 'Unlink', '-', 'NumberedList','BulletedList', 'Blockquote', 'Source']
        ],
        toolbar_Full:
        [
            [ 'Styles' ],
            [ 'Bold', 'Italic'],
            [ 'NumberedList', 'BulletedList' ],
            [ 'Link', 'Unlink' ],
            [ 'Image', 'Table', 'WarpwireContentItem', ( sakai.editor.contentItemUrl ? 'ContentItem' : undefined) ],
            [ 'Paste', 'RemoveFormat' ],
            [ 'A11ychecker'], 
            [ 'Undo', 'Redo'],
            // //if sakaiDropdownToolbar is true, everything defined after the / will be displayed only after toggle
            '/',
            [ 'Templates' ],
            [ 'Strike', 'Underline'],
            [ 'Indent', 'Outdent' ],
            [ 'Superscript', 'Subscript' ],
            [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ],
            [ 'Blockquote', 'HorizontalRule' ],
            [ 'Smiley', 'Mathjax', 'SpecialChar', 'CodeSnippet', 'AudioRecorder'],
            '/',
            ['Source'],
            ['Replace', 'Preview'], 
            ['BidiLtr', 'BidiRtl'],
            [ 'ShowBlocks', 'Maximize']

            // // Uncomment the next line and comment the following to enable the default spell checker.
            // // Note that it uses spellchecker.net, displays ads and sends content to remote servers without additional setup.
            // //['SpellChecker', 'Scayt'],
        ].filter(el => el !== undefined),
        toolbar: 'Full',
        resize_dir: 'both',
        //SAK-23418
        // pasteFromWordRemoveFontStyles : false,
        // pasteFromWordRemoveStyles : false,
        autosave : {
            saveDetectionSelectors : "form input[type='button'],form input[type='submit']",
            //Delay for autosave
            delay: 60,
            //autosave_messageType can be "no" or "notification"
            messageType : "no"
        },

        //wordcount Plugin see https://github.com/w8tcha/CKEditor-WordCount-Plugin for more config options
        //This value should match the one in antisamy (kernel/kernel-impl/src/main/resources/antisamy/low-security-policy.xml)
        wordcount : {
            "maxCharCount" : 1000000,
            //Previous behavior
            "countSpacesAsCharsHTML" : true,
            "countHTML" : true,
            "showParagraphs" : false,
            "showWordCount" : true,
            "showCharCount" : true,
        },

        //SAK-29598 - Add more templates to CK Editor
        templates_files: [basePath+"sakaitemplates/default.js"],
        templates: 'sakaiTemplates',
        templates_replaceContent: false,
        format_tags: 'p;h3;h4;h5',
        sakaiFormat: false,
        mathJaxLib: sakai.editor.mathjaxSrc,
    };

    // Merge config values into ckconfig
    ckconfig = objectMerge(ckconfig, config);

    if (config && config.toolbarSet && ckconfig['toolbar_' + config.toolbarSet]) {
        ckconfig.toolbar = config.toolbarSet;
    }

    //To add extra plugins outside the plugins directory, add them here! (And in the variable)
    (function() {
        // SAK-30370 present a nice and simple editor without plugins to the user on a tiny screen.
        // 
        //Check for the portal variable (Should be defined)
        //These are defined in user/user-tool-prefs/tool/src/webapp/prefs/editor.jsp

        var detectWidth = true;
        if (typeof portal != 'undefined' && typeof portal.editor != 'undefined' && typeof portal.editor.type == 'string') {
            if (portal.editor.type == "basic") {
                ckconfig.toolbar = "Basic";
                detectWidth = false;
            }
            else if (portal.editor.type == "full") {
                ckconfig.toolbar = "Full";
                detectWidth = false;
                ckconfig.toolbarStartupExpanded = true;
            }
        }

        if (detectWidth == true && getWidth() < 800) {
            ckconfig.toolbar = 'Basic';
        }
        //These could be applicable to the basic toolbar
        CKEDITOR.plugins.addExternal('lineutils',basePath+'lineutils/', 'plugin.js');
        CKEDITOR.plugins.addExternal('widget',basePath+'widget/', 'plugin.js');
        CKEDITOR.plugins.addExternal('iframedialog',basePath+'iframedialog/', 'plugin.js');
        CKEDITOR.plugins.addExternal('html5video',webJars+'github-com-bahriddin-ckeditor-html5-video/1.2.1/html5video/', 'plugin.js');
        CKEDITOR.plugins.addExternal('audiorecorder',basePath+'audiorecorder/', 'plugin.js');
        CKEDITOR.plugins.addExternal('warpwirecontentitem',basePath+'warpwirecontentitem/', 'plugin.js');
        CKEDITOR.plugins.addExternal('contentitem',basePath+'contentitem/', 'plugin.js');
        // CKEDITOR.plugins.addExternal('sakaipreview',basePath+'sakaipreview/', 'plugin.js');
        CKEDITOR.plugins.addExternal('bt_table',basePath+'bt_table/', 'plugin.js');
        CKEDITOR.plugins.addExternal('image2',webJars+'ckeditor-image2/4.14.0/', 'plugin.js');
        // CKEDITOR.plugins.addExternal('image2',webJars+'ckeditor-image2/4.14.0/', 'plugin.js');
        CKEDITOR.plugins.addExternal('sakaidropdowntoolbar', basePath+'sakaidropdowntoolbar/', 'plugin.js');
        CKEDITOR.plugins.addExternal('sakaiopenlink', basePath+'sakaiopenlink/', 'plugin.js');
        CKEDITOR.plugins.addExternal('sakaiformat', basePath+'sakaiformat/', 'plugin.js');
        // CKEDITOR.plugins.addExternal('sakaipreview2', basePath+'sakaipreview2/', 'plugin.js');
        //Autosave has a dependency on notification
        CKEDITOR.plugins.addExternal('autosave',webJars+'ckeditor-autosave/0.18.4/', 'plugin.js');
        CKEDITOR.plugins.addExternal('wordcount',webJars+'wordcount/1.17.6/', 'plugin.js');
        CKEDITOR.plugins.addExternal('notification',basePath+'notification/', 'plugin.js');
        // Accessibility checker has a dependency on balloonpanel
        CKEDITOR.plugins.addExternal('a11ychecker',webJars+'a11ychecker/1.1.1/', 'plugin.js');
        /*
           To enable after the deadline uncomment these two lines and add atd-ckeditor to toolbar
           and to extraPlugins. This also needs extra stylesheets.
           See readme for more info http://www.polishmywriting.com/atd-ckeditor/readme.html
           You have to actually setup a server or get an API key
           Hopefully this will get easier to configure soon.
         */
        // CKEDITOR.plugins.addExternal('atd-ckeditor',basePath+'atd-ckeditor/', 'plugin.js'); 
        /*
           Replace this with your own server if you download it from http://openatd.wordpress.com/
           Or you can proxy to the public one, see the page for more information.
         */
        //ckconfig.atd_rpc='//localhost/proxy/spellcheck';
        //ckconfig.extraPlugins+="atd-ckeditor,";
        //ckconfig.contentsCss = [basePath+'atd-ckeditor/atd.css'];
        ckconfig.codeSnippet_theme='github';
        ckconfig.codeSnippet_languages = {
            arcade: 'ArcGIS Arcade',
            bash: 'Bash',
            cpp: 'C++',
            css: 'CSS',
            html: 'HTML/XML',
            java: 'Java',
            javascript: 'JavaScript',
            json: 'JSON',
            mathmatica: 'Mathmatica',
            matlab: 'Matlab',
            markdown: 'Markdown',
            php: 'PHP',
            python: 'Python',
            r: 'R',
            ruby: 'Ruby',
            sql: 'SQL',
            stata: 'Stata',
            swift: 'Swift',
            tex: 'TeX'
        };
        ckconfig.extraPlugins+="";

        // Load FontAwesome CSS in case a user wants to manually add FA markup
        ckconfig.contentsCss.push(webJars+'fontawesome/4.7.0/css/font-awesome.min.css');
        //If the siteskin is defined, add the print.css
        if (sakai.editor.sitePrintSkin) {
            ckconfig.contentsCss.push(sakai.editor.sitePrintSkin);
        }
        CKEDITOR.dtd.$removeEmpty.span = false;
        CKEDITOR.dtd.$removeEmpty['i'] = false;
        //Add greek special characters to set
        ckconfig.specialChars = CKEDITOR.config.specialChars.concat([ ["&alpha;","alpha"],["&beta;","beta"],["&gamma;","gamma"],["&delta;","delta"],["&epsilon;","epsilon"],["&zeta;","zeta"],["&eta;","eta"],["&theta;","theta"], ["&iota;","iota"],["&kappa;","kappa"],["&lambda;","lambda"],["&mu;","mu"],["&nu;","nu"],["&xi;","xi"],["&omicron;","omnicron"],["&pi;","pi"],["&rho;","rho"],["&sigma;","sigma"],["&tau;","tau"],["&upsilon;","upsilon"], ["&phi;","phi"],["&chi;","chi"],["&psi;","psi"],["&omega;","omega"],["&Alpha;","Alpha"],["&Beta;","Beta"],["&Gamma;","Gamma"],["&Delta;","Delta"],["&Epsilon;","Epsilon"],["&Zeta;","Zeta"],["&Eta;","Eta"],["&Theta;","Theta"], ["&Iota;","Iota"],["&Kappa;","Kappa"],["&Lambda;","Lambda"],["&Mu;","Mu"],["&Nu;","Nu"],["&Xi;","Xi"],["&Omicron;","Omnicron"],["&Pi;","Pi"],["&Rho;","Rho"],["&Sigma;","Sigma"],["&Tau;","Tau"],["&Upsilon;","Upsilon"], ["&Phi;","Phi"],["&Chi;","Chi"],["&Psi;","Psi"],["&Omega;","Omega"] ]);

        //SAK-44562 Dark Mode
        //Add styles to the content in CKeditor
        if (sakai.editor.sitePropertiesSkin) {
            ckconfig.contentsCss.push(sakai.editor.sitePropertiesSkin);
            ckconfig.contentsCss.push('/library/editor/ckeditor.css');
        }
        ckconfig.contentsCss.push('/library/skin/duke-default/duke-editor.css');

        //CKEditor doesn't have a method to add classes to the HTML element
        //so we manually add the class on load
        //should be refactored when ckeditor5 is implemented
        if (document.firstElementChild.classList.contains('sakaiUserTheme-dark')){

            CKEDITOR.once('instanceReady', addClassOnLoad);
            // //and we watch for switching out or source mode
            CKEDITOR.once('instanceReady', function(editor){
                editor.editor.on('mode', addClassOnModeChange);
            });
        }

        //Enable ckeditor to reflect themeswitcher changes. Overrides:
        //https://github.com/ckeditor/ckeditor4/blob/a786d6f43c17ef90c13b1cf001dbd00204a622b1/skins/moono-lisa/skin.js
        CKEDITOR.skin.chameleon = ( function() {

        templates = {
            editor: new CKEDITOR.template(
                `.cke_reset_all, .cke_reset_all *, .cke_reset_all a, .cke_reset_all textarea [
                    color:{defaultTextColor};
                ]
                {id}.cke_chrome [
                    color:{defaultTextColor};
                    border-color:{defaultBorder};
                ]
                {id} .cke_top [ 
                    background-color:{defaultBackground};
                    border-bottom-color:{defaultBorder};
                ] 
                {id} .cke_bottom [
                    background-color:{defaultBackground};
                    border-top-color:{defaultBorder};
                ] 
                {id} .cke_resizer [
                    border-right-color:{ckeResizer}
                ] 
                {id} .cke_wysiwyg_frame,
                {id} .cke_wysiwyg_div [
                    background:{defaultBackground}
                ] 
                {id} textarea.cke_source [
                    background-color: {lightBackground};
                    color: {defaultTextColor};
                ]` +
                // Dialogs.
                `{id} .cke_dialog_title [
                    color:{defaultTextColor};
                    background-color:{defaultBackground};
                    border-bottom-color:{defaultBorder};
                ] 
                {id} .cke_dialog_footer [
                    color:{defaultTextColor};
                    background-color:{defaultBackground};
                    outline-color:{defaultBorder};
                ] 
                {id} .cke_dialog_tab [
                    color:{defaultTextColor};
                    background-color:{dialogTab};
                    border-color:{defaultBorder};
                ] 
                {id} .cke_dialog_tab:hover, {id} .cke_dialog_tab_selected:hover [
                    color:{menubuttonTextHover};
                    background-color:{lightBackground};
                ] 
                {id} .cke_dialog_contents [
                    color:{defaultTextColor};
                    background-color:{lightBackground};
                    border-top-color:{defaultBorder};
                ] 
                {id} .cke_dialog_tab_selected [
                    color:{defaultTextColor};
                    background:{dialogTabSelected};
                    border-bottom-color:{dialogTabSelectedBorder};
                ] 
                {id} .cke_dialog_body [
                    color:{defaultTextColor};
                    background:{dialogBody};
                    border-color:{defaultBorder};
                ] 
                .cke_dialog a.cke_dialog_ui_button [
                    background:{menubutton};
                    color: {menubuttonIcon};
                ] 
                .cke_dialog a.cke_dialog_ui_button:hover [
                    background:{menubuttonHover};
                    color:{menubuttonTextHover};
                ] 
                .cke_dialog a.cke_dialog_ui_button.cke_dialog_ui_button_ok [
                    background:{okBackground};
                    border-color:{okBorderColor};
                    color: {okColor};
                ] 
                {id} input.cke_dialog_ui_input_text, {id} input.cke_dialog_ui_input_password, {id} input.cke_dialog_ui_input_tel, {id} textarea.cke_dialog_ui_input_textarea, {id} select.cke_dialog_ui_input_select [
                    background:{dialogBody};
                    border-color:{defaultBorder};
                    color:{defaultTextColor};
                ]` +
                // Toolbars, buttons.
                `{id} a.cke_button .cke_button_icon [
                    filter: {invertIfDarkMode}
                ]
                {id} a.cke_button_off:hover,
                {id} a.cke_button_off:focus,
                {id} a.cke_button_off:active [
                    background-color:{darkBackground};
                    border-color:{toolbarElementsBorder};
                    color:{defaultTextColor};
                ] 
                {id} .cke_button_label,
                {id} a.cke_button_off:hover .cke_button_label,
                {id} a.cke_button_off:focus .cke_button_label,
                {id} a.cke_button_off:active .cke_button_label [
                    color:{defaultTextColor};
                ] 
                {id} .cke_button_on [
                    background-color:{ckeButtonOn};
                    border-color:{toolbarElementsBorder};
                ] 
                {id} .cke_toolbar_separator,
                {id} .cke_toolgroup a.cke_button:last-child:after,
                {id} .cke_toolgroup a.cke_button.cke_button_disabled:hover:last-child:after [
                    background-color: {toolbarElementsBorder};
                    border-color: {toolbarElementsBorder};
                ] 
                {id} .cke_button_arrow [
                    border--top-color: {toolbarElementsBorder};
                ]
                .cke_balloon.cke_balloontoolbar [
                    background-color:{lightBackground};
                ]
                .cke_balloon.cke_balloontoolbar .cke_balloon_triangle_inner.cke_balloon_triangle_bottom,
                .cke_balloon.cke_balloontoolbar .cke_balloon_triangle_inner.cke_balloon_triangle_top [
                    border-color: {defaultBorder} transparent;
                ]
                .cke_balloon.cke_balloontoolbar .cke_balloon_triangle_outer.cke_balloon_triangle_bottom,
                .cke_balloon.cke_balloontoolbar .cke_balloon_triangle_outer.cke_balloon_triangle_top [
                    border-color: {defaultBorder} transparent;
                ]` +
                // Combo buttons.
                `{id} a.cke_combo_button:hover,
                {id} a.cke_combo_button:focus,
                {id} .cke_combo_on a.cke_combo_button [
                    border-color:{toolbarElementsBorder};
                    color:{menubuttonTextHover};
                    background-color:{darkBackground};
                ] 
                {id} .cke_combo_arrow,
                {id} .cke_combo:after [
                    border-top-color:{defaultTextColor};
                ] 
                {id} .cke_combo_text [
                    color:{defaultTextColor};
                ]`+
                // Elementspath.
                `{id} .cke_path_item [
                    color:{elementsPathColor};
                ] 
                {id} a.cke_path_item:hover,
                {id} a.cke_path_item:focus,
                {id} a.cke_path_item:active [
                    color:{menubuttonTextHover};
                    background-color:{darkBackground};
                ] 
                {id}.cke_panel [
                    border-color:{defaultBorder};
                ]`
            ),
            panel: new CKEDITOR.template(
                // Context menus.
                `.cke_menubutton_icon [
                    background-color:{menubuttonIcon};
                ] 
                .cke_menubutton:hover,
                .cke_menubutton:focus,
                .cke_menubutton:active [
                    color:{menubuttonTextHover};
                    background-color:{menubuttonHover};
                ] 
                .cke_menubutton:hover .cke_menubutton_icon, 
                .cke_menubutton:focus .cke_menubutton_icon, 
                .cke_menubutton:active .cke_menubutton_icon [
                    color:{menubuttonTextHover};
                    background-color:{menubuttonIconHover};
                ] 
                .cke_menubutton_disabled:hover .cke_menubutton_icon,
                .cke_menubutton_disabled:focus .cke_menubutton_icon,
                .cke_menubutton_disabled:active .cke_menubutton_icon [
                    background-color:{menubuttonIcon};
                ] 
                .cke_menuseparator [
                    background-color:{menubuttonIcon};
                ] ` +
                // Color boxes.
                `a:hover.cke_colorbox, 
                a:active.cke_colorbox [
                    border-color:{defaultBorder};
                ] 
                a:hover.cke_colorauto, 
                a:hover.cke_colormore, 
                a:active.cke_colorauto, 
                a:active.cke_colormore [
                    background-color:{ckeColorauto};
                    border-color:{defaultBorder};
                ] `
            )
        };
            return function( editor, part ) {
                // CKEditor instances have a unique ID, which is used as class name into
                // the outer container of the editor UI (e.g. ".cke_1").
                //
                // The Chameleon feature is available for each CKEditor instance,
                // independently. Because of this, we need to prefix all CSS selectors with
                // the unique class name of the instance.
                uiColor = getComputedStyle(document.firstElementChild);
                templateStyles = {
                id: '.' + editor.id,
                invertIfDarkMode: (document.firstElementChild.classList.contains('sakaiUserTheme-dark')) ? uiColor.getPropertyValue("--sakai-image-invert") : '',
                // These styles are used by various UI elements.
                defaultBorder: uiColor.getPropertyValue("--sakai-border-color"),
                toolbarElementsBorder: uiColor.getPropertyValue("--sakai-border-color"),
                defaultBackground: uiColor.getPropertyValue("--sakai-background-color-2"),
                lightBackground: uiColor.getPropertyValue("--sakai-background-color-1"),
                darkBackground: uiColor.getPropertyValue("--sakai-background-color-3"),
                defaultTextColor: uiColor.getPropertyValue("--sakai-text-color-1"),

                // These are for specific UI elements.
                ckeButtonColor: uiColor.getPropertyValue("--sakai-text-color-1"),
                ckeButtonOn: uiColor.getPropertyValue("--sakai-active-color-1"),
                ckeResizer: uiColor.getPropertyValue("--sakai-text-color-1"),
                ckeColorauto: uiColor.getPropertyValue("--sakai-background-color-3"),
                dialogBody: uiColor.getPropertyValue("--sakai-background-color-2"),
                dialogTab: uiColor.getPropertyValue("--sakai-background-color-2"),
                dialogTabSelected: uiColor.getPropertyValue("--sakai-active-color-1"),
                dialogTabSelectedBorder: uiColor.getPropertyValue("--sakai-border-color"),
                elementsPathColor: uiColor.getPropertyValue("--sakai-text-color-1"),
                menubutton: uiColor.getPropertyValue("--button-background"),
                menubuttonHover: uiColor.getPropertyValue("--button-hover-background"),
                menubuttonTextHover: uiColor.getPropertyValue("--button-hover-text-color"),
                menubuttonIcon: uiColor.getPropertyValue("--button-text-color"),
                menubuttonIconHover: uiColor.getPropertyValue("--button-hover-background"),
                okBackground: uiColor.getPropertyValue("--sakai-color-green--darker-3"),
                okBorderColor: uiColor.getPropertyValue("--sakai-color-green--darker-4"),
                okColor: uiColor.getPropertyValue("--sakai-color-green--lighter-7"),
                }
                return templates[ part ]
                    .output(templateStyles)
                    .replace( /\[/g, '{' )// Replace brackets with braces.
                    .replace( /\]/g, '}' );
            };
        } )();
    })();

    CKEDITOR.once('instanceReady', function(event){
        if (event.editor.lang.mathjax){
            event.editor.lang.mathjax.docUrl = '/portal/help/main?help=sakai.latex'
        }
        // Disable Mathjax plugin in samigo
        if (document.querySelector("#content .Mrphs-sakai-samigo") !== null ){
            document.querySelector('.cke_inner a.cke_button__mathjax').style.display = 'none';
        }
    });

    // DUKE-276
    CKEDITOR.once('instanceReady', function(event){

        if ( event.editor.addMenuItems ) {

            event.editor.addCommand('sakaiContext', {
                exec: function(){}
            });
            event.editor.addMenuGroup( 'sakaiContext', 1 );

            event.editor.addMenuItems({
                sakaiContext: {
                    label: 'Use CMD/CTRL + Right Click for Spell Check',
                    command: 'sakaiContext',
                    group: 'sakaiContext',
                    icon: '/library/skin/duke-default/images/check.png'
                }
            });
            event.editor.contextMenu.addListener(element => {
                return { sakaiContext: CKEDITOR.TRISTATE_OFF };
            });
        }
    });

    let instance = CKEDITOR.replace(targetId, ckconfig);
    //SAK-22505
//       CKEDITOR.on('dialogDefinition', function(e) {
//           // Take the dialog name and its definition from the event
//           // data.
//           var dialogName = e.data.name;
//           var dialogDefinition = e.data.definition;

//           var onShow = dialogDefinition.onShow;
//           dialogDefinition.onShow = function() {
//               var result;
//               if (typeof onShow !== 'undefined' && typeof onShow.call === 'function') {
//                   result = onShow.call(this);
//               }
//               return result;
//           }

//           if ( dialogName == 'link' )
//           {
//               var targetTab = dialogDefinition.getContents('target');
//               var linkTypeItems = targetTab.elements[0].children[0].items;
//               var itemsNoPopup = [];
//               for (i=0;i<linkTypeItems.length;i++) {
//                   if (linkTypeItems[i][1] != "popup") {
//                       itemsNoPopup.push(linkTypeItems[i]);
//                   }
//               }
//               targetTab.elements[0].children[0].items = itemsNoPopup;

//           }

//       });

    return instance;
}

sakai.editor.launch = sakai.editor.editors.ckeditor.launch;
