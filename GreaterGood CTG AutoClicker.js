// ==UserScript==
// @name           GreaterGood CTG AutoClicker
// @name:de        GreaterGood CTG Auto-Klicker

// @description    Automatically clicks through all the buttons on all subsites of the GreaterGood ClickToGive program every two hours.
// @description:de Klickt sich automatisch alle zwei Std. durch alle Buttons auf allen Seiten des GreaterGood-ClickToGive-Programms.

// @version        3.2.0
// @copyright      2023+, Jan G. (Rsge)
// @license        Mozilla Public License 2.0
// @icon           https://http-aws.greatergood.com/img/ggc/favicon-96x96.png

// @namespace      https://github.com/Rsge
// @homepageURL    https://github.com/Rsge/GreaterGood-CTG-AutoClicker
// @supportURL     https://github.com/Rsge/GreaterGood-CTG-AutoClicker/issues
// @downloadURL    https://update.greasyfork.org/scripts/433055/GreaterGood%20CTG%20AutoClicker.user.js
// @updateURL      https://update.greasyfork.org/scripts/433055/GreaterGood%20CTG%20AutoClicker.meta.js

// @match          https://greatergood.com/*
// @match          https://theanimalrescuesite.com/*

// @run-at         document-idle
// @grant          none
// ==/UserScript==

(async function () {
  'use strict';

  // (Try to) log in before clicking to collect points.
  // Requires (automatic or copypasted) filling of login data.
  const DO_LOGIN = true;
  // Max amount of seconds to wait before clicking button
  const MAX_RANDOM_TO_CLICK_SECONDS = 3;
  // Amount of seconds to wait for site to load after click
  const WAIT_SECONDS = 2;
  // Max amount of tries to wait for buttons to load before giving up
  const MAX_TRIES = 5;
  // Minutes between possible click-throughs
  const INTERVAL_MINUTES = 120;
  // Warning for buttons not found
  const BUTTONS_NOT_FOUND_WARNING = "Buttons could not be found after " + (MAX_TRIES * WAIT_SECONDS) + " s.";

  // Basic functions
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  function sToMs(s) {
    return s * 1000;
  }

  // Checks for input password. Clicks if there is one, otherwise waits for input to click.
  function checkPwdLogin(pwdInput, button, inputLength=0) {
    if (pwdInput?.value.length > 0) {
      //console.log(button);
      button.click();
    } else {
      pwdInput.addEventListener("input", function() {
        if(pwdInput?.value.length >= inputLength) {
          button.click();
        }
      });
    }
  }

  // Vars
  let i;
  let progButtonsLeft;
  if (DO_LOGIN) {
    let url = new URL(window.location.href);
    if (url.pathname == "/account/login") {
      // Login site
      // Log in.
      let buttons = document.getElementsByTagName("BUTTON");
      let loginButton = buttons[buttons.length-1];
      //let emailInput = document.getElementById("CustomerEmail");
      let pwdInput = document.getElementById("CustomerPassword");
      await sleep(sToMs(WAIT_SECONDS));
      checkPwdLogin(pwdInput, loginButton);
      return;
    } else if (url.pathname == "/account") {
      // Account site
      // Go back to CTG site.
      document.getElementsByClassName("header__heading-logo-wrapper")[0].click();
      return;
    } else {
      // Main CTG site
      // Open login page if not already logged in.
      let loginButtons = document.getElementsByClassName("header__icon--account link focus-inset");
      if (loginButtons.length > 0 && loginButtons[0].href.endsWith("login")) {
        loginButtons[0].click();
        return;
      }
    }
  }
  do {
    // When a CTG-button is present, click it.
    let ctgButton = document.getElementById("ctg-click-box-button");
    if (ctgButton !== null) {
      let millisecondsToClick = sToMs(WAIT_SECONDS + Math.floor(Math.random() * MAX_RANDOM_TO_CLICK_SECONDS));
      await sleep(millisecondsToClick);
      ctgButton.click();
    }
    // Wait for alternate sites' buttons to load.
    i = 0;
    let progButtons = [];
    do {
      await sleep(sToMs(WAIT_SECONDS))
      progButtons = document.getElementsByClassName("ctg-click-grid-button");
      i += 1
      if (i > MAX_TRIES) {
        console.warn(BUTTONS_NOT_FOUND_WARNING);
        return;
      }
    } while (progButtons.length == 0);
    // Choose next site if not all are already clicked.
    progButtonsLeft = true;
    let foundButton = false;
    for (i = 0; i < progButtons.length; i++) {
      let progButtonClass = progButtons[i].className;
      //console.log(progButtonClass);
      let progButtonValue = progButtons[i].attributes[0].value;
      //console.log(progButtonValue);
      if (!progButtonClass.includes("click-attempted") // Button clicked already
          && !progButtonValue.startsWith("http")) { // Is external site
        foundButton = true;
        progButtons[i].click();
        break;
      }
    }
    if (!foundButton) {
      progButtonsLeft = false;
    }
  } while (progButtonsLeft);

  // Wait for specified time, then reload page to click through again.
  let intervalMilliseconds = sToMs((INTERVAL_MINUTES + 1) * 60);
  setTimeout(function(){location.reload(true);}, intervalMilliseconds);
})();
