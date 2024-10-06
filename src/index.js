import "./styles.css";
import { todolist } from "./tasks.js";
import { renderTasks } from './myTasks.js';
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
        onChange: function (selectedDates, dateStr, instance) {

        }
    });
}

function addTaskDialogInitialisation() {
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

    form.addEventListener('submit', (event) => { // Submitting Form
        event.preventDefault();
        alert('Selected options: ' + hiddenInput.value);

        const formData = new FormData(form);
        const formValues = [];
        formData.forEach((value) => {
            formValues.push(value);
        });

        if (formValues[4] == '') {
            formValues[4] = format(startOfToday(), 'yyyy-MM-dd');
        }
        dialog.close();
        todolist.addTaskToDay(formValues)
        renderTasks();
    });

    const labelButtons = document.querySelectorAll('.label-button');
    const hiddenInput = document.getElementById('selected-labels');

    labelButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Toggle the 'selected' class
            this.classList.toggle('selected');
            updateSelectedOptions();
        });
    });

    function updateSelectedOptions() {
        // Get all selected buttons
        const selectedValues = [];
        document.querySelectorAll('.option-button.selected').forEach(button => {
            selectedValues.push(button.getAttribute('data-value'));
        });

        // Update the hidden input value
        hiddenInput.value = selectedValues.join(',');
    }

    addNewTaskButton.addEventListener("click", () => {
        dialog.showModal();
        form.reset();
        checkInputs();
    });

    closeButton.addEventListener('click', () => {
        dialog.close();
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

function changeSvgColor(svg, color) {
    const svgElements = svg.querySelectorAll("path, circle, rect, polygon");
    svgElements.forEach((element) => {
        element.setAttribute("fill", color);
    });
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
