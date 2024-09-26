import "./styles.css";
import { addTask } from "./tasks.js";
import { renderTasks } from './myTasks.js';

document.addEventListener('DOMContentLoaded', () => {
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

        dialog.close();
        addTask(formValues[0], formValues[1], formValues[2]);
        renderTasks();
    })

    addNewTaskButton.addEventListener("click", () => {
        dialog.showModal();
        //form.reset();
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
