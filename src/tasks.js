export class Task {
    constructor(name, description = '', priority, project, duedate, labels) {
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.project = project;
        this.duedate = duedate
        this.labels = labels;
    }


    updateTask(name, description, priority, project, duedate, labels) {
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.project = project;
        this.duedate = duedate
        this.labels = labels
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

    getAllTasks() {
        return this.tasks;
    }

    getNumberOfTasks() {
        return this.tasks.length;
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

    addTask(task) {
        const date = task.date;
        let day = this.findDay(date);
        if (!day) {
            day = new Day(date);
            this.addDay(day);
        }
        day.addTask(task);
    }

    checkAndRemoveDay(date) {
        let day = this.findDay(date);
        if (day.tasks.length == 0) {
            this.days = this.days.filter(date => date.date !== day.date);
        }
    }

    removeTaskFromDay(day, task) {
        if (day) {
            day.removeTask(task.name);
        }
        this.checkAndRemoveDay(day.date);
        console.log(this.getAllDays());
    }

    getTasksByDay(date) {
        const day = this.findDay(date);
        return day ? day.getTasks() : [];
    }

    getAllDays() {
        return this.days;
    }

    rearrangeDays() {
        this.days.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
        });
    }
}

const todolist = new TodoList();

export { todolist };