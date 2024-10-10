import { todolist } from './tasks.js';
import { differenceInDays, format, isPast, isToday, isTomorrow, startOfToday } from "date-fns";

// Function to render tasks in the DOM
function renderTasks() {
    const listContainer = document.getElementById('content');
    listContainer.innerHTML = '';  // Clear the previous task list

    todolist.rearrangeDays();
    const todolistPassedDays = todolist.filterPastDates();
    const todolistFutureDays = todolist.filterFutureDates();

    // Adds all overdue days under one container if there are any overdue days
    if (todolistPassedDays.length > 0) {
        const overdueContainer = document.createElement('div');
        overdueContainer.classList.add('day-container')
        listContainer.insertBefore(overdueContainer, listContainer.firstChild);

        const overdueHeader = document.createElement('div');
        overdueHeader.classList.add('day-header');
        let overdueTasks = 0;
        overdueContainer.appendChild(overdueHeader);
        addDivider(overdueContainer);

        todolistPassedDays.forEach((day) => {
            addTasksToDay(day, overdueContainer);
            overdueTasks += day.getNumberOfTasks();
        })

        if (overdueTasks > 1) {
            overdueHeader.textContent += `Overdue • ${overdueTasks} tasks overdue`
        } else {
            overdueHeader.textContent += `Overdue • ${overdueTasks} task overdue`
        } 
    }

    // Regular adding of dates which are not overdue
    todolistFutureDays.forEach((day) => {
        addRegularDay(day, listContainer);
    })
}


function addRegularDay(day, listContainer) {
    // Creates Day Container and Header
    const dayContainer = document.createElement('div');
    dayContainer.classList.add('day-container')
    const dayHeader = document.createElement('div');
    dayHeader.classList.add('day-header');

    // Dayheader styling
    function addDueTasks() {
        const dueTasks = day.getNumberOfTasks();
        if (dueTasks > 1) {
            dayHeader.textContent += ` • ${dueTasks} tasks due`
        } else {
            dayHeader.textContent += ` • ${dueTasks} task due`
        }
    }

    if (isToday(day.date)) {
        dayHeader.textContent = `${format(day.date, 'dd MMMM')} • Today`;
        addDueTasks();
    } else if (isTomorrow(day.date)) {
        dayHeader.textContent = `${format(day.date, 'dd MMMM')} • Tomorrow`;
        addDueTasks();
    } else if (differenceInDays(startOfToday()) < 7, day.date) {
        dayHeader.textContent = `${format(day.date, 'dd MMMM')} • ${format(day.date, 'iiii')}`
        addDueTasks();
    } else {
        dayHeader.textContent += `${format(day.date, 'dd MMMM')}`;
        addDueTasks();
    }

    dayContainer.appendChild(dayHeader);
    addDivider(dayContainer);
    // Actual adding of tasks happens in this function
    addTasksToDay(day, dayContainer);
    listContainer.appendChild(dayContainer)
}

function addTasksToDay(day, dayContainer) {
    const dayTasks = day.getAllTasks();

    dayTasks.forEach((task) => {
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');

        // Remove button handling + priority styling
        const removeButton = document.createElement('button');
        removeButton.addEventListener('click', () => {
            todolist.removeTaskFromDay(day, task);
            renderTasks();
        });
        if (task.priority == '1') {
            removeButton.classList.add('priority1')
        } else if (task.priority == '2') {
            removeButton.classList.add('priority2')
        } else if (task.priority == '3') {
            removeButton.classList.add('priority3')
        } else {
            removeButton.classList.add('priority4')
        }
        taskContainer.appendChild(removeButton);

        // Task Info including title, description and labels
        const taskInfo = document.createElement('div');
        taskInfo.classList.add('task-info');

        const taskTitle = document.createElement('div');
        taskTitle.textContent = `${task.name}`;
        taskInfo.appendChild(taskTitle);

        if (task.description != '') {
            const taskDesc = document.createElement('div');
            taskDesc.classList.add("task-desc");
            taskDesc.textContent = `${task.description}`;
            taskInfo.appendChild(taskDesc);
        }

        // Adding of Labels
        if (task.labels != '') {
            let labels = task.labels;

            const labelContainer = document.createElement("div");
            labelContainer.classList.add("label-container")

            labels.forEach(label => {
                const labelItem = document.createElement("div");
                labelItem.classList.add("label-item")
                labelItem.textContent = label[0];

                fetch(label[1])
                    .then(response => response.text())
                    .then(svgData => {
                        const labelSvg = document.createElement('div');
                        labelSvg.classList.add("label-svg");
                        labelSvg.innerHTML = svgData;

                        labelItem.appendChild(labelSvg);

                        labelSvg.querySelector('svg').style.fill = label[2];
                        labelItem.style.color = label[2];
                    })
                    .catch(error => console.log(error));
                labelContainer.appendChild(labelItem);
            })

            taskInfo.appendChild(labelContainer);
        }


        taskContainer.appendChild(taskInfo);

        dayContainer.appendChild(taskContainer);
        addDivider(dayContainer)
    });
}

function addDivider(parent) {
    const divider = document.createElement('div');
    divider.classList.add('divider');
    parent.appendChild(divider);
}

export { renderTasks };