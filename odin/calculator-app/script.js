let temp_memory = {};
let operatorPressed = false;

// --- Math Functions ---
// REQUIREMENT: Create individual functions for add, subtract, multiply, divide
// EDGE CASE: What should happen if someone divides by zero?

const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const multiply = function (a, b) {
  return a * b;
};

const divide = function (a, b) {
  return a / b;
};

// --- Core Logic ---
// REQUIREMENT: An operate() function that takes an operator and two numbers,
//              then calls the right math function

const operate = function (operator, a, b) {
  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
    return subtract(a, b);
  } else if (operator === "*") {
    return multiply(a, b);
  } else {
    if (b === 0) {
      return "Divide by 0";
    } else {
      return divide(a, b);
    }
  }
};

let display = document.querySelector("output[name=display]");

// reset State

const resetState = function () {
  display.innerHTML = 0;
  operatorPressed = false;
  temp_memory = {};
};

// function to properly store number given a number btn is pressed
const storeNumber = function (btn) {
  if (Object.keys(temp_memory).length === 0) {
    if (operatorPressed) {
      // console.log("operator, pressed, setting a=0", temp_memory);
      temp_memory["a"] = "0";
    } else {
      temp_memory["a"] = btn.value;
    }
  } else if (Object.keys(temp_memory).length === 1) {
    if (operatorPressed) {
      temp_memory["b"] = btn.value;
    } else {
      temp_memory["a"] += btn.value;
    }
  } else if (operatorPressed) {
    if ("b" in temp_memory) {
      temp_memory["b"] += btn.value;
    } else {
      temp_memory["b"] = btn.value;
    }
  }
};

const updateDisplay = function (number) {
  display.innerHTML = number;
};

let container = document.querySelector(".container");

// event delegation
container.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    console.log("button clicked: ", e.target.value);
  }
  if (e.target.classList.value === "clear") {
    resetState();
  } else if (e.target.classList.value === "operators") {
    if ("total" in temp_memory) {
      temp_memory["a"] = temp_memory["total"];
      temp_memory["operator"] = e.target.value;
      operatorPressed = true;
      delete temp_memory.b;
      delete temp_memory.total;
    } else if ("operator" in temp_memory) {
      // we have to check if b i within temp_memory
      if ("b" in temp_memory) {
        let total = operate(
          e.target.value,
          parseFloat(temp_memory["a"]),
          parseFloat(temp_memory["b"]),
        );
        // operatorPressed = true;
        temp_memory["a"] = total;
        temp_memory["operator"] = e.target.value;
        delete temp_memory.b;
      } else {
        // b is not in and the user pressed operator twice
        operatorPressed = true;
        temp_memory["operator"] = e.target.value;
      }
    } else {
      // check if a is in temp memory, if not assign a 0
      if ("a" in temp_memory) {
        temp_memory["operator"] = e.target.value;
        operatorPressed = true;
      } else {
        temp_memory["operator"] = e.target.value;
        operatorPressed = true;
        temp_memory["a"] = "0";
      }
    }
  } else if (e.target.classList.value === "equal") {
    if (Object.keys(temp_memory).length <= 1) {
      updateDisplay(display.innerHTML);
    } else {
      // updateDisplay();
      let total = operate(
        temp_memory["operator"],
        parseFloat(temp_memory["a"]),
        parseFloat(temp_memory["b"]),
      );
      temp_memory["total"] = total;
      updateDisplay(total);
      console.log(temp_memory);
    }
  } else if (e.target.classList.value === "number") {
    // numbers is pressed
    // check "."
    if (e.target.value === ".") {
      if (
        !operatorPressed &&
        "a" in temp_memory &&
        temp_memory["a"].includes(".")
      ) {
        return;
      }
      if (
        operatorPressed &&
        "b" in temp_memory &&
        temp_memory["b"].includes(".")
      ) {
        return;
      }
    }
    storeNumber(e.target);
    if (operatorPressed) {
      updateDisplay(temp_memory["b"]);
    } else {
      updateDisplay(temp_memory["a"]);
    }
    console.log(temp_memory);
  } else {
    // plusminus button is pressed
    if (operatorPressed) {
      if (!("total" in temp_memory)) {
        temp_memory["b"] = (parseFloat(temp_memory["b"]) * -1).toString();
        updateDisplay(temp_memory["b"]);
      } else {
        temp_memory["total"] = (
          parseFloat(temp_memory["total"]) * -1
        ).toString();
        updateDisplay(temp_memory["total"]);
      }
    } else {
      // check if a exist or not
      if ("a" in temp_memory) {
        temp_memory["a"] = (parseFloat(temp_memory["a"]) * -1).toString();
        updateDisplay(temp_memory["a"]);
      } else {
        // a is not in temp memory, we need set it to 0 first
        temp_memory["a"] = "0";
        temp_memory["a"] = (parseFloat(temp_memory["a"]) * -1).toString();
        updateDisplay(temp_memory["a"]);
      }
    }
  }
});
