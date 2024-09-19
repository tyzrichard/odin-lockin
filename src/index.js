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

const today = new Day('2024-09-19');
const task1 = new Task("task 1", "my first task", 3, 'My Tasks', '2024-09-20', ["hw", "test"]);
const task2 = new Task("task 2", "my second task", 1, 'My Tasks', '2024-09-22', ["hw", "important"]);
today.addTask(task1);
today.addTask(task2);
console.log('All tasks:', today.getIncompleteTasks());
task1.completeTask();
console.log('All tasks:', today.getIncompleteTasks());
today.removeTask("task 2");
console.log('All tasks:', today.getIncompleteTasks());