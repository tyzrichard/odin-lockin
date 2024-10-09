import { labelList } from "./labels.js";
import { changeSvgColor, hexToRgb } from "./svgFunctions.js";

function changePriorityFlag() {
    const priority_dropdown = document.getElementById('priority');
    const priority_dropdown_flag = document.querySelector(".priority_dropdown_flag")
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

const taskname = document.getElementById("task_name");
const submitButton = document.querySelector(".submitDialog");
function checkInputs() {
    if (taskname.value.trim() !== '') {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

export { changePriorityFlag, renderLabelButtons, checkInputs };