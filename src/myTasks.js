// myTasks.js
import { tasks, removeTask } from './tasks.js';

// Function to render tasks in the DOM
function renderTasks() {
    const taskContainer = document.getElementById('content');
    taskContainer.innerHTML = '';  // Clear the previous task list

    tasks.forEach((task) => {
        // Create task item
        const taskItem = document.createElement('li');
        taskItem.textContent = `${task.name}: ${task.description}: ${task.duedate}`;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            // Remove task from tasks array
            removeTask(task.name);

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


