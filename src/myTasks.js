// myTasks.js
import { todolist } from './tasks.js';

// Function to render tasks in the DOM
function renderTasks() {
    const listContainer = document.getElementById('content');
    listContainer.innerHTML = '';  // Clear the previous task list

    const todolistDays = todolist.getAllDays();

    todolistDays.forEach((day) => {
        const dayContainer = document.createElement('div');
        const dayItem = document.createElement('p');
        dayItem.textContent = `${day.date}`;
        dayContainer.appendChild(dayItem);
        const taskContainer = document.createElement('div');
        addTasksToDay(day, taskContainer);
        dayContainer.appendChild(taskContainer);
        listContainer.appendChild(dayContainer)
    })
}

function addTasksToDay(day, taskContainer) {
    const dayTasks = day.getAllTasks();
    
    dayTasks.forEach((task) => {
        // Create task item
        const taskItem = document.createElement('li');
        taskItem.textContent = `${task.name}: ${task.description}`;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            // Remove task from tasks array
            todolist.removeTaskFromDay(day, task);

            // Re-render the task list
            renderTasks();
        });

        // Append the button to the task item
        taskItem.appendChild(removeButton);

        // Append the task item to the task container
        taskContainer.appendChild(taskItem);
    });
}

export { renderTasks };


