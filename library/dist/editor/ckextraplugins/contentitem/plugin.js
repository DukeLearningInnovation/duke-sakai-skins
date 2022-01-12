/**
 * Basic sample plugin inserting current date and time into CKEditor editing area.
 */

// Register the plugin with the editor.
// http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.plugins.html
// let ContentItemIFrame = null;
let sakaiContentItemPluginInstance = 1;
CKEDITOR.plugins.add("sakaicontentitem", {
  requires: ["iframedialog"],
  lang: ["en", "es"],
  // The plugin initialization logic goes inside this method.
  // http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.pluginDefinition.html#init
  init: function (editor) {
    let sakaiContentItemInstance = sakaiContentItemPluginInstance;
    sakaiContentItemPluginInstance++;

    let SakaiContentItemIFrameWindow = null;

    // http://ckeditor.com/forums/CKEditor-3.x/iframe-dialog-how-get-ok-button-pressed-event
    // https://gist.github.com/garryyao/1170303
    let height = 480;
    let width = 750;
    if (
      typeof sakai == "undefined" ||
      typeof sakai.editor == "undefined" ||
      typeof sakai.editor.contentItemUrl == "undefined" ||
      sakai.editor.contentItemUrl.length <= 0
    ) {
      console.log("error with sakai.editor.contentItemUrl");
    } else {
      CKEDITOR.dialog.addIframe(
        "SakaiContentItemDialog" + sakaiContentItemInstance,
        editor.lang.sakaicontentitem.title,
        sakai.editor.contentItemUrl,
        width,
        height,
        function () {
          let self = this;
          try {
            // Iframe loaded callback.
            var iframe = document.getElementById(self._.frameId);
            SakaiContentItemIFrameWindow = iframe.contentWindow;
            self.getDialog().addFocusable(self.getElement(), 0);
            self.focus();
          } catch (error) {
            console.error(error);
          }
        },
        {
          onOk: function () {
            try {
              // Dialog onOk callback.
              var editor = this._.editor;
              var items = SakaiContentItemIFrameWindow.returned_content_item;
              if (items) {
                for (var i = 0; i < items.length; i++) {
                  var item = items[i];
                  // console.log(item["@type"]);
                  try {
                    if (
                      item["@type"] == "LtiLinkItem" ||
                      item["type"] == "ltiResourceLink"
                    ) {
                      var iframeString;
                      // Deep Link 1.0
                      if (
                        item.launch &&
                        item.placementAdvice &&
                        item.placementAdvice.displayWidth &&
                        item.placementAdvice.displayWidth > 10 &&
                        item.placementAdvice.displayHeight &&
                        item.placementAdvice.displayHeight > 10 &&
                        item.placementAdvice.presentationDocumentTarget &&
                        item.placementAdvice.presentationDocumentTarget ==
                          "iframe"
                      ) {
                        iframeString =
                          '<br/><iframe src="' +
                          CKEDITOR.tools.htmlEncode(item.launch) +
                          '" ' +
                          'height="' +
                          CKEDITOR.tools.htmlEncode(
                            item.placementAdvice.displayHeight
                          ) +
                          '" ' +
                          'width="' +
                          CKEDITOR.tools.htmlEncode(
                            item.placementAdvice.displayWidth
                          ) +
                          '" ' +
                          'title="' +
                          CKEDITOR.tools.htmlEncode(item.title) +
                          '" ' +
                          'allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" ' +
                          'allow="camera; microphone" ' +
                          'class="lti-iframe"></iframe><br/>';
                        // Deep Link 2.0
                      } else if (
                        item.launch &&
                        item.presentation &&
                        item.presentation.documentTarget &&
                        item.presentation.documentTarget == "iframe" &&
                        item.presentation.width &&
                        item.presentation.height &&
                        item.presentation.width > 10 &&
                        item.presentation.height > 10
                      ) {
                        iframeString =
                          '<br/><iframe src="' +
                          CKEDITOR.tools.htmlEncode(item.launch) +
                          '" ' +
                          'height="' +
                          CKEDITOR.tools.htmlEncode(item.iframe.height) +
                          '" ' +
                          'width="' +
                          CKEDITOR.tools.htmlEncode(item.iframe.width) +
                          '" ' +
                          'title="' +
                          CKEDITOR.tools.htmlEncode(item.title) +
                          '" ' +
                          'allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" ' +
                          'allow="camera; microphone" ' +
                          'class="lti-iframe"></iframe><br/>';

                        // ContentItem 2.0 B
                      } else if (
                        item.launch &&
                        item.iframe &&
                        item.iframe.width &&
                        item.iframe.height &&
                        item.iframe.width > 10 &&
                        item.iframe.height > 10
                      ) {
                        iframeString =
                          '<br/><iframe src="' +
                          CKEDITOR.tools.htmlEncode(item.launch) +
                          '" ' +
                          'height="' +
                          CKEDITOR.tools.htmlEncode(item.iframe.height) +
                          '" ' +
                          'width="' +
                          CKEDITOR.tools.htmlEncode(item.iframe.width) +
                          '" ' +
                          'title="' +
                          CKEDITOR.tools.htmlEncode(item.title) +
                          '" ' +
                          'allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" ' +
                          'allow="camera; microphone" ' +
                          'class="lti-iframe"></iframe><br/>';
                      } else {
                        iframeString =
                          '<a href="' +
                          CKEDITOR.tools.htmlEncode(item.launch) +
                          '" target="_blank" class="lti-launch">' +
                          CKEDITOR.tools.htmlEncode(item.title) +
                          "</a><br/>";
                      }
                      // console.log(iframeString);
                      editor.insertHtml(iframeString, "unfiltered_html");
                    } else if (
                      item["@type"] == "ContentItem" &&
                      item["mediaType"].startsWith("image/") &&
                      item.placementAdvice.displayWidth &&
                      item.placementAdvice.displayWidth > 10
                    ) {
                      editor.insertHtml(
                        '<img src="' +
                          CKEDITOR.tools.htmlEncode(item.url) +
                          '" class="lti-image" width="' +
                          CKEDITOR.tools.htmlEncode(
                            item.placementAdvice.displayWidth
                          ) +
                          '" alt="' +
                          CKEDITOR.tools.htmlEncode(item.title) +
                          '" /><br/>'
                      );
                    } else if (
                      item["@type"] == "ContentItem" &&
                      item["mediaType"].startsWith("image/") &&
                      item.placementAdvice.displayHeight &&
                      item.placementAdvice.displayHeight > 10
                    ) {
                      editor.insertHtml(
                        '<img src="' +
                          CKEDITOR.tools.htmlEncode(item.url) +
                          '" class="lti-image" height="' +
                          CKEDITOR.tools.htmlEncode(
                            item.placementAdvice.displayHeight
                          ) +
                          '" alt="' +
                          CKEDITOR.tools.htmlEncode(item.title) +
                          '" /><br/>'
                      );
                    } else if (
                      item["@type"] == "ContentItem" &&
                      item["mediaType"].startsWith("image/")
                    ) {
                      editor.insertHtml(
                        '<img src="' +
                          CKEDITOR.tools.htmlEncode(item.url) +
                          '" class="lti-image" alt="' +
                          CKEDITOR.tools.htmlEncode(item.title) +
                          '" /><br/>'
                      );
                    } else if (item["@type"] == "ContentItem") {
                      editor.insertHtml(
                        '<a href="' +
                          CKEDITOR.tools.htmlEncode(item.url) +
                          '" target="_blank" class="lti-contentitem">' +
                          CKEDITOR.tools.htmlEncode(item.title) +
                          "</a><br/>"
                      );
                    } else if (
                      item["@type"] == "FileItem" &&
                      item["mediaType"].startsWith("image/")
                    ) {
                      editor.insertHtml(
                        '<img src="' +
                          CKEDITOR.tools.htmlEncode(item.url) +
                          '" class="lti-image" alt="' +
                          CKEDITOR.tools.htmlEncode(item.title) +
                          '" /><br/>'
                      );
                    } else {
                      console.log("Not handled: " + item["@type"]);
                    }
                  } catch (err) {
                    console.error(err);
                  }
                }
              }
            } catch (error) {
              console.error(error);
            }
          },
        }
      );
    }
    editor.addCommand(
      "SakaiContentItemDialog" + sakaiContentItemInstance,
      new CKEDITOR.dialogCommand(
        "SakaiContentItemDialog" + sakaiContentItemInstance
      )
    );

    // Create a toolbar button that executes the plugin command.
    // http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.ui.html#addButton
    editor.ui.addButton("SakaiContentItem", {
      // Toolbar button tooltip.
      label: editor.lang.sakaicontentitem.tooltip,
      // Reference to the plugin command name.
      command: "SakaiContentItemDialog" + sakaiContentItemInstance,
      // Button's icon file path.
      icon: this.path + "images/contentitem.png",
    });
  },
});
