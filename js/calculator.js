//Calculator

//Get instruction buttons
let decimalBtn = document.getElementById("btn-decimal");
let clearBtn = document.getElementById("btn-clear");
let backspaceBtn = document.getElementById("btn-backspace");
let displayValElement = document.getElementById("displayValue");

let displayVal = "0"; /*Simulates the zero on default*/
let pendingVal; /* Undefined. '5+3' then 3 would be displayed while 5 is pendingVal*/
let evalStringArray = []; /*Holds all values then can use eval()*/
/* Array by class*/
let calcNumBtns = document.getElementsByClassName("calc-btn-num");
let calcOperatorBtns = document.getElementsByClassName("calc-btn-operator");
/* clickObj automatically passes click event to the function*/
let updateDisplayVal = clickObj => {
  let btnText = clickObj.target.innerText;

  if (displayVal === "0") {
    displayVal = "";
  }
  displayVal += btnText;
  displayValElement.innerText = displayVal;
};

let performOperation = clickObj => {
  let operator = clickObj.target.innerText;

  switch (operator) {
    case "+":
      pendingVal = displayVal;
      displayVal = "0";
      displayValElement.innerText = displayVal;
      evalStringArray.push(pendingVal);
      evalStringArray.push("+");
      break;
    case "-":
      pendingVal = displayVal;
      displayVal = "0";
      displayValElement.innerText = displayVal;
      evalStringArray.push(pendingVal);
      evalStringArray.push("-");
      break;
    case "x":
      pendingVal = displayVal;
      displayVal = "0";
      displayValElement.innerText = displayVal;
      evalStringArray.push(pendingVal);
      evalStringArray.push("*");
      break;
    case "÷":
      pendingVal = displayVal;
      displayVal = "0";
      displayValElement.innerText = displayVal;
      evalStringArray.push(pendingVal);
      evalStringArray.push("/");
      break;
    case "=":
      evalStringArray.push(displayVal);
      let evaluation = eval(evalStringArray.join(" "));
      displayVal = evaluation + "";
      displayValElement.innerText = displayVal;
      evalStringArray = [];
    default:
      break;
  }
};

//Loop & Click Event for number buttons
for (let i = 0; i < calcNumBtns.length; i++) {
  calcNumBtns[i].addEventListener("click", updateDisplayVal, false);
}

//Loop  & Click Event for Operator buttons
for (let i = 0; i < calcOperatorBtns.length; i++) {
  calcOperatorBtns[i].addEventListener("click", performOperation, false);
}

//Clear Button Function
clearBtn.onclick = () => {
  displayVal = "0";
  pendingVal = undefined;
  evalStringArray = [];
  displayValElement.innerHTML = displayVal;
};

//Backspace Button Function
backspaceBtn.onclick = () => {
  let lengthOfDisplayVal = displayVal.length;
  displayVal = displayVal.slice(0, lengthOfDisplayVal - 1);

  if (displayVal === "") {
    displayVal = "0";
  }
  displayValElement.innerText = displayVal;
};

//Decimal Button Function
decimalBtn.onclick = () => {
  if (!displayVal.includes(".")) {
    displayVal += ".";
    displayValElement.innerText = displayVal;
  }
};

//Hide & Show Calculator function

function hideShow() {
  let x = document.getElementById("calculatorBody");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
