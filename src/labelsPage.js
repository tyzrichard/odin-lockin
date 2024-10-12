import { labelList } from "./labels";
import { todolist } from "./tasks";
import { addDivider } from "./svgFunctions";

function renderLabels() {
    const listContainer = document.getElementById('content');
    listContainer.innerHTML = '';

    const labelContainer = document.createElement("div");
    labelContainer.classList.add('day-container');

    const labelsSummary = document.createElement("div");
    labelsSummary.textContent = `Showing ${labelList.getNumberOfLabels()} Labels`
    labelsSummary.classList.add('day-header');
    labelContainer.appendChild(labelsSummary);
    addDivider(labelContainer);

    const labels = labelList.getAllLabels();
    labels.forEach(label => {
        const labelItem = document.createElement("div");
        labelItem.classList.add("label-item-page")
        labelItem.textContent = label.name;

        fetch(label.svg)
            .then(response => response.text())
            .then(svgData => {
                const labelSvg = document.createElement('div');
                labelSvg.classList.add("label-svg-large");
                labelSvg.innerHTML = svgData;

                labelItem.insertBefore(labelSvg, labelItem.firstChild);

                labelSvg.querySelector('svg').style.fill = label.textColor;
                labelItem.style.color = label.svg;
            })
            .catch(error => console.log(error));

        const labelCount = document.createElement("div");
        labelCount.textContent = `${todolist.getNumberOfTasksWithLabel(label.name)}`;
        labelCount.classList.add("label-count")
        labelItem.appendChild(labelCount);
        labelContainer.appendChild(labelItem);

        addDivider(labelContainer);
    })

    const addNewLabelDiv = document.createElement("div");
    addNewLabelDiv.textContent = "Add New Label";
    const plusSign = document.createElement("div"); // I got lazy, not gonna do that svg stuff all over again :D
    plusSign.textContent = "+"; 
    addNewLabelDiv.appendChild(plusSign);
    addNewLabelDiv.classList.add("add-new-label-div");
    labelContainer.appendChild(addNewLabelDiv);

    

    listContainer.appendChild(labelContainer);
}

export { renderLabels };