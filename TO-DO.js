// Get references to input box and task list container (ul)
const inputBox = document.getElementById("input-box");
const List = document.getElementById("list");

/* 
  Function: enterTask
  Purpose: Called when user adds a new task.
  - If input is empty, alerts the user.
  - Otherwise, creates a new <li> with task text.
  - Adds a delete (×) icon using <span>.
  - Appends it to the list.
  - Clears the input field.
  - Saves the updated list to localStorage.
*/
function enterTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        List.append(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Unicode for ×
        li.appendChild(span);
    }

    inputBox.value = "";   // Clear input field
    saveData();            // Save list to localStorage
}

/* 
  Event Listener: Clicks on the <ul> list
  - If a <li> is clicked, toggle 'checked' class (to mark task as done).
  - If a <span> (× icon) is clicked, remove the parent <li> (task).
  - After deleting, update localStorage.
*/
List.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData(); // Save updated list
    }
}, false);

/* 
  Function: saveData
  Purpose: Save the current HTML inside the <ul> to localStorage
  - This helps preserve tasks even after refreshing the page.
*/
function saveData() {
    localStorage.setItem("data", List.innerHTML);
}

/* 
  Function: showTask
  Purpose: Load saved tasks from localStorage and display them on page load
*/
function showTask() {
    List.innerHTML = localStorage.getItem("data");
}

// Load tasks when page is opened or refreshed
showTask();
