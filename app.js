// "use strict";

const availableSrvices = [
  {
    service: "Wash Car",
    price: 20,
  },
  {
    service: "Mow loan",
    price: 30,
  },
  {
    service: "Pull weeds",
    price: 50,
  },
];
/* declaring html elements */
const containerEl = document.querySelector(".container");
const totalEl = document.getElementById("total");
const itemsEl = document.getElementById("items");
const sendBtn = document.getElementById("send-invoice");
/* rendering the buttons */
const allBtns = availableSrvices
  .map(function (item) {
    return `<button class="btn" data-id="${item.service}">${item.service}: $${item.price}</button>`;
  })
  .join("");
containerEl.innerHTML = allBtns;
const btns = document.querySelectorAll(".btn");

let allChosenItems = [];
let chosenService = [];
btns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const selectedService = e.currentTarget.dataset.id;
    if (selectedService === "Wash Car") {
      allChosenItems.push(availableSrvices[0]);
    } else if (selectedService === "Mow loan") {
      allChosenItems.push(availableSrvices[1]);
    } else {
      allChosenItems.push(availableSrvices[2]);
    }
    chosenService.push(selectedService);
    renderHtml(allChosenItems);
  });
});

/* get html */
function renderHtml(data) {
  const htmlItems = data
    .map(function (item) {
      return `
  <div class="row">
    <h3>${item.service}</h3>
    <span class="remove">remove</span>
    <h3 id="total-el">$<span>${item.price}</span></h3>
  </div>`;
    })
    .join("");
  itemsEl.innerHTML = htmlItems;
  const removeBtns = Array.from(document.getElementsByClassName("remove"));
  sumOfInvoice(data);
  activateRemoveBtn(removeBtns, data);
}

/* claculating the sum of invoice */
function sumOfInvoice(data) {
  const totalAmount = data.reduce(function (sum, item) {
    return sum + item.price;
  }, 0);
  totalEl.textContent = `$${totalAmount}`;
}

/* rendering the list */
function activateRemoveBtn(btnsArr, data) {
  btnsArr.forEach((removeBtn) => {
    removeBtn.addEventListener("click", function (e) {
      const titleText = e.currentTarget.previousElementSibling.textContent;
      const indexNum = chosenService.indexOf(titleText);
      data.splice(indexNum, 1);
      chosenService.splice(indexNum, 1);
      sumOfInvoice(data);
      renderHtml(data);
    });
  });
}

/* send button functionality*/
sendBtn.addEventListener("click", function () {
  location.reload();
});
