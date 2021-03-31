"use strict";

/**
 * @file  count.js
 * @author  Ryan Paranich <rparanich@northislandcollege.ca>
 *
 * NIC DGL113 W21
 *
 * This file build the general structure and functionality into our "build quote" or "count" page. This
 * page is responsible for allowing the user to use their preset default or custom price list to count
 * up panes of various height and size. It creates a live list for the user to view as they count panes
 * and size up the job. The user can also delete line items from the count if they've made a mistake or
 * wish to change the type of pane counted.
 */

const $btnBoard = $("div#buttonBoard");
const $lineItems = $("tbody");
const $tableFoot = $("tfoot");

const deleteIcon = "<i class='far fa-trash'</i>";
var lastButtonClicked;
var currentLineItem;

class Board {
  renderSquare = function (i) {
    let square = new Square(i);
    return square.render();
  };

  render = function () {
    let content = "";
    content += `<div class="btn-board">
            <h2>Special</h2>
            <div class="button-container">
                ${this.renderSquare(0)}
                ${this.renderSquare(1)}
                ${this.renderSquare(2)}
            </div>
            <h2>High Level</h2>
            <div class="button-container">
                ${this.renderSquare(3)}
                ${this.renderSquare(4)}
                ${this.renderSquare(5)}
            </div>
            <h2>Mid Level</h2>
            <div class="button-container">
                ${this.renderSquare(6)}
                ${this.renderSquare(7)}
                ${this.renderSquare(8)}
            </div>
            <h2>Ground Level</h2>
            <div class="button-container">
                ${this.renderSquare(9)}
                ${this.renderSquare(10)}
                ${this.renderSquare(11)}
            </div>
        </div>
        `;
    return content;
  };
}

class Square {
  constructor(i) {
    this.i = i;
    this.cookieExists = doesCookieExist(`paneType${i}`);
    this.code = defaultValues[i].code;
    this.size = defaultValues[i].size;
    this.height = defaultValues[i].height;
    this.price = this.cookieExists
      ? getCookie(`paneType${i}`)
      : Number.parseFloat(defaultValues[i].value).toFixed(2);
  }

  render = function () {
    let content = "";

    content += `
        <button class="pane" data-i="${this.i}">
            ${this.size}
        </button>
        `;

    return content;
  };
}

class LineItem {
  constructor(i) {
    let ea = doesCookieExist(`paneType${i}`)
      ? getCookie(`paneType${i}`)
      : defaultValues[i].value;
    this.code = defaultValues[i].height;
    this.title = defaultValues[i].size;
    this.each = Number.parseFloat(ea).toFixed(2);
    this.count = 1;
  }

  getPrice = function () {
    let each = Number.parseFloat(this.each);
    let count = Number.parseFloat(this.count);
    return Number.parseFloat(each * count).toFixed(2);
  };

  render = function () {
    let content = "";
    content += `
        <tr>
            <td>${this.code}</td>
            <td>${this.title}</td>
            <td>$${this.each}</td>
            <td>${this.count}</td>
            <td>$${this.getPrice()}</td>
            <td
              class="delete"
              data-count="${this.count}"
              data-price="${this.getPrice()}">
                ${deleteIcon}
              </td>
        </tr>
        `;
    return content;
  };
}

/**
 * We need to ensure the page has loaded to run the following...
 */
window.addEventListener("load", () => {
  // Create & render button board.
  const BUTTON_BOARD = new Board();
  $btnBoard.append(BUTTON_BOARD.render());
  // Create and render table Head
  createTableHead($("thead"));
  // Set up click event listeners for button board buttons.
  $("button.pane").on("click", squareClick);
  // Set up click even listener for cancel & continue buttons (navigation).
  $("#menu-cancel").on("click", function () {
    window.location.href = "index.html";
  });
  // Update (or, more accurately, create) the table footer.
  updateTableFoot();
});

/**
 * Creates the table head row using a template. Broken out into a function for code readability.
 * @param {Element} ele The jQuery element where to append the template.
 */
function createTableHead(ele) {
  $(ele).append(`
  <tr>
      <th>Height</th>
      <th>Size</th>
      <th>Each</th>
      <th># of</th>
      <th>Price</th>
      <th>Del</th>
  </tr>`);
}

/**
 * A "square" refers to one of our buttons that corresponds to counting one of that particular type of
 * pane. We evaluate to see if this was the same button we clicked last. If it is, we increase the count,
 * otherwise, we increase the current count. In turn, we either create a new line item or update the
 * existing line item with the corresponding data. Lastly, we want to attach our event listener to the
 * delete button to handle deleting a given line item, and update our totals in the table footer.
 * @param {Event} e Our click event.
 */
function squareClick(e) {
  if (e.target === lastButtonClicked) {
    $("tr:eq(1)").remove();
    currentLineItem.count++;
    $lineItems.prepend(currentLineItem.render());
    lastButtonClicked = e.target;
  } else {
    currentLineItem = new LineItem(e.target.dataset.i);
    $lineItems.prepend(currentLineItem.render());
    lastButtonClicked = e.target;
  }
  // Set up delete icon click even listener.
  $("td.delete:eq(0)").on("click", (e) => deleteRow(e));
  // Update table footer with our new totals.
  updateTableFoot();
}

/**
 * When we add and delete line items from our list, we want to update the total panes counted and total price
 * of the service. These totals are displayed in our table footer. Calling this function rerenders thes
 * updated values.
 */
function updateTableFoot() {
  let count = 0;
  let totalPrice = 0;
  /* Our data is stored on our delete button in dataset attributes. */
  let data = document.querySelectorAll("td.delete");
  /* Looping through all existing line items, we can get the count and price for each to calculate totals. */
  for (let item of data) {
    count += Number.parseInt(item.dataset.count);
    totalPrice += Number.parseFloat(item.dataset.price);
  }
  /* Apply data to our table footer template */
  $tableFoot.html(`
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td>${count}</td>
    <td>$${totalPrice.toFixed(2)}</td>
    <td></td>
  </tr>`);
}

/**
 * When we click on the trach can for a given line item, we want to delete the row from our list
 * of line items, and recalculate our totals in the table footer.
 * @param {Event} e jQuery event object.
 */
function deleteRow(e) {
  /* To avoid bugs where deleting the top line item and then tapping the same pane type creates,
  we simply reset the last button clicked and current line item. */
  currentLineItem = "";
  lastButtonClicked = "";
  /* Play a fade effect on the current line item, then remove it from the list. Update totals.*/
  $(e.currentTarget)
    .parent()
    .hide(600, () => {
      $(e.currentTarget).parent().remove();
      updateTableFoot();
    });
}
