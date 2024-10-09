import "./styles.css";
import { todolist, Task } from "./tasks.js";
import { renderTasks } from './myTasks.js';
import { labelList } from "./labels.js";
import { changeSvgColor, hexToRgb } from "./svgFunctions.js";
import { changePriorityFlag, renderLabelButtons, checkInputs } from "./universalDialogFunctions.js";
import { startOfToday, format } from "date-fns";
import '@mantine/dates/styles.css';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

document.addEventListener('DOMContentLoaded', () => {

    //Dialog Datepicker
    datePickerInitialisation();

    //Content
    const title = document.querySelector('#title')
    const myTasksHeader = document.createElement('div');
    const myTasksHeader1 = document.createElement('h1');
    const myTasksHeader2 = document.createElement('h2');
    myTasksHeader1.textContent = "My Tasks";
    myTasksHeader2.textContent = "Welcome back, Guest! It's time to Lock In!";
    myTasksHeader.appendChild(myTasksHeader1);
    myTasksHeader.appendChild(myTasksHeader2);
    title.appendChild(myTasksHeader);

    renderTasks();  // Render tasks on page load

    // Dialog to add new Task
    addTaskDialogInitialisation();
});


function datePickerInitialisation() {
    flatpickr("#date", {
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
        static: true,
    });
}

const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const addNewTaskButton = document.querySelector(".new-task");
const closeButton = document.querySelector(".closeDialog");

let tempTask = new Task();

function addTaskDialogInitialisation() {
    // Changing Priority Flag Colour
    const priority_dropdown = document.getElementById('priority');
    priority_dropdown.addEventListener('change', function () {
        changePriorityFlag();
    });

    // A task name is the MINIMUM needed to submit the form
    const taskname = document.getElementById("task_name");
    taskname.addEventListener('input', checkInputs);

    // Adding and Handling Label Buttons
    renderLabelButtons();
    const labelButtons = document.querySelectorAll('.label-button');
    console.log(labelButtons)
    labelButtons.forEach((button, index) => {
        const label = labelList.labels[index];
        button.addEventListener('click', function () {
            console.log('y')
            this.classList.toggle('selected');
            if (button.classList.contains('selected')) {
                button.style.backgroundColor = `rgba(${hexToRgb(label.bgColor)}, 0.3`;
                button.style.border = `1px solid #0F172A`;
            } else {
                button.style.backgroundColor = '';
                button.style.border = `1px solid rgba(${hexToRgb(label.textColor)}, 0.5)`;
            }
            updateSelectedLabels();
        });
    });


    function updateSelectedLabels() {
        const selectedValues = [];
        document.querySelectorAll('.label-button.selected').forEach(button => {
            const labelValues = [button.getAttribute('data-name'), button.getAttribute('data-svg'), button.getAttribute('data-textColor')]
            selectedValues.push(labelValues);
        });

        tempTask.labels = selectedValues;
    }

    function resetSelectedLabels() {
        document.querySelectorAll('.label-button.selected').forEach(button => {
            button.classList.toggle('selected');
        });

        tempTask.labels = [];
    }

    addNewTaskButton.addEventListener("click", () => {
        resetDialog();
    });

    closeButton.addEventListener('click', () => {
        dialog.close();
    });

    form.addEventListener('submit', (event) => { // Submitting Form
        event.preventDefault();

        const formData = new FormData(form);
        const formValues = [];
        formData.forEach((value) => {
            formValues.push(value);
        });
        let [name, desc, priority, project, date] = formValues;
        dialog.close();

        if (date == '') {
            date = format(startOfToday(), 'yyyy-MM-dd');
        }

        tempTask.name = name;
        tempTask.description = desc;
        tempTask.priority = priority;
        tempTask.project = project;
        tempTask.date = date;

        console.log(tempTask)
        todolist.addTask(tempTask);
        renderTasks();
    });
}

function resetDialog() {
    dialog.showModal();
    form.reset();
    tempTask = new Task();
    checkInputs();
    // renderLabelButtons();
    // resetSelectedLabels();
    changePriorityFlag();
}



// Styling Logic
const mainOptions = document.querySelectorAll(".main-option");
const projects = document.querySelectorAll(".project");

const mainOptionsAndProjects = [...mainOptions, ...projects];

function resetOptionColours() {
    mainOptionsAndProjects.forEach((option) => {
        option.style.color = "#FFFFFF";
        const svg = option.querySelector("svg");
        if (svg) {
            changeSvgColor(svg, "#FFFFFF")
        }
        option.style["background-color"] = "";
    })
}

mainOptionsAndProjects.forEach((option) => {
    option.addEventListener("click", () => {
        resetOptionColours();
        option.style.color = "#FB923C";
        const svg = option.querySelector("svg");
        if (svg) {
            const svgElements = svg.querySelectorAll("path, circle, rect, polygon");
            svgElements.forEach((element) => {
                element.setAttribute("fill", "#FB923C");
            });
        }
        option.style["background-color"] = "rgba(154, 52, 18, 40%)";
    });
});
