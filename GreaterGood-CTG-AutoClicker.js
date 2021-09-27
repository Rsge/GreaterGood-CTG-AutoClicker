// ==UserScript==
// @name         GreaterGood CTG AutoClicker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically clicks through all the buttons on all subsites of the GreaterGood ClickToGive program.
// @author       Rsge
// @include      https://greatergood.com/clicktogive/*
// @include      https://*.greatergood.com/clicktogive/*
// @icon         https://www.google.com/s2/favicons?domain=greatergood.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const sites = [" Hunger", " Breast Cancer", " Animals", " Veterans", " Autism", " Alzheimer's",
        " Diabetes", " Literacy", " Rainforest", " GreaterGood"]

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
})();
