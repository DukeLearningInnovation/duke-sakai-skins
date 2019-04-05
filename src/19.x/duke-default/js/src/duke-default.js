(function ($) {
    console.log('duke-default.js loaded');

    ///////////////////////////////////////
    // GOOGLE ANALYTICS EVENT TRACKING
    ///////////////////////////////////////

    // click event to show directurl
    $(".Mrphs-toolTitleNav__link--directurl").on("click", function(e) {
        var label=$(this).siblings('.Mrphs-toolTitleNav__link--help-popup')[0].search;

        var gaEventData = {
            'hitType': 'event',
            'eventCategory': 'toolTitleNav',
            'eventAction': 'showDirectLink',
            'eventLabel': document.title + " : " + label.substring(6, label.length)
            };

        ga('send', gaEventData);
    });

    // click event to show help
    $(".Mrphs-toolTitleNav__link--help-popup").on("click", function(e) {
        var label=$(this)[0].search;

        var gaEventData = {
            'hitType': 'event',
            'eventCategory': 'toolTitleNav',
            'eventAction': 'goToHelp',
            'eventLabel': document.title + " : " + label.substring(6, label.length)
            };

        ga('send', gaEventData);
    });

    // click event to show tool dropdown in favorite sites
    $(".Mrphs-sitesNav__dropdown").on("click", function(e) {
        var label=$(this).siblings('a.link-container')[0].title;

        var gaEventData = {
            'hitType': 'event',
            'eventCategory': 'sitesNav',
            'eventAction': 'openToolDropdown',
            'eventLabel': document.title + " : " + label
            };

        ga('send', gaEventData);
    });

    // click event to refresh a tool
    $(".Mrphs-hierarchy--toolName").on("click", function(e) {

        var gaEventData = {
            'hitType': 'event',
            'eventCategory': 'hierarchy',
            'eventAction': 'refreshTool',
            'eventLabel': document.title
            };
            
        ga('send', gaEventData);
    });

    // click event to open sites waffle
    $(".view-all-sites-btn").on("click", function(e) {

        var gaEventData = {
            'hitType': 'event',
            'eventCategory': 'topHeader',
            'eventAction': 'openAllSitesDropdown',
            'eventLabel': document.title
            };
            
        ga('send', gaEventData);
    });

    // click event to collapse left sidebar
    $("#toolsNav-toggle-li").on("click", function(e) {
        var toggleState = 'undefined';
        
        if ($(this).hasClass('min')) {
            toggleState = 'collapseTools';
        } else if ($(this).hasClass('max')) {
            toggleState = 'maximizeTools';
        }

        var gaEventData = {
            'hitType': 'event',
            'eventCategory': 'toolMenu',
            'eventAction': toggleState,
            'eventLabel': document.title
            };

        ga('send', gaEventData);
    });

    // click event to show lessons print view
    $("#print-view").on("click", function(e) {

        var gaEventData = {
            'hitType': 'event',
            'eventCategory': 'toolTitleNav',
            'eventAction': 'showLessonsPrintView',
            'eventLabel': document.title
            };

        ga('send', gaEventData);
    });
    // click event to show lessons view all pages
    $("#show-pages").on("click", function(e) {

        var gaEventData = {
            'hitType': 'event',
            'eventCategory': 'toolTitleNav',
            'eventAction': 'showLessonsPages',
            'eventLabel': document.title
            };

        ga('send', gaEventData);
    });

    /////////////////////////////////////////////////////
    // ADJUST TOOLMENUWRAP BASED ON FAV SITES HEIGHT
    ////////////////////////////////////////////////////
    
    // var favHeight = $('#topnav').height();
    // var newFavHeight = favHeight;
    // var resizeTimeout;
    // console.log(favHeight);
    // var toolWrapMargin = (favHeight + 54) * -1;
    // $('#toolMenuWrap').css('margin-top', toolWrapMargin );
    
    // $( window ).resize(function() {
    //     if (resizeTimeout) {
    //         clearTimeout(resizeTimeout);
    //     }
    //     resizeTimeout = setTimeout(function() {
    //         newFavHeight = $('#topnav').height();
    //         toolWrapMargin = (newFavHeight + 54) * -1;
    //         $('#toolMenuWrap').css('margin-top', toolWrapMargin );
    //         console.log(toolWrapMargin);
    //     }, 100);
        
    // });

}) ($PBJQ);