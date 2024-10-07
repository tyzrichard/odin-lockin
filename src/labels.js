import school from "./assets/project/school.svg";
import misc from "./assets/labels/bolt.svg";
import competition from "./assets/labels/trophy.svg";
import { rgba } from "@mantine/core";

class Label {
    constructor(name, svg, textColor, bgColor) {
        this.name = name;
        this.svg = svg;
        this.textColor = textColor;
        this.bgColor = bgColor;
    }
}

class LabelList {
    constructor() {
        this.labels = [];
    }

    addLabel(name, svg, textColor, bgColor) {
        const label = new Label(name, svg, textColor, bgColor);
        this.labels.push(label);
    }

    removeLabel(labelName) {
        this.labels = this.labels.filter(label => label.name !== labelName);
    }
}

const labelList = new LabelList();

labelList.addLabel("School", school, "#16A34A", "#15803D");
labelList.addLabel("Misc", misc, "#F87171", "#B91C1C");
labelList.addLabel("Competition", competition, "#FBBF24", "#A16207");

export { labelList };