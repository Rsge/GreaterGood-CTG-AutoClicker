// ==UserScript==
// @name         GreaterGood CTG AutoClicker

// @description  Automatically clicks through all the buttons on all subsites of the GreaterGood ClickToGive program every three hours.
// @description:de Klickt sich automatisch alle 3 Std. durch alle Buttons auf allen Seiten des GreaterGood-ClickToGive-Programms.

// @version      1.0
// @author       Rsge
// @copyright    2021+, Jan G. (Rsge)
// @license      Mozilla Public License 2.0
// @icon         https://http-aws.greatergood.com/img/ggc/favicon-96x96.png

// @namespace    https://github.com/Rsge/GreaterGood-CTG-AutoClicker
// @homepageURL  https://github.com/Rsge/GreaterGood-CTG-AutoClicker
// @supportURL   https://github.com/Rsge/GreaterGood-CTG-AutoClicker/issues


// @include      https://greatergood.com/clicktogive/*
// @include      https://*.greatergood.com/clicktogive/*

// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const sites = [" Hunger", " Breast Cancer", " Animals", " Veterans", " Autism", " Alzheimer's",
        " Diabetes", " Literacy", " Rainforest", " GreaterGood"]

    // On button site, click button
    var i;
    var buttons = document.getElementsByTagName("BUTTON");
    for (i = 0; i < buttons.length; i++) {
        var buttonHTML = buttons[i].innerHTML;
        //console.log(buttonHTML);
        if (buttonHTML == "Click to Give - it's FREE!") {
            buttons[i].click();
            return;
        }
    }

    // On thanks site, choose new site if not all are already clicked
    var divs = document.getElementsByTagName("DIV");
    for (i = 0; i < divs.length; i++) {
        var divClass = divs[i].className;
        //console.log(divClass);
        if (divClass.includes("-site col-xs-3 col-sm-4 button-to-count") &&
            !divClass.includes("click-more-clickAttempted") &&
            sites.includes(divs[i].innerText)) {
            var link = divs[i].firstElementChild.href;
            //console.log(link);
            window.open(link, "_top");
            return;
        }
    }

    // Wait for 3 h, then reload page to click through again
    setTimeout(function(){location.reload(true);}, 10800000);
})();
