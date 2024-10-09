function renderLabels() {
    const listContainer = document.getElementById('content');
    listContainer.innerHTML = '';

    const test = document.createElement("div");
    test.textContent = "thats crazy! this doesnt work yet, though!";
    listContainer.appendChild(test);
}

export { renderLabels };