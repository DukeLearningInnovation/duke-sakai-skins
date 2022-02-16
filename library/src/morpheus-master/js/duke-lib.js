///////////////////////////////////////
// GOOGLE ANALYTICS EVENT TRACKING
///////////////////////////////////////

// click event to show directurl
$PBJQ(".Mrphs-toolTitleNav__link--directurl").on("click", function (e) {
  var label = $PBJQ(this).siblings(".Mrphs-toolTitleNav__link--help-popup")[0]
    .search;

  var gaEventData = {
    hitType: "event",
    eventCategory: "toolTitleNav",
    eventAction: "showDirectLink",
    eventLabel: document.title + " : " + label.substring(6, label.length),
  };
  if (typeof ga === "function") {
    ga("send", gaEventData);
  }
});

// click event to show help
$PBJQ(".Mrphs-toolTitleNav__link--help-popup").on("click", function (e) {
  var label = $PBJQ(this)[0].search;

  var gaEventData = {
    hitType: "event",
    eventCategory: "toolTitleNav",
    eventAction: "goToHelp",
    eventLabel: document.title + " : " + label.substring(6, label.length),
  };
  if (typeof ga === "function") {
    ga("send", gaEventData);
  }
});

// click event to lessons print view
$PBJQ("#print-view").on("click", function (e) {
  var label = $PBJQ(this)[0].search;

  var gaEventData = {
    hitType: "event",
    eventCategory: "toolTitleNav",
    eventAction: "lessionsPrintView",
    eventLabel: document.title + " : " + label.substring(6, label.length),
  };
  if (typeof ga === "function") {
    ga("send", gaEventData);
  }
});

// click event to lessons print all
$PBJQ("#print-all").on("click", function (e) {
  var label = $PBJQ(this)[0].search;

  var gaEventData = {
    hitType: "event",
    eventCategory: "toolTitleNav",
    eventAction: "lessionsPrintAll",
    eventLabel: document.title + " : " + label.substring(6, label.length),
  };
  if (typeof ga === "function") {
    ga("send", gaEventData);
  }
});

// click event to lessons Index of Pages
$PBJQ("#show-pages").on("click", function (e) {
  var label = $PBJQ(this)[0].search;

  var gaEventData = {
    hitType: "event",
    eventCategory: "toolTitleNav",
    eventAction: "lessionsIndexOfPages",
    eventLabel: document.title + " : " + label.substring(6, label.length),
  };
  if (typeof ga === "function") {
    ga("send", gaEventData);
  }
});

// click event to show tool dropdown in favorite sites
$PBJQ(".Mrphs-sitesNav__dropdown").on("click", function (e) {
  var label = $PBJQ(this).siblings("a.link-container")[0].title;

  var gaEventData = {
    hitType: "event",
    eventCategory: "sitesNav",
    eventAction: "openToolDropdown",
    eventLabel: document.title + " : " + label,
  };
  if (typeof ga === "function") {
    ga("send", gaEventData);
  }
});

// click event to refresh a tool
$PBJQ(".Mrphs-hierarchy--toolName").on("click", function (e) {
  var gaEventData = {
    hitType: "event",
    eventCategory: "hierarchy",
    eventAction: "refreshTool",
    eventLabel: document.title,
  };
  if (typeof ga === "function") {
    ga("send", gaEventData);
  }
});

// click event to open sites waffle
$PBJQ(".view-all-sites-btn").on("click", function (e) {
  var gaEventData = {
    hitType: "event",
    eventCategory: "topHeader",
    eventAction: "openAllSitesDropdown",
    eventLabel: document.title,
  };
  if (typeof ga === "function") {
    ga("send", gaEventData);
  }
});

// click event to collapse left sidebar
$PBJQ("#toolsNav-toggle-li").on("click", function (e) {
  var toggleState = "undefined";

  if ($PBJQ(this).hasClass("min")) {
    toggleState = "collapseTools";
  } else if ($PBJQ(this).hasClass("max")) {
    toggleState = "maximizeTools";
  }

  var gaEventData = {
    hitType: "event",
    eventCategory: "toolMenu",
    eventAction: toggleState,
    eventLabel: document.title,
  };
  if (typeof ga === "function") {
    ga("send", gaEventData);
  }
});

// click event to show lessons print view
$PBJQ("#print-view").on("click", function (e) {
  var gaEventData = {
    hitType: "event",
    eventCategory: "toolTitleNav",
    eventAction: "showLessonsPrintView",
    eventLabel: document.title,
  };
  if (typeof ga === "function") {
    ga("send", gaEventData);
  }
});
// click event to show lessons view all pages
$PBJQ("#show-pages").on("click", function (e) {
  var gaEventData = {
    hitType: "event",
    eventCategory: "toolTitleNav",
    eventAction: "showLessonsPages",
    eventLabel: document.title,
  };
  if (typeof ga === "function") {
    ga("send", gaEventData);
  }
});

const dukeAddBodyClasses = function () {
  let bodyClasses = [];
  /////////////////////////////////////////////////
  // Add server domain to body as class
  ////////////////////////////////////////////////
  let serverClass = new URL(window.location.href).hostname.replace(/\./g, "-");
  bodyClasses.push(`duke-${serverClass}`);

  /////////////////////////////////////////////////
  // Add role to body as class
  ////////////////////////////////////////////////
  if (portal.user && portal.user.siteRole) {
    let userSiteRole = `duke-role-${portal.user.siteRole
      .toLowerCase()
      .replace(/\s/g, "")}`;
    bodyClasses.push(userSiteRole);
  }

  document.getElementsByTagName("body")[0].classList.add(...bodyClasses);
};
dukeAddBodyClasses();

/////////////////////////////////////////////////
// Make all MOTD cards the same height
////////////////////////////////////////////////
if (document.title === "Sakai : Home : Overview") {
  const setMOTDHeights = window.setTimeout(function () {
    let toolBodyMOTD = document
      .getElementsByClassName("Mrphs-toolBody--sakai-motd")[0]
      .getElementsByTagName("iframe")[0].contentWindow;

    let motdCards = toolBodyMOTD.document.getElementsByClassName("textPanel");

    let motdArr = [].slice.call(motdCards);
    let tallestMOTD = Math.max.apply(
      Math,
      motdArr.map(function (card) {
        return card.clientHeight;
      })
    );

    for (let i = 0; i < motdArr.length; i++) {
      motdCards[i].style.height = `${tallestMOTD}px`;
    }
  }, 1000);
}

///////////////////////////////////////////////////
// #157 Inject skin modified date into footer
///////////////////////////////////////////////////
if (
  document.getElementById("Mrphs-footer--details__info") !== "null" &&
  portal.portalCDNQuery
) {
  let buildTimeStamp = DUKESKINTIMESTAMP;
  let buildTimeHtml = `<dt>Skin | CDN:</dt><dd>${buildTimeStamp} | ${portal.portalCDNQuery.substr(
    9
  )}</dd>`;
  document
    .getElementById("serverTime")
    .insertAdjacentHTML("afterend", buildTimeHtml);
}

///////////////////////////////////////////////////
// #222 Make logo take you to the home page
///////////////////////////////////////////////////
if (document.querySelector(".Mrphs-headerLogo--institution")) {
  let logoContainer = document.querySelector(".Mrphs-headerLogo--institution");
  let homeLinkContainer = document.querySelector(
    ".Mrphs-sitesNav__menuitem--myworkspace .link-container"
  );
  logoContainer.style.cursor = "pointer";
  logoContainer.addEventListener("click", function (evt) {
    var gaEventData = {
      hitType: "event",
      eventCategory: "topHeader",
      eventAction: "clickLogo",
      eventLabel: document.title,
    };
    if (typeof ga === "function") {
      ga("send", gaEventData);
    }

    homeLinkContainer.click();
  });
}
