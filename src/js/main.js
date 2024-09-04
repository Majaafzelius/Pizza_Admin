'use strict';

// const url = "http://localhost/Webb3-projekt/projekt_webservice_vt23-Majaafzelius/rest.php"
const url = "https://studenter.miun.se/~maaf2200/writeable/dt173g/Projekt/webbservice/rest.php";

window.onload = init;

function init() {
  getData();
}

const dishName =document.getElementById("name")
const dishContents =document.getElementById("content")
const dishPrice =document.getElementById("price")
const submit =document.getElementById("submit")

let form = document.getElementById("vis_form");

submit.addEventListener("click", createDish);

// Ta bort tags från input för säkerhetsskäl
function stripTags(html) {
  return html.replace(/<\/?[^>]+>/gi, '');
}

//hämta data
async function getData() {
  try {
    const response = await fetch(url);
    if (response.status !== 200) {
      return;
    }
    const data = await response.json();
    const menu = data.filter(item => item.dishName !== undefined);
    const orders = data.filter(item => item.name !== undefined);
    writeMenu(menu);
    writeOrders(orders);
  } catch (err) {
    console.log(err);
  }
}

  //Skriver ut hela menyn
  function writeMenu(menu) {
    const ulEl = document.getElementById("menu");
    ulEl.innerHTML = "";
  
    if (Array.isArray(menu)) {
    menu.forEach(dish => {
      if (dish.dishName != undefined) {
        ulEl.innerHTML += `
          <li id="${dish.id}">
            <b>${dish.id}</b>.
            ${dish.dishName} (${dish.dishContents}),
            ${dish.dishPrice} kr 
            <button class="dishbtn ${dish.id}">Ändra</button>
            <button class="dish ${dish.id}">Ta bort</button>
          </li>
        `;
      }
    });
    }
    const liEl = document.getElementsByClassName("dish");
    const btnEl = document.getElementsByClassName("dishbtn");
  
    Array.from(liEl).forEach((item) => {
      item.addEventListener("click", deleteThing);
    });
  
    Array.from(btnEl).forEach((item) => {
      item.addEventListener("click", (e) => {
        const class_item = e.target.classList.item(1);
        // Implementera ändra rätt här
      });
    });
  }
  
 // Funktionen för att skriva ut beställningarna
 function writeOrders(orders) {
  const ulEl = document.getElementById("orders");
  ulEl.innerHTML = "";

  if (Array.isArray(orders)) {
  orders.forEach(order => {
    if (order.name != undefined) {
      ulEl.innerHTML += `
        <li id="${order.order_id}">
          <b>${order.order_id}</b>.
          ${order.name} ( <i>${order.phoneNumber}</i> ),
          ${order.time}, <br>
          ${order.food}
          <button class="order ${order.order_id}">Hämtad</button>
        </li>
      `;
    }
  });}

  const liEl = document.getElementsByClassName("order");

  Array.from(liEl).forEach((item) => {
    item.addEventListener("click", deleteThing);
  });
}

  //ta bort enstaka rätt från menyn eller tar bort en färdig beställning (beroende på ID)
function deleteThing(e) {
    const id = e.target.classList.item(1);
  
    fetch(`${url}?id=${id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(data => getData())
      .catch(err => console.log(err));
  }

// skapa ny maträtt till menyn
function createDish(event) {
  event.preventDefault();

  const name = stripTags(dishName.value);
  const contents = stripTags(dishContents.value);
  const price = stripTags(dishPrice.value);

  const jsonStr = JSON.stringify({
    dishName: name,
    dishContents: contents,
    dishPrice: price,
  });

  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: jsonStr
  })
    .then(response => response.json())
    .then(data => getData())
    .catch(err => console.log(err));
}

// ändra befintlig maträtt i menyn
function changeDish(e) {
    const name = document.getElementById("changename").value;
    const contents = document.getElementById("changecontent").value;
    const price = document.getElementById("changeprice").value;
    const id = e.target.className;
  
    const jsonStr = JSON.stringify({
      id,
      dishName: stripTags(name),
      dishContents: stripTags(contents),
      dishPrice: stripTags(price),
    });
  
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: jsonStr
    })
      .then(response => response.json())
      .then(data => getData())
      .catch(err => console.log(err));
    
    form.innerHTML = "";
  }
