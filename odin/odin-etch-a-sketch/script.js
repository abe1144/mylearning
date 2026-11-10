const container = document.querySelector(".container");
let isActive = false;
// Lets create the user controls here using DOM:

let output = document.getElementById("sliderValue");
let slider = document.getElementById("square-size");
let rainbow_toggle = document.getElementById("random");
let darkening_toggle = document.getElementById("darkening");
let rainbow_status = false;
let darkening_status = false;

rainbow_toggle.oninput = function () {
  rainbow_status = rainbow_toggle.checked;
};

darkening_toggle.oninput = function () {
  darkening_status = darkening_toggle.checked;
};
// helper functions:

const createGrid = function (size) {
  for (let i = 0; i < size; i++) {
    let row_container = document.createElement("div");
    row_container.className = "row";
    container.appendChild(row_container);

    for (let j = 0; j < size; j++) {
      let pixel = document.createElement("div");
      pixel.className = "square";
      row_container.appendChild(pixel);
    }
  }
};

const setSize = function (size) {
  const pixel_size = 750 / size - 2;

  const pixels = document.getElementsByClassName("square");
  Array.from(pixels).forEach((element) => {
    element.style.width = `${pixel_size}px`;
    element.style.height = `${pixel_size}px`;
  });
};

const resetScreen = function (size) {
  container.innerHTML = "";
  createGrid(size);
  setSize(size);
};

output.textContent = slider.value;

slider.oninput = function () {
  output.textContent = slider.value;
  container.innerHTML = "";
  createGrid(parseInt(slider.value));
  setSize(parseInt(slider.value));
};

const clear = document.querySelector("#clear");

clear.addEventListener("click", () => {
  const squares = document.getElementsByClassName("square");
  Array.from(squares).forEach((element) => {
    element.classList.remove("active");
    element.style.backgroundColor = "rgb(255,255,255)";
  });
});

// function to choose and output a rgb value
const chooseColour = function (random = false) {
  if (random) {
    const r = 255 * Math.random();
    const g = 255 * Math.random();
    const b = 255 * Math.random();
    return [r, g, b];
  } else {
    return [0, 0, 0]; //black
  }
};

const draw = function (element) {
  // determine colour to use
  const colour = chooseColour(rainow_status);
  // check if square is not active
  if (!element.classList.contains("active")) {
    // add active class to it
    element.classList.add("active");

    // check if darkening mode is enabled
    if (darkening_status) {
      element.dataset.passes = 1;
      element.dataset.r = colour[0];
      element.dataset.g = colour[1];
      element.dataset.b = colour[2];
      //   since we are in darkening mode, we use rgba and the opacity is set to the number of data_passes (in this case 0.1)
      element.style.backgroundColor = `rgba(${colour[0]}, ${colour[1]}, ${colour[2]}, 0.1)`;
    } else {
      // darkening mode is not enabled
      element.style.backgroundColor = `rgb(${colour[0]}, ${colour[1]}, ${colour[2]})`;
    }
  } else {
    // square is active, need to check if we are in darkening mode or not
    if (darkening_status) {
      // get the element's stored information
      const r = parseInt(element.dataset.r);
      const g = parseInt(element.dataset.g);
      const b = parseInt(element.dataset.b);
      let data_passes = parseInt(element.dataset.passes);

      //   since we are in darkening mode, then we need to increase opacity, but only do so if data_passes <= 10
      if (data_passes <= 10) {
        data_passes += 1;
        element.dataset.passes = data_passes;
        element.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${data_passes * 0.1})`;
      } else {
        element.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 1)`;
      }
    }
  }
};

// event listener for when square is clicked by user (event delegation on the container)
container.addEventListener("mousedown", function (event) {
  const square = event.target.closest(".square");

  if (square && container.contains(square)) {
    isActive = true;
    draw(square);
  }
});

container.addEventListener("mouseover", function (event) {
  const square = event.target.closest(".square");

  if (square && container.contains(square)) {
    if (isActive) {
      draw(square);
    }
  }
});

document.addEventListener("mouseup", function (event) {
  isActive = false;
});

resetScreen(16);
