// ==UserScript==
// @name           GreaterGood CTG AutoClicker
// @name:de        GreaterGood CTG Auto-Klicker

// @description    Automatically clicks through all the buttons on all subsites of the GreaterGood ClickToGive program every two hours.
// @description:de Klickt sich automatisch alle zwei Std. durch alle Buttons auf allen Seiten des GreaterGood-ClickToGive-Programms.

// @version        3.0.0
// @copyright      2023+, Jan G. (Rsge)
// @license        Mozilla Public License 2.0
// @icon           https://http-aws.greatergood.com/img/ggc/favicon-96x96.png

// @namespace      https://github.com/Rsge
// @homepageURL    https://github.com/Rsge/GreaterGood-CTG-AutoClicker
// @supportURL     https://github.com/Rsge/GreaterGood-CTG-AutoClicker/issues

// @match          https://greatergood.com/*
// @match          https://theanimalrescuesite.com/*

// @run-at         document-idle
// @grant          none
// ==/UserScript==

(async function () {
  'use strict';

  // Max amount of seconds to wait before clicking button
  const MAX_RANDOM_TO_CLICK_SECONDS = 4;
  // Amount of seconds to wait for site to load after click
  const WAIT_SECONDS = 3
  // Minutes between possible click-throughs
  const INTERVAL_MINUTES = 120;

  // Basic function
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Vars
  let i;
  let progButtonsLeft = true;
  do {
    // On button site, click button.
    let ctgButton = document.getElementById("ctg-click-box-button");
    if (ctgButton !== null) {
      let millisecondsToClick = (Math.floor(Math.random() * MAX_RANDOM_TO_CLICK_SECONDS) + 1) * 1000;
      await sleep(millisecondsToClick);
      ctgButton.click();
    }
    let progButtons = [];
    // Wait for buttons to load.
    do {
      await sleep(WAIT_SECONDS * 1000)
      progButtonsLeft = true;
      // On thanks site, choose new site if not all are already clicked.
      progButtons = document.getElementsByClassName("ctg-click-grid-button");
      let foundButton = false;
      for (i = 0; i < progButtons.length; i++) {
        let progButtonClass = progButtons[i].className;
        //console.log(progButtonClass);
        let progButtonValue = progButtons[i].attributes[0].value;
        //console.log(progButtonValue);
        if (!progButtonClass.includes("click-attempted") // Button clicked already
            && !progButtonValue.startsWith("http")) { // Is external site
          progButtons[i].click();
          foundButton = true;
          break;
        }
      }
      if (foundButton) {
        break;
      }
      progButtonsLeft = false;
    } while (progButtons.length == 0)
  } while (progButtonsLeft)

  // Wait for specified time, then reload page to click through again.
  let intervalMilliseconds = (INTERVAL_MINUTES + 1) * 60 * 1000;
  setTimeout(function(){location.reload(true);}, intervalMilliseconds);
})();
