/**********************************************************************
//
// Warpwire Sakai Plugin 3.0.4
//
// Copyright 2019 Warpwire, Inc Licensed under the
//  Educational Community License, Version 2.0 (the "License"); you may
//  not use this file except in compliance with the License. You may
//  obtain a copy of the License at
//
// http://www.opensource.org/licenses/ECL-2.0
//
//  Unless required by applicable law or agreed to in writing,
//  software distributed under the License is distributed on an "AS IS"
//  BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
//  or implied. See the License for the specific language governing
//  permissions and limitations under the License.
//	
**********************************************************************/
(function($) {
	// default Warpwire access level
	var _IFRAME_ACCESS_STANDARD = 1;
	var _IFRAME_ACCESS_RESTRICTED = 0;
	var _IFRAME_ACCESS_REQUEST_PERMISSION = 2;

	// the default access control for Warpwire iframe
	var _WW_DEFAULT_SECURITY_LEVEL = _IFRAME_ACCESS_STANDARD;

	// append url arguments to a given url
	var addUrlArgument = function(url, key, value) {
		var urlElement = document.createElement('a');
		var getParams = '';

		urlElement.href = url;
		getParams = urlElement.search.replace(/^\?/, '');

		if(getParams.length > 0) {
			getParams = getParams + '&';
		}
		return(url + '?' + getParams + key + '=' + value);
	};

	// find all of the valid iframes on the page and apply the appropriate security context
	var getIframes = function(doc) {
		// find all iframes in the current context
		$(doc).find('iframe').each(function(key, iframe) {
			// wait until the iframe is loaded to process this function
			$(iframe).load(function() {
				try {
					var windowDoc = this.contentWindow.document || this.contentDocument;
					// recurse through the DOM until all frames are discovered
					getIframes(windowDoc);
				} catch(e) {}
			});
		});
		displayIframeContent(doc);
	};

	var displayIframeContent = function(doc) {
		// add allowfullscreen to the outer iframe container
		$(window.top.document).find('[class*=-warpwire] iframe').each(function(key, element) {
			$(element).attr('allowfullscreen', '');
			$(element).attr('scrolling', '0');
			$(element).attr('title', 'Warpwire Media');
			$(element).attr('allow', 'autoplay *; encrypted-media *; fullscreen *;');
			$(element).attr('frameborder', '0');
		});

		var wwSakaiTool = $('.icon-sakai-warpwire');
		var wwToolExists = true;

		// add a note if the ww sakai button does not exist
		if((typeof wwSakaiTool == 'undefined') || (wwSakaiTool.length <= 0)) {
			// installed warpwire tool does not exist - look for external tool installations
			wwSakaiTool = $('[class$=__menuitem--title]');
			var wwSakaiToolLongText = {};
			$.each(wwSakaiTool, function(key, value) {
				if($(value).html().trim().toLowerCase().indexOf('warpwire') >= 0) {
					wwSakaiToolLongText = $(value);
					return(false);
				}
			});
			// assign the wwSakaiTool to the temporary object
			wwSakaiTool = wwSakaiToolLongText;
			// warpwire tool does not exist as an installed or external tool
			if((typeof wwSakaiTool == 'undefined') || (wwSakaiTool.length <= 0))
				wwToolExists = false;
		}

		// load the iframe content for the legacy plugin information
		var authCheck = false;
		// apply the appropriate security context to any Warpwire content
		$(doc).find('span._ww_iframe_embed').each(function(index, wwSpan) {
			var self = this;

			// check for contained iframe
			if($(wwSpan).children('img')) {
				var contentItemIframe = $(wwSpan).children('img')[0];
				// ContentItem frames automatically provide launch context authorization
				if(!$(contentItemIframe).hasClass('lti-content-item-iframe-launch')) {
					return(true);
				}

				// the security context is restricted, do not render the iframe
				if(_WW_DEFAULT_SECURITY_LEVEL == _IFRAME_ACCESS_RESTRICTED) {
					var linkAttributes = {
						class: $(contentItemIframe).attr('class'),
						href: $(wwSpan).attr('rel'),
						text: $(contentItemIframe).attr('alt')
					};

					// replace the placeholder image with an iframe
					$(contentItemIframe).replaceWith($('<a>', linkAttributes));
					return(true);
				}
				
				var titleText = 'Warpwire Media';
				if (contentItemIframe.alt != null && contentItemIframe.alt.length > 0) {
					titleText = contentItemIframe.alt;
				}
				// setup the underlying iframe and apply additional security context conditions
				var iframeAttributes = {
					width: $(contentItemIframe).attr('width'),
					height: $(contentItemIframe).attr('height'),
					class: $(contentItemIframe).attr('class'),
					allowfullscreen: '',
					title: titleText,
					allow: 'autoplay *; encrypted-media *; fullscreen *;',
					frameborder: '0',
					scrolling: '0'
				};

				// replace the placeholder image with an iframe
				$(contentItemIframe).replaceWith($('<iframe>', iframeAttributes));

				// request that the DOM load the newly replaced iframe context
				var contentItemIframe = $(wwSpan).children('iframe')[0];

				if(_WW_DEFAULT_SECURITY_LEVEL != _IFRAME_ACCESS_REQUEST_PERMISSION) {
					$(contentItemIframe).attr('src', $(wwSpan).attr('rel'));
				} else {
					// highest security context transform iframes into standard links
					$(contentItemIframe).css({
						'display': 'none'
					});
					$(contentItemIframe).attr('data-src', $(wwSpan).attr('rel'));
				}

				// the default security context is applied, no additional processing required
				if(_WW_DEFAULT_SECURITY_LEVEL == _IFRAME_ACCESS_STANDARD) {
					return(true);
				}

				// request the ask user permission layout and event handlers
				permissionElement = requestUserPermission(contentItemIframe);
				$(wwSpan).append(permissionElement);

				// all security contexts applied, process legacy embed elements
				return(true);
			}
		});

		// find any embedded Warpwire content
		$(doc).find('span._ww_iframe_embed').each(function(index, wwSpan) {
			// this is the legacy section for pre-content-item launches
			if(!$(wwSpan).children('img')) {
				return(true);
			}

			// the rel attribute is required to process this image
			if(!$(wwSpan).attr('rel')) {
				return(true);
			}

			var dataElements = {
				src: '',
			};

			try {
				// extract the attributes from the containing span
				var extractedParts = JSON.parse($(wwSpan).attr('rel'));

				// build the URL data structure
				$.each(extractedParts, function(partName, partValue) {
					partName = partName.replace('_ww_', '');
					if(partName == 'src') {
						dataElements[partName] = addUrlArgument(partValue, 'co', 'sakai');
					} else {
						dataElements[partName] = partValue;
					}
				});

				// iterate through the child image nodes extracting the Warpwire embed attributes
				$.each($(wwSpan).children('img'), function(key, wwImage) {
					// the image is not a valid Warpwire image
					if(!$(wwImage).hasClass('_ww_img')) {
						return(true);
					}

					var localWidth = 640;
					var localHeight = 360;

					// provide context to the user regarding the link location	
					if($(wwImage).attr('alt')) {
						dataElements['alt'] = $(wwImage).attr('alt');
					} else if(dataElements.hasOwnProperty('alt')) {
						dataElements['alt'] = dataElements.alt;
					} else if(dataElements.hasOwnProperty('src')) {
						dataElements['alt'] = dataElements.src;
					} else {
						dataElements['alt'] = 'Link';
					}
					// set the custom width and height parameters
					if($(wwImage).attr('width') && parseInt($(wwImage).attr('width')) > 0) {
						localWidth = parseInt($(wwImage).attr('width'));
					}
					if($(wwImage).attr('height') && parseInt($(wwImage).attr('height')) > 0) {
						localHeight = parseInt($(wwImage).attr('height'));
					}

					// the security context is restricted, do not render the iframe
					if(_WW_DEFAULT_SECURITY_LEVEL == _IFRAME_ACCESS_RESTRICTED) {
						// replace the placeholder image with an iframe
						var linkParagraph = document.createElement('p');
						var linkNode = document.createElement('a');
						if(dataElements.hasOwnProperty('class')) {
							linkNode.setAttribute('class', dataElements.class);
						}

						// add the link name
						if(dataElements.hasOwnProperty('alt')) {
							linkNode.text = dataElements.alt;
						}
						if(dataElements.hasOwnProperty('class')) {
							linkNode.setAttribute('class', dataElements.class);
						}
						if(dataElements.hasOwnProperty('src')) {
							linkNode.setAttribute('href', dataElements.src);
						}
						linkParagraph.appendChild(linkNode);

						$(wwSpan).replaceWith(linkParagraph);
						return(true);
					}

					var iframeAttributes = {
						src: '',
						width: localWidth,
						height: localHeight,
						border: 0,
						frameborder: 0,
						scrolling: 0,
						allowfullscreen: '',
						title: 'Warpwire Media',
						allow: 'autoplay *; encrypted-media *; fullscreen *;'
					};

					// the security policy is standard, render the corresponding iframe
					if(_WW_DEFAULT_SECURITY_LEVEL == _IFRAME_ACCESS_STANDARD) {
						iframeAttributes.src = dataElements.src;
						$(wwImage).replaceWith($('<iframe>', iframeAttributes));
						return(true);
					}
					// the security policy requires user approval
					else if(_WW_DEFAULT_SECURITY_LEVEL == _IFRAME_ACCESS_REQUEST_PERMISSION) {
						// change the src attribute to reflect a temporary src
						iframeAttributes['data-src'] = dataElements.src;
						// add the iframe to the underlying span element
						var contentIframe = $('<iframe>', iframeAttributes).appendTo($(wwSpan));
						// hide the iframe
						$(contentIframe).css({
							'display': 'none'
						});
						// replace the image with the permission element
						$(wwImage).replaceWith(requestUserPermission($(contentIframe)));
					}
				});

				if((!authCheck) && (wwToolExists) &&
					(typeof wwSakaiTool != 'undefined') && (wwSakaiTool.length > 0) &&
					(wwSakaiTool.parent().attr('href'))
				) {
					// the iframe which will handle login on page load
					var iframeAuth = $('<iframe />');
					// add a unique id for the iframe
					iframeAuth.attr('id', 'ww_login_iframe');
					iframeAuth.attr('height', '1px');
					iframeAuth.attr('width', '1px');
					iframeAuth.attr('style', 'left: -9999px; position: absolute; border: none;');
					iframeAuth.attr('src', wwSakaiTool.parent().attr('href'));

					setTimeout(function() {
						$(wwSpan).append(iframeAuth);
					}, 1000);

					authCheck = true;
					// remove login iframe after enough time has passed to login
					var removeLoginIframe = setTimeout(function() {
						$(wwSpan).children("#ww_login_iframe").remove();
					}, 15000);
				}
			} catch(e) {
				// this element span does not have valid JSON data
				return(true);
			}
		});

		function requestUserPermission(itemIframe) {
			var messageDiv = document.createElement('div');
			messageDiv.style.cssText = 'display: block; width: 640px; height: 360px; margin: 15px; background: #111; color: #fff; font-family: helvetica; line-height: 22px;';

			var messageDivContent = document.createElement('div');
			messageDivContent.style.cssText = 'text-align: center; margin: 25px auto 0 auto;';

			var messageParagraph = document.createElement('p');
			var imageParagraph = document.createElement('p');
			var messageImage = document.createElement('img');
			var messageButton = document.createElement('div');

			messageImage.style.cssText = 'width: 125px; margin-bottom: 30px;';
			messageImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAwAAAAC0CAMAAAAU7LtCAAADAFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8HPQsIAAAA/3RSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/QEFCQ0RFRkdISUpLTE1O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';
			imageParagraph.appendChild(messageImage);

			messageButton.style.cssText = 'margin-top: 30px; padding: 15px; border: solid 1px #fff; display: inline-block;';
			messageButton.innerText = 'Show Embedded Content';
			messageParagraph.innerText = 'This embedded content is in an iframe. Based on the current Sakai security settings, you must click the button below to view content.	';

			$(messageButton).hover(function() {
				$(this).css({
					'cursor': 'pointer',
					'background': '#333'
				});
			});

			messageButton.addEventListener('click', function() {
				$(itemIframe).attr('src', $(itemIframe).attr('data-src'));
				$(itemIframe).css({
					'display': 'block'
				});
				$(messageDiv).css({
					'display': 'none'
				});
			});

			// attach all of the elements
			messageDivContent.appendChild(imageParagraph);
			messageDivContent.appendChild(messageParagraph);
			messageDivContent.appendChild(messageButton);

			messageDiv.appendChild(messageDivContent);

			return(messageDiv);
		}

		// handle legacy login case (eventually should be deleted)
		if(
			(!authCheck) && (wwToolExists) &&
			(typeof wwSakaiTool != 'undefined') &&
			(wwSakaiTool.length > 0) &&
			(wwSakaiTool.parent().attr('href'))
		) {
			$(doc).find('iframe').each(function(index, wwIframe) {
				// the src property must be defined
				if(
					(!$(wwIframe).attr('src')) ||
					($(wwIframe).attr('src').trim().toLowerCase().indexOf('warpwire') < 0)
				) {
					return(true);
				}

				var iframeAuth = $('<iframe />');
				// add a unique id for the iframe
				iframeAuth.attr('id', 'ww_login_iframe');
				iframeAuth.attr('height', '1px');
				iframeAuth.attr('width', '1px');
				iframeAuth.attr('style', 'left: -9999px; position: absolute; border: none;');
				iframeAuth.attr('src', wwSakaiTool.parent().attr('href'));
				setTimeout(function() {
					$(wwIframe).append(iframeAuth);
				}, 1000);
				authCheck = true;
				// remove login iframe after enough time has passed to login
				var removeLoginIframe = setTimeout(function() {
					$(wwIframe).children("#ww_login_iframe").remove();
				}, 15000);

				return(false);
			});
		}

		return(true);
	};

	$(document).ready(function() {
		getIframes(this);
	});
})($PBJQ || jQuery || $);
