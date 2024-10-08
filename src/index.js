import "./styles.css";
import { todolist, Task } from "./tasks.js";
import { renderTasks } from './myTasks.js';
import { labelList } from "./labels.js";
import { changeSvgColor, hexToRgb } from "./svgFunctions.js";
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

function addTaskDialogInitialisation() {
    const tempTask = new Task();
    console.log("temptask reinit")

    const dialog = document.querySelector("dialog");
    const form = document.querySelector("form");
    const addNewTaskButton = document.querySelector(".new-task");
    const closeButton = document.querySelector(".closeDialog");
    const submitButton = document.querySelector(".submitDialog");

    const priority_dropdown = document.getElementById('priority');
    const priority_dropdown_flag = document.querySelector(".priority_dropdown_flag")
    priority_dropdown.addEventListener('change', function () { // Changing Priority Flag Colour
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
    });

    const taskname = document.getElementById("task_name");
    function checkInputs() {
        if (taskname.value.trim() !== '') {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }
    taskname.addEventListener('input', checkInputs);

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

            fetch(label.svg)
                .then(response => response.text())
                .then(svgData => {
                    // Create a container for the SVG
                    const labelSvg = document.createElement('div');
                    labelSvg.classList.add("label-svg");
                    labelSvg.innerHTML = svgData; // Inject SVG into the DOM

                    // Append the SVG to the button
                    labelButton.appendChild(labelSvg);

                    // Change the color (if the SVG has a fill or stroke property)
                    labelSvg.querySelector('svg').style.fill = label.textColor;
                })
                .catch(error => console.log(error));
            labelContainer.appendChild(labelButton);
        });
    }

    renderLabelButtons();

    const labelButtons = document.querySelectorAll('.label-button');

    labelButtons.forEach((button, index) => {
        const label = labelList.labels[index];  // Get corresponding label properties

        button.addEventListener('click', function () {
            this.classList.toggle('selected');

            if (button.classList.contains('selected')) {
                // Set the background color to the label's text color and remove the border
                button.style.backgroundColor = `rgba(${hexToRgb(label.bgColor)}, 0.3`;
                button.style.border = `1px solid #0F172A`;
            } else {
                // Reset the background color to the label's bgColor and set the border to textColor
                button.style.backgroundColor = '';
                button.style.border = `1px solid rgba(${hexToRgb(label.textColor)}, 0.5)`;
            }

            updateSelectedLabels(); // Function to update selected labels
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
        dialog.showModal();
        form.reset();
        checkInputs();
        resetSelectedLabels();
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
