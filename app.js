// REFERENCE VARIABLE
const inputBox = document.getElementById("todo");
const myList = document.getElementById("toDoList");
const submitButton = document.getElementById("submitButton");

// FUNCTION TO ADD DYNAMICALLY CREATED LI ELEMENTS
function addTask() {
  if (inputBox.value === "") {
    alert("You must write somethimg!");
  } else {
    // ADD NEW <LI> ELEMENT IN THE TO DO LIST
    const li = document.createElement("li");
    li.innerHTML = inputBox.value;

    // ADD A <SPAN> TAG TO DELETE TASK
    const span = document.createElement("span");
    span.innerHTML = "\u274C";
    span.className = "delete";
    li.appendChild(span);
    myList.appendChild(li);
  }
  inputBox.value = "";
  saveTask();
}

submitButton.addEventListener("click", function () {
  addTask();
});

inputBox.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// FUNCTION TO TOGGLE COMPLETED CLASS AND REORDER ITEMS
function toggleCompleted(li) {
  li.classList.toggle("completed");

  if (li.classList.contains("completed")) {
    li.originalIndex = Array.from(myList.children).indexOf(li);
    myList.appendChild(li);
  } else {
    const originalIndex = li.originalIndex;
    const listItemAtIndex = myList.children[originalIndex];
    myList.insertBefore(li, listItemAtIndex);
  }
}

// FUNCTION TO REMOVE AN LI ELEMENT
function removeItem(li) {
  li.remove();
}

// EVENT LISTENER FOR DYNAMICALLY CREATED LI ELEMENTS
myList.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    toggleCompleted(event.target);
    saveTask();
  } else if (event.target.classList.contains("delete")) {
    removeItem(event.target.parentNode);
    saveTask();
  }
});

// SAVE THE TASK LIST IN THE LOCAL STORAGE OF BROWSER
function saveTask() {
  localStorage.setItem("data", myList.innerHTML);
}

// GET THE PREVIOUS TASK LIST AFTER RELOAD OR WHEN WE OPEN THE WEBSITE
function showTask() {
  myList.innerHTML = localStorage.getItem("data");
}
showTask();
