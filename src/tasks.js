class Task {
    constructor(name, description = '', priority, project, duedate) {
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.project = project;
        this.duedate = duedate
    }


    updateTask(name, description, priority, project, duedate) {
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.project = project;
        this.duedate = duedate
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

    addTaskToDay(taskInfo) {
        const name = taskInfo[0];
        const desc = taskInfo[1];
        const priority = taskInfo[2];
        const project = taskInfo[3];
        const date = taskInfo[4];
        console.log(date)
        let day = this.findDay(date);
        if (!day) {
            day = new Day(date);
            this.addDay(day);
        }
        const task = new Task(name, desc, priority, project, date);
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
}

const todolist = new TodoList();
// const task1 = ["Task 1", "My first task", '2024-09-26'];
// const task2 = ["Task 2", "My second task", '2024-09-29'];
// const task3 = ["Task 3", "My third task", '2024-09-29'];
// todolist.addTaskToDay(task1);
// todolist.addTaskToDay(task2);
// todolist.addTaskToDay(task3);

export { todolist };