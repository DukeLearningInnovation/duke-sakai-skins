(function ($) {
    $('iframe[src^="https://www.youtube"], iframe[src^="https://warpwire"]')
        .addClass('embed-responsive-item')
        .parent().addClass('embed-responsive-16by9 embed-responsive');


        /*****************************
        Look for inline multiple choice questions in Lessons
        Part of the fix for #36
        ******************************/ 

        //Find all multiple choice questions on the page
        var mcqs = $(".mainList .multipleChoiceForm");

        //Iterate over the questions, if they have already
        //been answered, add a disabled class to the form
        mcqs.each(function(){
            if( $(this).find('input[value="Submit Answer"]').prop('disabled')){
                $(this).addClass('disabled');
            }
        });

        //For questions that have not yet been answered
        //this emulated edX answer hover behavior. The
        //entire answer container is hover/clickable
        //not just the radio button itself
        $(".mainList .multipleChoiceForm").on("click", ".multipleChoiceAnswer",function(e){
            var radio = $(this).find('input[type="radio"]');
            var submitBtn = $( this ).parent().find('input[value="Submit Answer"]');

            if(!submitBtn.prop('disabled')){
                if(radio.prop( "checked" )){
                    radio.prop("checked", false);

                } else{
                    radio.prop( "checked", true );
                }
                //override inline style put in by lessons
                submitBtn.addClass('btn-primary').css('color','#fff !important');
            }
                
        });
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

