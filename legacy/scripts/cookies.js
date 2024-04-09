"use strict";

/**
 * @file        cookies.js
 * @author      Ryan Paranich   <rparanich@northislandcollege.ca>
 * @description This file holds generic cookie getter/setter methods for setting, updating, and retrieving cookies.
 *
 * NIC DGL113 W21 Course Project.
 * File last edited: March 25, 2021
 */

/**
 * Creates new cookie, or updates existing cookie if using an existing cookie name, and sets the duration (in days)
 * after which the cookie will expire, and will also set as secure if secure paremter set to true.
 * @param {String} cookieName
 * @param {String} cookieValue
 * @param {Number} existenceDuration (in days)
 * @param {Boolean} secure
 * @returns Returns the string that was used to set the cookie (escaped).
 */
function setCookie(cookieName, cookieValue, existenceDuration, secure) {
  let expires, cookieString;
  if (existenceDuration) {
    let date = new Date();
    // Setting the expiry. Duration entered as number of days.
    expires = date.setTime(
      date.getTime() + existenceDuration * 24 * 60 * 60 * 1000
    );
  } else expires = "";

  cookieName = escape(cookieName.trim());
  cookieValue = escape(cookieValue.trim());

  cookieString = `${cookieName}=${cookieValue}`;

  if (expires) cookieString += ";expires=" + expires;
  if (secure) cookieString += ";secure";

  document.cookie = cookieString;

  return cookieString;
}

/**
 * If document cookies contain a cookie with the provided cookie name parameter, returns the unescaped value of the
 * cookie we're looking for. If no cookie is found in document cookies, returns null.
 * @param {String} cookieName
 * @returns Unescaped string value of the name/value pair found. If no cookie is found matching the parameter,
 * returns null.
 */
function getCookie(cookieName) {
  let namePlusEqualSign = `${cookieName}=`;
  let allCookies = document.cookie.split(";");
  for (let cookie of allCookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(namePlusEqualSign) == 0) {
      // Returns only the value of this cookie as an unescaped string.
      return unescape(
        cookie.substring(namePlusEqualSign.length, cookie.length)
      );
    }
  }
  // If we don't find the cookie, execution reaches this line and returns null.
  return null;
}

/**
 * Searches to see if the cookie exists, if it doesn't, returns false and warns console. If found, deletes the
 * cookie and verifies deletion. If verification of deletion fails, returns false and errors console. If
 * verification succeeds, returns true and infos console.
 * @param {String} cookieName
 * @returns Returns true if cookie was successfully found, deleted, and deletion is verified. False if no
 * cookie existed, or if deletion verification failed.
 */
function deleteCookie(cookieName) {
  cookieName = cookieName.trim();
  if (doesCookieExist) {
    document.cookie = `${escape(cookieName)}=x;max-age=0`;
    if (getCookie(cookieName) === null) {
      console.info(`The cookie "${cookieName}" was successfully deleted.`);
      return true;
    } else {
      console.error(
        `An error occured and cookie "${cookieName}" was not successfully deleted form cookies.`
      );
      return false;
    }
  } else {
    console.warn(`No cookie by the name "${cookieName}" exists.`);
    return false;
  }
}

/**
 * Searches for, and returns verification of, the existence of a given cookie, determined by name search. Uses
 * getCookieValue, which returns null if no cookie exists, or returns the unescaped string value of the
 * cookie if it does, in fact, exist.
 * @param {String} cookieName
 * @returns Returns true if cookie exists. Returns false if no cookie exists.
 */
function doesCookieExist(cookieName) {
  cookieName = cookieName.trim();
  if (getCookie(escape(cookieName)) !== null) return true;
  else return false;
}
