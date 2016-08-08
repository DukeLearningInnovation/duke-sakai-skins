# sakai-11-skins
To test the updated skins, follow these instructions

1. Login to https://dukedev.longsight.com
2. Visit any page that you wish to test the skin on
3. Right click somewhere on the page and choose Inspect or Inspect Element
4. Scroll to the top of the HTML pane and open the `<head>` element
5. Find this line and double click inside the `href` attribute
`<link href="/library/skin/duke-*skinname*/tool.css?version=" rel="stylesheet" media="screen, tty, tv, handheld, projection">`

**\*skinname\*** will be one of these options, **do not** change this

* default
* crtp
* divinity
* law
* nursing
* samsi

6. Before `/library` add the following text
`https://duke-cit.github.io/sakai-11-skins/prod` and hit Enter

The line should now read `https://github.com/Duke-CIT/sakai-11-skins/tree/master/prod/library/skin/duke-*skinname*/tool.css`

The page should change slightly depending on what you are viewing.

##This change is not permanament##

Moving to another page will require you to repeat these steps.

The logo won't show up, that is the expected behavior.