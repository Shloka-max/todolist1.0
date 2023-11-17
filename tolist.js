const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
let synth;
if ('speechSynthesis' in window) {
  synth = window.speechSynthesis;
} else {
  console.log("Text-to-speech not supported in this browser.");
}

function createTaskElement(task) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span class="task">${task}</span>
    <span>
      <button class="edit" onclick="editTask(this)"><i class="fa-solid fa-pen-to-square"></i><br>edit</button>
      <button class="done" onclick="toggleDone(this)"><i class="fa-solid fa-square-check"></i><br>Done</button>
      <button class="delete" onclick="deleteTask(this)"><i class="fa-solid fa-square-minus"></i><br>Delete</button>
    </span>
  `;
  taskList.appendChild(li);
}

function addTask() {
  const task = taskInput.value.trim();
  if (task !== "") {
    createTaskElement(task);
    taskInput.value = "";
  }
}
function speakTask(text) {
    if (synth && 'SpeechSynthesisUtterance' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance);
    } else {
      console.log("Text-to-speech not supported in this browser.");
    }
  }

function toggleDone(button) {
    speakTask("Done");
  const taskSpan = button.parentElement.previousElementSibling;
  taskSpan.classList.toggle("completed");
}

function deleteTask(button) {
    speakTask("Delete");
  const li = button.parentElement.parentElement;
  taskList.removeChild(li);
}

function editTask(button) {
    speakTask("Edit");
  const taskSpan = button.parentElement.previousElementSibling;
  const currentTask = taskSpan.innerText;
  const newTask = prompt("Edit task:", currentTask);
  if (newTask !== null && newTask.trim() !== "") {
    taskSpan.innerText = newTask.trim();
  }
}
const editButtons = document.querySelectorAll(".edit");
const doneButtons = document.querySelectorAll(".done");
const deleteButtons = document.querySelectorAll(".delete");

editButtons.forEach(button => {
  button.addEventListener("mouseover", function() {
    speakTask("Edit");
  });
});

doneButtons.forEach(button => {
  button.addEventListener("mouseover", function() {
    speakTask("Done");
  });
});

deleteButtons.forEach(button => {
  button.addEventListener("mouseover", function() {
    speakTask("Delete");
  });
});
