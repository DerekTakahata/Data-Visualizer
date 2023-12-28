// Get all html elements
let container = document.querySelector('.container');
let genBut = document.querySelector('.generate');
let sortBut = document.querySelector('.sort');
let input = document.querySelector('input');
let number = document.querySelector('.number')


// Create necessary arrays and other variables
let divArr = [];
let heights = [];
let size = 15;

//navbar stuffs (button and slider setup)
genBut.addEventListener('click', () => {
  generateArray(size)
});
sortBut.addEventListener('click', sort);

input.addEventListener('input', () => {
  number.textContent = input.value;
  size = parseInt(input.value);
  generateArray(size);
})






// generates arrays of length 'size' heights contains the integer value and divArr contains
// html elements
function generateArray(size) {

  // empties HTML container and arrays (allows to be called repeatedly) 
  container.innerHTML='';
  heights = [];
  divArr = [];

  for(let i=0; i<size;i++){

    // Generate random height and add to heights arr
    let height; 
    height = Math.floor(Math.random() * (99) + 1);
    heights[i] = height;

    // Create html element with 'height' height and add to divArr
    divArr[i] = document.createElement('div');
    divArr[i].style =  "margin: 0 1px; background-color: #8e7f6a; height: " + height + "%; width: " + 100 / size + "%; position: realtive;";

    // Add child to html container div
    container.appendChild(divArr[i]);
  }
}

// NGL this came straingt from stackoverflow
// Allows to set delay of 'ms' milliseconds when called
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Determines which sorting method to use and sorts accordingly
// apparently functions need to be async if using await?
async function sort() {

  // detect sorting method from dropdown list
  let method = document.querySelector(".method");
  let value = method.value;

  // determines which sorting method to use and gets corresponding list of swaps
  let swaps
  switch(value) {
    case "Choose algorithm":
      alert("Please select a sorting algorithm!");
      swaps = [];
      break;
    case "Bubble sort":
      swaps = bubbleSort(heights);
      break;
    case "Selection sort":
      swaps = selectionSort(heights);
      break;
    case "Insertion sort":
      swaps = insertionSort(heights);
      break;
  }

  // Applies swaps to active html elements with a delay between each swap
  for (let i = 0; i < swaps.length; i++) {

    let first = swaps[i][0];
    let second = swaps[i][1];

    // swap divArr heights by changing height value (which is stored in seperate array)
    divArr[first].style.height = heights[second] + "%";
    divArr[second].style.height = heights[first] + "%";

    // Swap heights array as well so upcoming swaps are accurate
    let temp = heights[first]
    heights[first] = heights[second]
    heights[second] = temp
    
    // Add delay between loops so user can see change
    await sleep(50);
  }
}


// All sorting methods below take in heights array but sort a clone to preserve heights.
// They return an ordered array of swaps that took place during sorting

function bubbleSort(arr) {
  // Clone arr (can't use pointer because need arr (heights) to stay in original state)
  let tempList = [...arr]
  
  // sort templist, return list of 'tuples' of any indexes that swapped
  let swaps = []
  for (let i = 0; i < tempList.length -1 ; i++){
    for (let j = 0; j < tempList.length -i -1; j++){
      if(tempList[j] > tempList[j+1]) {
        swaps.push([j, j+1])
        let temp = tempList[j]
        tempList[j] = tempList[j+1]
        tempList[j+1] = temp
      }
    }
  }
  return swaps
}

function selectionSort(arr) {
  // Create clone as per ususal
  let tempList = [...arr];

  // algorithm
  let swaps = [];
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (tempList[min] > tempList[j])
      min = j;
    }
    if (i != min) {
      swaps.push([i, min])
      let temp = tempList[i];
      tempList[i] = tempList[min];
      tempList[min] = temp;
    }
  }
  // swaps only retturn swaps... might want to incorporate all comparisons,
  // since it makes this look really fast when in reality it's not as fast
  return swaps;
}

function insertionSort(arr) {
  let tempList = [...arr];
  let swaps = [];

  for (let i = 0; i < tempList.length; i++) {
    let temp = tempList[i];
    let j = i - 1;
    while (j >= 0 && tempList[j] > temp) {
      swaps.push([j, j+1])
      tempList[j + 1] = tempList[j];
      j--; 
    }
    tempList[j + 1] = temp;
  }
  return swaps;
}

// Generate array to start so bars are present when page originally loads
generateArray(size);
