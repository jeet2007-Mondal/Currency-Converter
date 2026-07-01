const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";



const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



// 1. Here , update all the country codes in the select option
for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from"  &&  currCode === "USD"){
            newOption.selected = "selected";
        } else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener ("change" , (evt) => {
        updateFlag(evt.target);
    });
}


// 2. Here , update the images as per country code
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    // let newSrc = "https://flagsapi.com/${countryCode}/flat/64.png";
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


/* 3. Here , when the button click then what happend - 
 input value take and the msg part update */
btn.addEventListener("click" , async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal == "" || amtVal < 1){
        amount.value = "1";
    }

    // const URL = `BASE_URL/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);
    // let rate = data[toCurr.value.toLowerCase()];
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = amtVal * rate ;
    msg.innerText = `${amtVal} ${fromCurr.value}  = ${finalAmount} ${toCurr.value}`;


});