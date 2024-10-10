function changeSvgColor(svg, color) {
    const svgElements = svg.querySelectorAll("path, circle, rect, polygon");
    svgElements.forEach((element) => {
        element.setAttribute("fill", color);
    });
}

function hexToRgb(hex) {
    hex = hex.replace('#', '');
    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return `${r}, ${g}, ${b}`;
}

function addDivider(parent) { // I KNOW THIS ISNT A SVG FUNCTION BUT IM LAZY
    const divider = document.createElement('div');
    divider.classList.add('divider');
    parent.appendChild(divider);
}

export { changeSvgColor, hexToRgb, addDivider };