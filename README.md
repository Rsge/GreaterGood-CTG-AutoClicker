# GreaterGood ClickToGive Autoclicker
This is an auto-clicker script for the [*GreaterGood* *ClickToGive* program](https://greatergood.com).
It automatically clicks through all the buttons on all subsites of the *GreaterGood* family.\
It also automatically **logs you in**. If you don’t have an account, you can **disable this by setting** `DO_LOGIN` **to** `false`.

The script can work in the background of a pinned tab, but **the tab has to sometimes be reloaded after restarting the browser**.

It starts at the top left and works through the complete list to the bottom right, leaving out the external links besides the main *GreaterGood* sites.

The `click()` method is used on the buttons after the page loads plus a random delay, so they should be correctly counted as clicked, if they don't do an `isTrusted` check somewhere.

Don't forget to **disable your ad blocker** for the site, so ads can get loaded and as such revenue be made.
