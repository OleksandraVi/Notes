const notesContainer = document.querySelector(".notes-container");
const saveBtn = document.querySelector(".save");
const notesList = document.querySelector(".notes-list");
let allNotes = JSON.parse(localStorage.getItem("notes")) || [];


function updateNotesList() {
    notesList.innerHTML = "";
    allNotes.forEach(function (note) {
        const li = document.createElement("li");
        li.textContent = `Note: ${note.text} Date: ${new Date(note.time).toLocaleString()}`;
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"
        span.setAttribute("data-key", note.key);
        li.appendChild(span);
        notesList.appendChild(li);
    });
}

notesList.addEventListener("click", function (e) {
    if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        allNotes = allNotes.filter((note) => note.key != e.target.dataset.key)
        updateStorage();
    }
})

function updateStorage() {
    localStorage.setItem("notes", JSON.stringify(allNotes));
}

updateNotesList();

saveBtn.addEventListener("click", function () {
    const noteText = notesContainer.value.trim();
    if (noteText.length === 0) return;
    const currentTime = new Date().getTime();
    const note = { text: noteText, time: currentTime, key: Date.now() };
    allNotes.push(note);
    updateStorage();
    notesContainer.value = "";
    updateNotesList();
});
