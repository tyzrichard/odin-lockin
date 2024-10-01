import "./styles.css";
import { todolist } from "./tasks.js";
import { renderTasks } from './myTasks.js';
import { startOfToday, format } from "date-fns";
import { defineCustomElements } from "@duetds/date-picker/dist/loader";

document.addEventListener('DOMContentLoaded', () => {

    //Dialog Datepicker
    defineCustomElements(window);

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
    const dialog = document.querySelector("dialog");
    const form = document.querySelector("form");
    const addNewTaskButton = document.querySelector(".new-task");
    const closeButton = document.querySelector(".closeDialog");


    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

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
    })

    addNewTaskButton.addEventListener("click", () => {
        dialog.showModal();
        form.reset();
    });

    closeButton.addEventListener('click', () => {
        dialog.close();
    });
});


// Styling Logic
const mainOptions = document.querySelectorAll(".main-option");
const projects = document.querySelectorAll(".project");

const mainOptionsAndProjects = [...mainOptions, ...projects];

function resetOptionColours() {
    mainOptionsAndProjects.forEach((option) => {
        option.style.color = "#FFFFFF";
        const svg = option.querySelector("svg");
        if (svg) {
            const svgElements = svg.querySelectorAll("path, circle, rect, polygon");
            svgElements.forEach((element) => {
                element.setAttribute("fill", "#FFFFFF");
            });
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
