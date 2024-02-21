
const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = localStorage.getItem("notes") || "";

function showNotes() {
    notesContainer.innerHTML = notes;
}

showNotes();

function updateStorage() {
    // Update the 'notes' variable with the current HTML content of the container
    notes = notesContainer.innerHTML;
    // Save the updated notes to local storage
    localStorage.setItem("notes", notes);
}

createBtn.addEventListener("click", () => {
    // Create a new paragraph element with contenteditable attribute
    let inputBox = document.createElement("p");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");

    // Create a delete image
    let img = document.createElement("img");
    img.src = "delete.png";

    // Append the paragraph and delete image to the container
    notesContainer.appendChild(inputBox).appendChild(img);

    // Update local storage
    updateStorage();
});

notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        // If the clicked element is an image, remove its parent paragraph
        e.target.parentElement.remove();
        // Update local storage
        updateStorage();
    } else if (e.target.tagName === "P") {
        // If the clicked element is a paragraph, update local storage on keyup
        e.target.onkeyup = function () {
            updateStorage();
        };
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        // Prevent the default behavior of the Enter key
        event.preventDefault();
        // Insert a line break at the current cursor position
        document.execCommand("insertLineBreak");
        // Update local storage
        updateStorage();
    }
});