document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => addTask(taskText, false));
  }

  function addTask(taskText, save = true) {
    const listItem = document.createElement("li");
    listItem.textContent = taskText;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove-btn";

    removeButton.onclick = () => {
      taskList.removeChild(listItem);
      removeTaskFromStorage(taskText);
    };

    listItem.appendChild(removeButton);
    taskList.appendChild(listItem);

    taskInput.value = "";

    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }
  }

  function removeTaskFromStorage(taskText) {
    let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks = storedTasks.filter((task) => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
  }

  addButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      addTask(taskText);
    } else {
      alert("Please enter a task.");
    }
  });

  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        addTask(taskText);
      } else {
        alert("Please enter a task.");
      }
    }
  });

  loadTasks();
});
