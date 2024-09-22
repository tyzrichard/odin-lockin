import "./styles.css";

// Todolist Logic

class Task {
    constructor(name, description = '', priority = 4, project = 'My Tasks', duedate, labels = [], isComplete = false){
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.project = project;
        this.duedate = duedate;
        this.labels = labels;
        this.isComplete = isComplete;
    }

    completeTask() {
        this.isComplete = true;
    }

    updateTask(name, description, priority, project, duedate, labels){
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.project = project;
        this.duedate = duedate;
        this.labels = labels;
    }
}

class Day {
    constructor(date) {
        this.date = date;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(taskName) {
        this.tasks = this.tasks.filter(task => task.name !== taskName);
    }

    getTasks() {
        return this.tasks;
    }

    getIncompleteTasks() {
        return this.tasks.filter(task => !task.isComplete);
    }
}

class TodoList {
    constructor() {
        this.days = [];  
    }

    addDay(day) {
        this.days.push(day);
    }

    findDay(date) {
        return this.days.find(day => day.date === date);
    }

    addTaskToDay(date, task) {
        let day = this.findDay(date);
        if (!day) {
            day = new Day(date);
            this.addDay(day);
        }
        day.addTask(task);
    }

    checkAndRemoveDay(date) {
        let day = this.findDay(date);
        if (day.tasks.length == 0){
            this.days = this.days.filter(date => date.date !== day.date);
        }
    }

    removeTaskFromDay(date, task) {
        let day = this.findDay(date);
        if (day) {
            day.removeTask(task.name);
        }
        this.checkAndRemoveDay(day.date);
    }

    getTasksByDay(date) {
        const day = this.findDay(date);
        return day ? day.getTasks() : [];
    }

    getAllDays() {
        return this.days;
    }
}


const todoList = new TodoList();
const task1 = new Task("task 1", "my first task", 3, 'My Tasks', '2024-09-20', ["hw", "test"]);
const task2 = new Task("task 2", "my second task", 1, 'My Tasks', '2024-09-22', ["hw", "important"]);
todoList.addTaskToDay(task1.duedate, task1);
todoList.addTaskToDay(task2.duedate, task2);
todoList.removeTaskFromDay(task2.duedate, task2);


// Get tasks for a specific day
const tasksForToday = todoList.getTasksByDay('2024-09-20');
console.log('Tasks for 2024-09-20:', tasksForToday);

// Get all tasks across all days
const allDays = todoList.getAllDays();
console.log('All days in the todo list:', allDays);

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
