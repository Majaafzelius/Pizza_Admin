"use strict";const url="https://studenter.miun.se/~maaf2200/writeable/dt173g/Projekt/webbservice/rest.php";function init(){getData()}window.onload=init;const dishName=document.getElementById("name"),dishContents=document.getElementById("content"),dishPrice=document.getElementById("price"),submit=document.getElementById("submit");let form=document.getElementById("vis_form");function stripTags(e){return e.replace(/<\/?[^>]+>/gi,"")}async function getData(){try{const e=await fetch(url);if(200!==e.status)return;const t=await e.json(),n=t.filter((e=>void 0!==e.dishName)),i=t.filter((e=>void 0!==e.name));writeMenu(n),writeOrders(i)}catch(e){console.log(e)}}function writeMenu(e){const t=document.getElementById("menu");t.innerHTML="",Array.isArray(e)&&e.forEach((e=>{null!=e.dishName&&(t.innerHTML+=`\n          <li id="${e.id}">\n            <b>${e.id}</b>.\n            ${e.dishName} (${e.dishContents}),\n            ${e.dishPrice} kr \n            <button class="dishbtn ${e.id}">Ändra</button>\n            <button class="dish ${e.id}">Ta bort</button>\n          </li>\n        `)}));const n=document.getElementsByClassName("dish"),i=document.getElementsByClassName("dishbtn");Array.from(n).forEach((e=>{e.addEventListener("click",deleteThing)})),Array.from(i).forEach((e=>{e.addEventListener("click",(e=>{e.target.classList.item(1)}))}))}function writeOrders(e){const t=document.getElementById("orders");t.innerHTML="",Array.isArray(e)&&e.forEach((e=>{null!=e.name&&(t.innerHTML+=`\n        <li id="${e.order_id}">\n          <b>${e.order_id}</b>.\n          ${e.name} ( <i>${e.phoneNumber}</i> ),\n          ${e.time}, <br>\n          ${e.food}\n          <button class="order ${e.order_id}">Hämtad</button>\n        </li>\n      `)}));const n=document.getElementsByClassName("order");Array.from(n).forEach((e=>{e.addEventListener("click",deleteThing)}))}function deleteThing(e){const t=e.target.classList.item(1);fetch(`${url}?id=${t}`,{method:"DELETE"}).then((e=>e.json())).then((e=>getData())).catch((e=>console.log(e)))}function createDish(e){e.preventDefault();const t=stripTags(dishName.value),n=stripTags(dishContents.value),i=stripTags(dishPrice.value),s=JSON.stringify({dishName:t,dishContents:n,dishPrice:i});fetch(url,{method:"POST",headers:{"content-type":"application/json"},body:s}).then((e=>e.json())).then((e=>getData())).catch((e=>console.log(e)))}function changeDish(e){const t=document.getElementById("changename").value,n=document.getElementById("changecontent").value,i=document.getElementById("changeprice").value,s=e.target.className,r=JSON.stringify({id:s,dishName:stripTags(t),dishContents:stripTags(n),dishPrice:stripTags(i)});fetch(url,{method:"PUT",headers:{"content-type":"application/json"},body:r}).then((e=>e.json())).then((e=>getData())).catch((e=>console.log(e))),form.innerHTML=""}submit.addEventListener("click",createDish);