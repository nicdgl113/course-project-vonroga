"use strict";

/**
 * @file        default_pricing.js
 * @author      Ryan Paranich   <rparanich@northislandcollege.ca>
 * @description This file holds all default values for the standard pricing of our quote tool.
 *
 * NIC DGL113 W21 Course Project.
 * 
 * File last edited: March 25, 2021
 */

/**
 * @class       Price
 * @constructor
 *      @param  {String}    code        Maximum 2 character code intended to represent the unique ID of this price.
 *      @param  {String}    size        Preferably 1 word, 2 word max, describing this price object.
 *      @param  {String}    height      The height of this particular pane.
 *      @param  {String}    description Short description that describes the type of window pane this pricing would apply to.
 *      @param  {Number}    value       The float value that represents the price of one individual pane of this type.
 */
class Price {
  constructor(code, height, size, description, value) {
    this.code = code.toLowerCase().trim().substring(0, 2);
    this.height = height;
    this.size = size;
    this.description = description;
    this.value = Number.parseFloat(value);
    this.screens = Number.parseFloat(value * 0.75).toFixed(2);
  }
}

const defaultValues = [
  // Special Level
  new Price("sk", "Special", "Skylight", "Glass pane skylight cleaning.", 18.0),
  new Price("sf", "Special", "French", "Cleaning of french panes.", 1.0),
  new Price("su", "Special", "Setup", "Standard service setup.", 22.5),
  // High Level
  new Price(
    "hs",
    "High",
    "Small",
    "Small pane, high level, water fed pole cleaning.",
    5.0
  ),
  new Price(
    "hm",
    "High",
    "Medium",
    "Medium pane, high level, water fed pole cleaning.",
    6.0
  ),
  new Price(
    "hl",
    "High",
    "Large",
    "Large pane, high level, water fed pole cleaning.",
    7.0
  ),
  // Medium Level
  new Price(
    "ms",
    "Mid",
    "Small",
    "Small pane, medium level, water fed pole cleaning.",
    4.0
  ),
  new Price(
    "mm",
    "Mid",
    "Medium",
    "Medium pane, medium level, water fed pole cleaning.",
    5.0
  ),
  new Price(
    "ml",
    "Mid",
    "Large",
    "Large pane, medium level, water fed pole cleaning.",
    6.0
  ),
  // Ground Level
  new Price(
    "gs",
    "Ground",
    "Small",
    "Small pane, ground level, traditional cleaning.",
    3.0
  ),
  new Price(
    "gm",
    "Ground",
    "Medium",
    "Medium pane, ground level, traditional cleaning.",
    4.0
  ),
  new Price(
    "gl",
    "Ground",
    "Large",
    "Large pane, ground level, traditional cleaning.",
    5.5
  ),
];
