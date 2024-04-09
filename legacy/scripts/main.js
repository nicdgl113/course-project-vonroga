"use strict";

/**
 * @file main.js
 * @author Ryan Paranich <rparanich@northislandcollege.ca>
 * Last Edit: 04/07/2021
 * 
 * This file contains JavaScript code that is intended to be applied throughout the website. Currently,
 * this code only includes handling the brand-title click event. */

document
  .querySelector(".brand-title")
  .addEventListener("click", () => (window.location.href = "index.html"));
