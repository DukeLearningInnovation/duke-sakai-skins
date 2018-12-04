(function ($) {
    $('iframe[src^="https://www.youtube"], iframe[src^="https://warpwire"]')
        .addClass('embed-responsive-item')
        .parent().addClass('embed-responsive-16by9 embed-responsive');

        /* Track outbound links in Google Analytics */
        /*
        //"use strict";
  
        // current page host
        var baseURI = window.location.host;
      
        // click event on body
        $("body").on("click", function(e) {
      
          // abandon if link already aborted or analytics is not available
          if (e.isDefaultPrevented() || typeof ga !== "function") return;
      
          // abandon if no active link or link within domain
          var link = $(e.target).closest("a");
          if (link.length != 1 || baseURI == link[0].host) return;
      
          // cancel event and record outbound link
          e.preventDefault();
          var href = link[0].href;

          var gaEventData = {
            'hitType': 'event',
            'eventCategory': 'outbound',
            'eventAction': 'link',
            'eventLabel': href,
            'hitCallback': loadPage
          };
          console.log(gaEventData);
          
          ga('send', {
            'hitType': 'event',
            'eventCategory': 'outbound',
            'eventAction': 'link',
            'eventLabel': href,
            'hitCallback': loadPage
          });
      
          // redirect after one second if recording takes too long
          setTimeout(loadPage, 1000);
      
          // redirect to outbound page
          function loadPage() {
            document.location = href;
          }
      
        });
        */
        
}) ($PBJQ);

