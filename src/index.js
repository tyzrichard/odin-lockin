import "./styles.css";
import { todolist, Task } from "./tasks.js";
import { renderTasks } from './myTasks.js';
import { labelList } from "./labels.js";
import { renderLabels } from "./labelsPage.js";
import { changeSvgColor, hexToRgb } from "./svgFunctions.js";
import { startOfToday, format } from "date-fns";
import '@mantine/dates/styles.css';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

let page;

document.addEventListener('DOMContentLoaded', () => {

    // Sidebar Dialog + Datepicker Intialisation
    datePickerInitialisation();
    addTaskDialogInitialisation();

    const pages = {
        "my-tasks": function () {
            addTitle("My Tasks", "Welcome back, Guest! It's time to Lock In!")
            renderTasks();
        },

        upcoming: function () {
            addTitle("Upcoming Tasks", "Everything for the next week")
            renderLabels();
        },

        labels: function () {
            addTitle("Labels")
            renderLabels();
        },

        history: function () {
            addTitle("History")
            renderLabels();
        },
    }

    document.querySelectorAll('.main-option').forEach(option => {
        option.addEventListener('click', function () {
            page = this.getAttribute('data-page');
            if (pages[page]) {
                pages[page](); // Call the function for the selected page
            } else {
                console.error(`Page not found: ${page}`);
            }
        });
    });

    page = "my-tasks";
    pages[page]();
});


function addTitle(titleText, subtitleText) {
    const title = document.querySelector('#title')
    title.innerHTML = '';
    const myTasksHeader = document.createElement('div');
    const myTasksHeader1 = document.createElement('h1');
    myTasksHeader1.textContent = titleText;
    myTasksHeader.appendChild(myTasksHeader1);
    if (subtitleText) {
        const myTasksHeader2 = document.createElement('h2');
        myTasksHeader2.textContent = subtitleText;
        myTasksHeader.appendChild(myTasksHeader2);
    }
    title.appendChild(myTasksHeader);
}

function datePickerInitialisation() {
    flatpickr("#date", {
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
        static: true,
    });
}

function addTaskDialogInitialisation() {
    // Task for the current iteration
    let tempTask;

    const dialog = document.querySelector("dialog");
    const form = document.querySelector("form");
    const addNewTaskButton = document.querySelector(".new-task");
    const closeButton = document.querySelector(".closeDialog");
    const submitButton = document.querySelector(".submitDialog");

    // Handling the priority dropdown and its flag
    const priority_dropdown = document.getElementById('priority');
    const priority_dropdown_flag = document.querySelector(".priority_dropdown_flag")
    function changePriorityFlagColour() {
        const selectedValue = priority_dropdown.value;
        if (selectedValue == 1) {
            changeSvgColor(priority_dropdown_flag, "#F87171");
        } else if (selectedValue == 2) {
            changeSvgColor(priority_dropdown_flag, "#FB923C");
        } else if (selectedValue == 3) {
            changeSvgColor(priority_dropdown_flag, "#60A5FA");
        } else {
            changeSvgColor(priority_dropdown_flag, "#9CA3AF");
        }
    }
    priority_dropdown.addEventListener('change', function () {
        changePriorityFlagColour();
    });

    // Making sure the task's name is filled up before enabling the submit button
    const taskname = document.getElementById("task_name");
    function checkInputs() {
        if (taskname.value.trim() !== '') {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }
    taskname.addEventListener('input', checkInputs);

    // Using JS to render the label button/selectors into the form
    function renderLabelButtons() {
        const labelContainer = document.querySelector(".form-labels");
        labelContainer.innerHTML = '';

        labelList.labels.forEach(label => {
            const labelButton = document.createElement("div");
            labelButton.classList.add("label-button");
            labelButton.setAttribute('data-name', label.name);
            labelButton.setAttribute('data-svg', label.svg);
            labelButton.setAttribute('data-textColor', label.textColor);
            labelButton.textContent = label.name;
            labelButton.style.color = label.textColor;
            labelButton.style.border = `1px solid rgba(${hexToRgb(label.textColor)}, 0.5)`;

            // Some complicated ChatGPT ahh shit to render the SVG
            fetch(label.svg)
                .then(response => response.text())
                .then(svgData => {
                    const labelSvg = document.createElement('div');
                    labelSvg.classList.add("label-svg");
                    labelSvg.innerHTML = svgData;
                    labelButton.appendChild(labelSvg);
                    labelSvg.querySelector('svg').style.fill = label.textColor;
                })
                .catch(error => console.log(error));
            labelContainer.appendChild(labelButton);
        });
    }
    renderLabelButtons();

    const labelButtons = document.querySelectorAll('.label-button');

    // Styling for the label buttons
    labelButtons.forEach((button, index) => {
        const label = labelList.labels[index];

        button.addEventListener('click', function () {
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

    // Updating the label database whenever the buttons are clicked
    function updateSelectedLabels() {
        const selectedValues = [];
        document.querySelectorAll('.label-button.selected').forEach(button => {
            const labelValues = [button.getAttribute('data-name'), button.getAttribute('data-svg'), button.getAttribute('data-textColor')]
            selectedValues.push(labelValues);
        });

        tempTask.labels = selectedValues;
    }

    // Reseting the look of the label + its "selected" status
    function resetSelectedLabels() {
        document.querySelectorAll('.label-button.selected').forEach(button => {
            button.classList.toggle('selected');
            button.style.backgroundColor = '';
            button.style.border = `1px solid rgba(${hexToRgb(button.getAttribute('data-textColor'))}, 0.5)`;
        });

        tempTask.labels = [];
    }

    // Stuff that happens whenever you bring up the form
    addNewTaskButton.addEventListener("click", () => {
        dialog.showModal();
        form.reset();
        tempTask = new Task();
        changePriorityFlagColour();
        checkInputs();
        resetSelectedLabels();
    });

    // Close and Submit buttons
    closeButton.addEventListener('click', () => {
        dialog.close();
    });

    form.addEventListener('submit', (event) => {
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

        todolist.addTask(tempTask);
        if (page == "my-tasks"){
            renderTasks();
        }
    });
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
