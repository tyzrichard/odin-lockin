import { todolist } from './tasks.js';
import { addDivider } from './svgFunctions.js';
import { differenceInDays, format, isToday, isTomorrow, startOfToday } from "date-fns";

// Function to render tasks in the DOM
function renderTasks(board) {
    let contentContainer = document.querySelector('.content');
    if (board) {
        contentContainer.classList.add("content-board");
    } else {
        contentContainer.classList.remove("content-board");
    }
    contentContainer.innerHTML = '';  // Clear the previous task list

    todolist.rearrangeDays();
    const todolistPassedDays = todolist.filterPastDates();
    let todolistFutureDays;
    if (!board) {
        todolistFutureDays = todolist.filterFutureDates();
    } else {
        todolistFutureDays = todolist.filterFutureSevenDates();
    }


    // Adds all overdue days under one container if there are any overdue days
    if (todolistPassedDays.length > 0) {
        const overdueContainer = document.createElement('div');
        if (board) {
            overdueContainer.classList.add('day-container-board')
        } else {
            overdueContainer.classList.add('day-container')
        }
        contentContainer.insertBefore(overdueContainer, contentContainer.firstChild);

        const overdueHeader = document.createElement('div');
        overdueHeader.classList.add('day-header');
        let overdueTasks = 0;
        overdueContainer.appendChild(overdueHeader);
        if (!board) {
            addDivider(overdueContainer);
        }

        todolistPassedDays.forEach((day) => {
            addTasksToDay(day, overdueContainer, board);
            overdueTasks += day.getNumberOfTasks();
        })

        overdueHeader.textContent += `Overdue`;

        if (!board) {
            if (overdueTasks > 1) {
                overdueHeader.textContent += ` • ${overdueTasks} tasks overdue`
            } else {
                overdueHeader.textContent += ` • ${overdueTasks} task overdue`
            }
        }
    }

    // Regular adding of dates which are not overdue
    todolistFutureDays.forEach((day) => {
        addRegularDay(day, contentContainer, board);
    })
}


function addRegularDay(day, contentContainer, board) {
    // Creates Day Container and Header
    const dayContainer = document.createElement('div');
    if (board) {
        dayContainer.classList.add('day-container-board')
    } else {
        dayContainer.classList.add('day-container')
    }
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
    } else if (isTomorrow(day.date)) {
        dayHeader.textContent = `${format(day.date, 'dd MMMM')} • Tomorrow`;
    } else if (differenceInDays(startOfToday()) < 7, day.date) {
        dayHeader.textContent = `${format(day.date, 'dd MMMM')} • ${format(day.date, 'iiii')}`
    } else {
        dayHeader.textContent += `${format(day.date, 'dd MMMM')}`;
    }
    if (!board) {
        addDueTasks();
    }

    dayContainer.appendChild(dayHeader);
    if (!board) {
        addDivider(dayContainer);
    }
    // Actual adding of tasks happens in this function
    addTasksToDay(day, dayContainer, board);
    contentContainer.appendChild(dayContainer)
}

function addTasksToDay(day, dayContainer, board) { // 0 for list, 1 for board
    const dayTasks = day.getAllTasks();

    dayTasks.forEach((task) => {
        const taskContainer = document.createElement('div');
        if (board) {
            taskContainer.classList.add('task-container-board');
        } else {
            taskContainer.classList.add('task-container');
        }

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
        if (!board) {
            addDivider(dayContainer)
        }
    });
}



export { renderTasks };