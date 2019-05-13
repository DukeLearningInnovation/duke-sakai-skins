(function ($) {
    console.log('duke-default/_customization.js loaded');
    
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
    // Currently using CSS absolute positioning for this
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

    /////////////////////////////////////////////////
    // Add styles when impersonating another user
    ////////////////////////////////////////////////
    if ( $('#loginLink1').find('.Mrphs-login-Message').text().startsWith("Return") ){
        $('body').addClass('become-user');
    }

    var currentUrl = new URL(window.location.href);
    var serverClass = currentUrl.hostname.replace(/\./g, '-');
    $('body').addClass(serverClass);


    /////////////////////////////////////////////////
    // Add role to body as class
    ////////////////////////////////////////////////
    $('body').addClass(portal.user.siteRole.toLowerCase());


    /////////////////////////////////////////////////
    // Adjust hamburger menu when system alerts are active
    ////////////////////////////////////////////////
    var pasystemTimeout;
    var collapseToolsAdjustedTop = 0;


    adjustForPasystemLoad();
    function pasystemLoaded() {
        $(".pasystem-banner-alert-toggle, .pasystem-banner-alert-close").on('click', adjustForPasystemDismiss);
    }
    
    

    function adjustForPasystemLoad(){
        // Select the node that will be observed for mutations
        var targetNode = document.getElementsByClassName('Mrphs-portalBody')[0];

        // Options for the observer (which mutations to observe)
        var config = { childList: true };

        // Callback function to execute when mutations are observed
        var portalMutationCallback = function(mutationsList, observer) {

                mutationsList.forEach(function(mutation) {

                    if (mutation.type == 'childList') {
                       
                        var mutationTarget = mutation.target.childNodes[0];
                        
                        if (mutationTarget.className == 'pasystem-banner-alerts'){
                            
                            collapseToolsAdjustedTop = mutationTarget.offsetHeight;
                            $('#toolsNav-toggle-li').css({'top': collapseToolsAdjustedTop});
                            pasystemLoaded();
                            // observer.disconnect();

                            // return false;
                        }
                    }
                });
            };

        // Create an observer instance linked to the callback function
        var observer = new MutationObserver(portalMutationCallback);

        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);
    }

    function adjustForPasystemDismiss(){
        var timeoutID = window.setTimeout(function() {
            console.log(document.getElementsByClassName('pasystem-banner-alerts'));
            collapseToolsAdjustedTop = document.getElementsByClassName('pasystem-banner-alerts')[0].clientHeight;
            $('#toolsNav-toggle-li').css({'top': collapseToolsAdjustedTop});
            console.log(collapseToolsAdjustedTop);
        }, 500);
    
    }
    
    //Adjust the toolCollapse on window scroll
    $(window).scroll(function(){

		if($(window).scrollTop() > 0) {
			
				$('#toolsNav-toggle-li').css({'top': 0});
		  
		} else {
            $('#toolsNav-toggle-li').css({'top': collapseToolsAdjustedTop});

		}
  });
    
}) ($PBJQ);