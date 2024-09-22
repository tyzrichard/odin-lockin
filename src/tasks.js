class Task {
    constructor(name, description = '', isComplete = false) {
        this.name = name;
        this.description = description;
        this.isComplete = isComplete;
    }
    
    // Complete the task
    completeTask() {
        this.isComplete = true;
    }
}

let tasks = [
    new Task('Learn JavaScript', 'Practice building a to-do list app'),
    new Task('Complete project', 'Finish and deploy the app'),
];

function removeTask(taskName) {
    tasks = tasks.filter(task => task.name !== taskName);
}

// Export tasks array and the removeTask function
export { tasks, removeTask };
