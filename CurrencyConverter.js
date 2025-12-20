const BASE_URL ="https://latest.currency-api.pages.dev/v1/currencies/"; //replace to ""https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies""

const dropdowns = document.querySelectorAll(".dropdown-box select");
const btn = document.querySelector("Form button");
const fromCurr = document.querySelector(".From select");
const toCurr = document.querySelector(".To select");
const msg = document.querySelector(".result");

for(select of dropdowns){
  for(currCode in countryList){
    let newOption= document.createElement("option");
    newOption.innerText=currCode;
    newOption.value=currCode;
    select.append(newOption)
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
const updateFlag = (e) => {
  let x = e.value;
  let y = countryList[x];
  let newSrc = `https://flagsapi.com/${y}/flat/64.png`;
  let img = e.parentElement.querySelector("img");
  img.src = newSrc;

}; 
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }


const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let finalAmount = (data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]*Number(amount.value)).toFixed(2);
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});
}

window.addEventListener("load", () => {
  updateExchangeRate();
});