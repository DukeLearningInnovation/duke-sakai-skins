///////////////////////////////////////
// GOOGLE ANALYTICS EVENT TRACKING
///////////////////////////////////////

    // click event to show directurl
    $PBJQ(".Mrphs-toolTitleNav__link--directurl").on("click", function(e) {
        var label=$PBJQ(this).siblings('.Mrphs-toolTitleNav__link--help-popup')[0].search;

        var gaEventData = {
            'hitType': 'event',
            'eventCategory': 'toolTitleNav',
            'eventAction': 'showDirectLink',
            'eventLabel': document.title + " : " + label.substring(6, label.length)
            };
        if (typeof ga === 'function') {
            ga('send', gaEventData);
        }
    });

    // click event to show help
    $PBJQ(".Mrphs-toolTitleNav__link--help-popup").on("click", function(e) {
        var label=$PBJQ(this)[0].search;

        var gaEventData = {
            'hitType': 'event',
            'eventCategory': 'toolTitleNav',
            'eventAction': 'goToHelp',
            'eventLabel': document.title + " : " + label.substring(6, label.length)
            };
        if (typeof ga === 'function') {
            ga('send', gaEventData);
        }
    });

    // click event to lessons print view
    $PBJQ("#print-view").on("click", function(e) {
        var label=$PBJQ(this)[0].search;

        var gaEventData = {
            'hitType': 'event',
            'eventCategory': 'toolTitleNav',
            'eventAction': 'lessionsPrintView',
            'eventLabel': document.title + " : " + label.substring(6, label.length)
            };
        if (typeof ga === 'function') {
            ga('send', gaEventData);
        }
    });

    // click event to lessons print all
    $PBJQ("#print-all").on("click", function(e) {
        var label=$PBJQ(this)[0].search;

        var gaEventData = {
            'hitType': 'event',
            'eventCategory': 'toolTitleNav',
            'eventAction': 'lessionsPrintAll',
            'eventLabel': document.title + " : " + label.substring(6, label.length)
            };
        if (typeof ga === 'function') {
            ga('send', gaEventData);
        }
    });

    // click event to lessons Index of Pages
    $PBJQ("#show-pages").on("click", function(e) {
        var label=$PBJQ(this)[0].search;

        var gaEventData = {
            'hitType': 'event',
            'eventCategory': 'toolTitleNav',
            'eventAction': 'lessionsIndexOfPages',
            'eventLabel': document.title + " : " + label.substring(6, label.length)
            };
        if (typeof ga === 'function') {
            ga('send', gaEventData);
        }
    });

    // click event to show tool dropdown in favorite sites
    $PBJQ(".Mrphs-sitesNav__dropdown").on("click", function(e) {

        var label=$PBJQ(this).siblings('a.link-container')[0].title;

        var gaEventData = {
            'hitType': 'event',
            'eventCategory': 'sitesNav',
            'eventAction': 'openToolDropdown',
            'eventLabel': document.title + " : " + label
            };
        if (typeof ga === 'function') {
            ga('send', gaEventData);
        }
    });

    // click event to refresh a tool
    $PBJQ(".Mrphs-hierarchy--toolName").on("click", function(e) {

        var gaEventData = {
            'hitType': 'event',
            'eventCategory': 'hierarchy',
            'eventAction': 'refreshTool',
            'eventLabel': document.title
            };
        if (typeof ga === 'function') {
            ga('send', gaEventData);
        }
    });

    // click event to open sites waffle
    $PBJQ(".view-all-sites-btn").on("click", function(e) {

        var gaEventData = {
            'hitType': 'event',
            'eventCategory': 'topHeader',
            'eventAction': 'openAllSitesDropdown',
            'eventLabel': document.title
            };
        if (typeof ga === 'function') {
            ga('send', gaEventData);
        }
    });

    // click event to collapse left sidebar
    $PBJQ("#toolsNav-toggle-li").on("click", function(e) {
        var toggleState = 'undefined';
        
        if ($PBJQ(this).hasClass('min')) {
            toggleState = 'collapseTools';
        } else if ($PBJQ(this).hasClass('max')) {
            toggleState = 'maximizeTools';
        }

        var gaEventData = {
            'hitType': 'event',
            'eventCategory': 'toolMenu',
            'eventAction': toggleState,
            'eventLabel': document.title
            };
        if (typeof ga === 'function') {
            ga('send', gaEventData);
        }
    });

    // click event to show lessons print view
    $PBJQ("#print-view").on("click", function(e) {

        var gaEventData = {
            'hitType': 'event',
            'eventCategory': 'toolTitleNav',
            'eventAction': 'showLessonsPrintView',
            'eventLabel': document.title
            };
        if (typeof ga === 'function') {
            ga('send', gaEventData);
        }
    });
    // click event to show lessons view all pages
    $PBJQ("#show-pages").on("click", function(e) {

        var gaEventData = {
            'hitType': 'event',
            'eventCategory': 'toolTitleNav',
            'eventAction': 'showLessonsPages',
            'eventLabel': document.title
            };
        if (typeof ga === 'function') {
            ga('send', gaEventData);
        }
    });

var dukeAddBodyClasses = function(){
    var bodyClasses = [];
    /////////////////////////////////////////////////
    // Add server domain to body as class
    ////////////////////////////////////////////////
    var serverClass = new URL(window.location.href).hostname.replace(/\./g, "-");
    bodyClasses.push(`duke-${serverClass}`);

    /////////////////////////////////////////////////
    // Add role to body as class
    ////////////////////////////////////////////////
    var userSiteRole = `duke-role-${portal.user.siteRole.toLowerCase().replace(/\s/g, '')}`;
    bodyClasses.push(userSiteRole);

    document.getElementsByTagName("body")[0].classList.add(...bodyClasses);

}; 
dukeAddBodyClasses();

/////////////////////////////////////////////////
// Adjust hamburger menu when system alerts are active
////////////////////////////////////////////////

var dukeCollapseToolsAdjustedTop = 0;

// Call the observer to watch Mrphs-portalBody for
// dynamic loading of the pasystem
var dukeAdjustNodesForPASystem = function(nodes,top) {
    document.querySelectorAll(nodes).forEach(el => el.style.top = `${top}px`); 

};




var dukeWatchForPasystemLoad = function(nodesToMove){
    // Select the node that will be observed for mutations
    var targetNode = document.getElementsByClassName('Mrphs-portalBody')[0];

    // Options for the observer (which mutations to observe)
    var config = { childList: true };

    // Callback function to execute when mutations are observed
    var portalMutationCallback = function(mutationsList, portalObserver) {

        for(var mutation of mutationsList) {

            if (mutation.type == 'childList') {

                var mutationTarget = mutation.target.childNodes[0];

                if (mutationTarget.className == 'pasystem-banner-alerts'){
                    
                    // Adjust hamburger for initial load of pasystem
                    dukeCollapseToolsAdjustedTop = document.getElementsByClassName('pasystem-banner-alerts')[0].clientHeight;
                    dukeAdjustNodesForPASystem(nodesToMove, dukeCollapseToolsAdjustedTop);
                    // document.querySelectorAll(nodesToMove).forEach(el => el.style.top = `${dukeCollapseToolsAdjustedTop}px`); 
                    // Start observing events that change the pasystem
                    dukeWatchForPasystemChange(nodesToMove);

                    // disconnect the portalBody observer, it is no longer needed
                    // once the pasystem is loaded into the DOM
                    portalObserver.disconnect();
                }
            }
        }
    };

    // Create an observer instance linked to the callback function
    var portalObserver = new MutationObserver(portalMutationCallback);

    // Start observing the target node for configured mutations
    portalObserver.observe(targetNode, config);

};

var dukeWatchForPasystemChange = function(nodesToMove){

    // Select the node that will be observed for mutations
    var pasystemNode = document.getElementsByClassName('pasystem-banner-alerts')[0];
    var pasystemToggleNode = document.getElementsByClassName('pasystem-banner-alert-toggle')[0];

    // Options for the observer (which mutations to observe)
    var config = {
        childList: true,
        attributes: true,
        subtree:true,
        attributeOldValue: true
    };

    // Callback function to execute when mutations are observed
    var pasystemMutationCallback = function(mutationsList, pasystemObserver) {

        for(var mutation of mutationsList) {

            if (mutation.type == 'childList') {
                    dukeCollapseToolsAdjustedTop = pasystemNode.clientHeight;
                    // $PBJQ('#toolsNav-toggle-li').css({'top': dukeCollapseToolsAdjustedTop});
                    // $PBJQ('.Mrphs-siteHierarchy .Mrphs-hierarchy--siteName').css({'top': dukeCollapseToolsAdjustedTop});
                    dukeAdjustNodesForPASystem(nodesToMove, dukeCollapseToolsAdjustedTop);
            }
            
            if (mutation.type == 'attributes' && mutation.target.className.includes('pasystem-banner-alert')) {
                    dukeCollapseToolsAdjustedTop = pasystemNode.clientHeight;
                    // $PBJQ('#toolsNav-toggle-li').css({'top': dukeCollapseToolsAdjustedTop});
                    // $PBJQ('.Mrphs-siteHierarchy .Mrphs-hierarchy--siteName').css({'top': dukeCollapseToolsAdjustedTop});
                    dukeAdjustNodesForPASystem(nodesToMove, dukeCollapseToolsAdjustedTop);
            }
        }
    };

    // Create an observer instance linked to the callback function
    var pasystemObserver = new MutationObserver(pasystemMutationCallback);
    var pasystemToggleObserver = new MutationObserver(pasystemMutationCallback);
    
    // Start observing the target node for configured mutations
    pasystemObserver.observe(pasystemNode, config);
    
    // The toggleNode is in a separate part of the DOM
    // so it needs its own observer
    pasystemToggleObserver.observe(pasystemToggleNode, config);

};



//Adjust the toolCollapse on window scroll
var dukeWatchForPASystemOnScroll = function(nodes){
    window.addEventListener('scroll', event => {
        if (window.scrollY > 0) {
            dukeAdjustNodesForPASystem(nodes, 0);
        } else {
            dukeAdjustNodesForPASystem(nodes, dukeCollapseToolsAdjustedTop);
        }
    });    
};

dukeWatchForPasystemLoad("#toolsNav-toggle-li");
dukeWatchForPASystemOnScroll("#toolsNav-toggle-li");

/////////////////////////////////////////////////
// Make all MOTD cards the same height
////////////////////////////////////////////////
if (document.title === 'Sakai : Home : Overview') {
    const setMOTDHeights = window.setTimeout(function(){
        let toolBodyMOTD = document.getElementsByClassName('Mrphs-toolBody--sakai-motd')[0].getElementsByTagName('iframe')[0].contentWindow;

        let motdCards = toolBodyMOTD.document.getElementsByClassName('textPanel');

        let motdArr = [].slice.call(motdCards);
        let tallestMOTD = Math.max.apply(Math, motdArr.map(function(card){return card.clientHeight}));

        for (let i = 0; i < motdArr.length; i++) {
            motdCards[i].style.height = `${tallestMOTD}px`;
        }
    },1000);
}

///////////////////////////////////////////////////
// #157 Inject skin modified date into footer 
///////////////////////////////////////////////////
if ( document.getElementById('Mrphs-footer--details__info') !== 'null'){
    //the bin/uglify.sh script updates this on compile
    let buildTimeHtml = "<dt>Skin Version:</dt><dd>DUKEGITHUBSHA</dd>";

    document.getElementById('serverTime').insertAdjacentHTML('afterend',buildTimeHtml);
}

// #222
let logoContainer = document.querySelector('.Mrphs-headerLogo--institution');
let homeLinkContainer = document.querySelector('.Mrphs-sitesNav__menuitem--myworkspace .link-container');
logoContainer.style.cursor = 'pointer';
logoContainer.addEventListener("click", function(evt){
    
    var gaEventData = {
        'hitType': 'event',
        'eventCategory': 'topHeader',
        'eventAction': 'clickLogo',
        'eventLabel': document.title
        };
    if (typeof ga === 'function') {
        ga('send', gaEventData);
    }

    homeLinkContainer.click();
});
