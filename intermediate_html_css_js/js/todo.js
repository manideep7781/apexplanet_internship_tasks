document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  // Add Task
  addTaskBtn.addEventListener("click", () => {
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    let li = document.createElement("li");

    // Task Text
    let span = document.createElement("span");
    span.textContent = taskText;
    span.addEventListener("click", () => {
      span.classList.toggle("task-done");
    });

    // Delete Button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
      li.remove();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = "";
  });

  // Enter key should also add task
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTaskBtn.click();
    }
  });
});
