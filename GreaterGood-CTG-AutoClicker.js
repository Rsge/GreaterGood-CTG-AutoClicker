// ==UserScript==
// @name           GreaterGood CTG AutoClicker

// @description    Automatically clicks through all the buttons on all subsites of the GreaterGood ClickToGive program every two hours.
// @description:de Klickt sich automatisch alle zwei Std. durch alle Buttons auf allen Seiten des GreaterGood-ClickToGive-Programms.

// @version        1.4.2
// @author         Rsge
// @copyright      2021+, Jan G. (Rsge)
// @license        Mozilla Public License 2.0
// @icon           https://http-aws.greatergood.com/img/ggc/favicon-96x96.png

// @namespace      https://github.com/Rsge
// @homepageURL    https://github.com/Rsge/GreaterGood-CTG-AutoClicker
// @supportURL     https://github.com/Rsge/GreaterGood-CTG-AutoClicker/issues

// @match          https://greatergood.com/clicktogive/*
// @match          https://greatergood.com/clickToGive/*
// @match          https://*.greatergood.com/clicktogive/*
// @match          https://*.greatergood.com/clickToGive/*

// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Max amount of seconds to wait before clicking button
    const MAX_RANDOM_TO_CLICK_SECONDS = 3;
    // Minutes between possible click-throughs
    // Set to at least 1 min more than minimum time because of random button click delay
    const INTERVAL_MINUTES = 121;


    // Click-To-Give site options
    const SITES = [" Hunger", " Breast Cancer", " Animals", " Veterans", " Autism", " Alzheimer's",
        " Diabetes", " Literacy", " Rainforest", " GreaterGood"];


    // On button site, click button
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

    // On thanks site, choose new site if not all are already clicked
    var divs = document.getElementsByTagName("DIV");
    for (i = 0; i < divs.length; i++) {
        var divClass = divs[i].className;
        //console.log(divClass);
        if (divClass.includes("-site col-xs-4 button-to-count") &&
            !divClass.includes("click-more-clickAttempted") &&
            SITES.includes(divs[i].innerText)) {
            var link = divs[i].firstElementChild.href;
            //console.log(link);
            window.open(link, "_top");
            return;
        }
    }

    // Wait for 2 h, then reload page to click through again
    var intervalMilliseconds = INTERVAL_MINUTES * 60 * 1000;
    setTimeout(function(){location.reload(true);}, intervalMilliseconds);
})();
