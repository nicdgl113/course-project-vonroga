"use strict";

/**
 * @file pricing.js
 * @author  Ryan Paranich   <rparanich@northislandcollege.ca>
 * Last edit: 04/07/2021
 *
 * NIC DGL113 W21
 *
 * Handles the pricing page features and functions. Using cookie storage to store adjusted
 * pricing, while using @see default_pricing.js as a default price list. Also handles all
 * button click events on this page for saving price sheet, or starting a quote using this
 * price sheet.
 */

/**
 * Making sure we have fully loaded the page before constructing our pricing table.
 */
window.addEventListener("load", () => {
  constructPricing();
});

/**
 * Constructs all of the pricing you see on the pricing page, including the name plates for each input box,
 * as well as the values within the pricing page. This construction also includes the event listeners for
 * each input box.
 */
function constructPricing() {
  var inputPrices = $("input.price");
  var startQuote = document.getElementById("save-and-build");
  var savePricing = document.getElementById("save-and-return");
  var resetPricing = document.getElementById("set-to-defaults");

  /* "Tooltips" are helpful descriptions shown when tapping (mobile) or hovering over (desktop) a given nameplate */
  populateTooltips();

  /* Fill in values into the input boxes. If we have cookie values saved, use those. Else, use default values. */
  for (let i = 0; i < inputPrices.length; i++) {
    /* Looks for cookies. If we have cookies, use these values. Otherwise, use default values. */
    inputPrices[i].value = doesCookieExist(`paneType${i}`)
      ? getCookie(`paneType${i}`)
      : defaultValues[i].value.toFixed(2);
    /* "Blur" refers to when you focus and then move away from an item. Commit changes on blur. */
    inputPrices[i].addEventListener("blur", () => {
      inputPrices[i].value = Number.parseFloat(inputPrices[i].value).toFixed(2);
    });
    /* Hitting the "return" key will trigger this event listener and blur selected field, committing changes. */
    inputPrices[i].addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        e.target.blur();
      }
    });
  }

  /* Event listener to reset pricing to default pricing */
  resetPricing.addEventListener("click", () => {
    for (let i = 0; i < inputPrices.length; i++){
      inputPrices[i].value = defaultValues[i].value.toFixed(2);
    }
  });

  /* Event listener to use this price list to start a new quote. */
  startQuote.addEventListener("click", () => {
    for (let i = 0; i < inputPrices.length; i++) {
      setCookie(`paneType${i}`, inputPrices[i].value, 1);
    }
    window.location.href = "new-quote.html";
  });

  /* Event listener to save this price list to cookies and return home. */
  savePricing.addEventListener("click", () => {
    for (let i = 0; i < inputPrices.length; i++) {
      setCookie(`paneType${i}`, inputPrices[i].value, 1);
    }
    window.location.href = "index.html";
  });

  
}

/**
 * Loops through our array of name plates (the text centered above each price input box) and attach the
 * respective tooltip to be displayed upon hovering over a name plate. Tap instead of hover, on mobile.
 */
function populateTooltips() {
  var namePlates = $("div.tooltip");
  for (let i = 0; i < namePlates.length; i++) {
    // adds the name
    namePlates[i].innerHTML = defaultValues[i].size;
    // adds the tooltip text
    let toolTipText = document.createElement("span");
    toolTipText.className = "tooltiptext";
    let toolTipTextNode = document.createTextNode(defaultValues[i].description);
    toolTipText.appendChild(toolTipTextNode);
    namePlates[i].appendChild(toolTipText);
  }
}
