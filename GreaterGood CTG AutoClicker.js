// ==UserScript==
// @name           GreaterGood CTG AutoClicker
// @name:de        GreaterGood CTG Auto-Klicker

// @description    Automatically clicks through all the buttons on all subsites of the GreaterGood ClickToGive program every two hours.
// @description:de Klickt sich automatisch alle zwei Std. durch alle Buttons auf allen Seiten des GreaterGood-ClickToGive-Programms.

// @version        2.0.3
// @copyright      2023+, Jan G. (Rsge)
// @license        Mozilla Public License 2.0
// @icon           https://http-aws.greatergood.com/img/ggc/favicon-96x96.png

// @namespace      https://github.com/Rsge
// @homepageURL    https://github.com/Rsge/GreaterGood-CTG-AutoClicker
// @supportURL     https://github.com/Rsge/GreaterGood-CTG-AutoClicker/issues
// @updateURL      https://greasyfork.org/scripts/433055-greatergood-ctg-autoclicker/code/GreaterGood%20CTG%20AutoClicker.user.js
// @downloadURL    https://greasyfork.org/scripts/433055-greatergood-ctg-autoclicker/code/GreaterGood%20CTG%20AutoClicker.user.js

// @match          https://greatergood.com/clicktogive/*
// @match          https://greatergood.com/clickToGive/*
// @match          https://*.greatergood.com/clicktogive/*
// @match          https://*.greatergood.com/clickToGive/*

// @run-at         document-idle
// @grant          none
// ==/UserScript==

(function () {
  'use strict';

  // Max amount of seconds to wait before clicking button
  const MAX_RANDOM_TO_CLICK_SECONDS = 3;
  // Minutes between possible click-throughs
  const INTERVAL_MINUTES = 120;


  // On button site, click button.
  var i;
  var buttons = document.getElementsByTagName("BUTTON");
  var buttonFound = false;
  for (i = 0; i < buttons.length; i++) {
    var buttonHTML = buttons[i].innerHTML;
    //console.log(buttonHTML);
    if (buttonHTML == "Click to Give - it's FREE!") {
      buttonFound = true;
      break;
    }
  }
  if (buttonFound) {
    var millisecondsToClick = (Math.floor(Math.random() * MAX_RANDOM_TO_CLICK_SECONDS) + 1) * 1000;
    setTimeout(function(){buttons[i].click()}, millisecondsToClick);
    return;
  }

  // On thanks site, choose new site if not all are already clicked.
  var links = document.getElementsByTagName("A");
  for (i = 0; i < links.length; i++) {
    var linkClass = links[i].className;
    //console.log(linkClass);
    var linkValue = links[i].attributes[0].value;
    //console.log(linkValue);
    if (linkClass.includes("-site col-4 button-to-count")
        && !linkClass.includes("click-more-clickAttempted")
        && linkValue.startsWith("/clicktogive/")) {
      var link = links[i].href;
      //console.log(link);
      window.open(link, "_top");
      return;
    }
  }

  // Wait for specified time, then reload page to click through again.
  var intervalMilliseconds = (INTERVAL_MINUTES + 1) * 60 * 1000;
  setTimeout(function(){location.reload(true);}, intervalMilliseconds);
})();
