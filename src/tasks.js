class Task {
    constructor(name, description = '', duedate, isComplete = false) {
        this.name = name;
        this.description = description;
        this.duedate = duedate
        this.isComplete = isComplete;
    }

    // Complete the task
    completeTask() {
        this.isComplete = true;
    }

    updateTask(name, description, duedate) {
        this.name = name;
        this.description = description;
        this.duedate = duedate;
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
        const date = taskInfo[2];
        let day = this.findDay(date);
        if (!day) {
            day = new Day(date);
            this.addDay(day);
        }
        const task = new Task(name, desc, date);
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
const task1 = ["task 1", "my first task", '2024-09-28'];
const task2 = ["task 2", "my second task", '2024-09-22'];
const task3 = ["task 2", "my third task", '2024-09-29'];
todolist.addTaskToDay(task3);
todolist.addTaskToDay(task1);
todolist.addTaskToDay(task2);


// function addTask(taskName, desc, duedate) {
//     const newTask = new Task(taskName, desc, duedate);
//     tasks.push(newTask);
//     console.log(tasks)
// }

// function removeTask(taskName) {
//     todolist = tasks.filter(task => task.name !== taskName);
// }

// Export tasks array and the removeTask function
export { todolist };


// // Todolist Logic

// class Task {
//     constructor(name, description = '', priority = 4, project = 'My Tasks', duedate, labels = [], isComplete = false){
//         this.name = name;
//         this.description = description;
//         this.priority = priority;
//         this.project = project;
//         this.duedate = duedate;
//         this.labels = labels;
//         this.isComplete = isComplete;
//     }

//     completeTask() {
//         this.isComplete = true;
//     }

//     updateTask(name, description, priority, project, duedate, labels){
//         this.name = name;
//         this.description = description;
//         this.priority = priority;
//         this.project = project;
//         this.duedate = duedate;
//         this.labels = labels;
//     }
// }

// class Day {
//     constructor(date) {
//         this.date = date;
//         this.tasks = [];
//     }

//     addTask(task) {
//         this.tasks.push(task);
//     }

//     removeTask(taskName) {
//         this.tasks = this.tasks.filter(task => task.name !== taskName);
//     }

//     getTasks() {
//         return this.tasks;
//     }

//     getIncompleteTasks() {
//         return this.tasks.filter(task => !task.isComplete);
//     }
// }

// class TodoList {
//     constructor() {
//         this.days = [];  
//     }

//     addDay(day) {
//         this.days.push(day);
//     }

//     findDay(date) {
//         return this.days.find(day => day.date === date);
//     }

//     addTaskToDay(date, task) {
//         let day = this.findDay(date);
//         if (!day) {
//             day = new Day(date);
//             this.addDay(day);
//         }
//         day.addTask(task);
//     }

//     checkAndRemoveDay(date) {
//         let day = this.findDay(date);
//         if (day.tasks.length == 0){
//             this.days = this.days.filter(date => date.date !== day.date);
//         }
//     }

//     removeTaskFromDay(date, task) {
//         let day = this.findDay(date);
//         if (day) {
//             day.removeTask(task.name);
//         }
//         this.checkAndRemoveDay(day.date);
//     }

//     getTasksByDay(date) {
//         const day = this.findDay(date);
//         return day ? day.getTasks() : [];
//     }

//     getAllDays() {
//         return this.days;
//     }
// }


// const todoList = new TodoList();
// const task1 = new Task("task 1", "my first task", 3, 'My Tasks', '2024-09-20', ["hw", "test"]);
// const task2 = new Task("task 2", "my second task", 1, 'My Tasks', '2024-09-22', ["hw", "important"]);
// todoList.addTaskToDay(task1.duedate, task1);
// todoList.addTaskToDay(task2.duedate, task2);
// todoList.removeTaskFromDay(task2.duedate, task2);


// // Get tasks for a specific day
// const tasksForToday = todoList.getTasksByDay('2024-09-20');
// console.log('Tasks for 2024-09-20:', tasksForToday);

// // Get all tasks across all days
// const allDays = todoList.getAllDays();
// console.log('All days in the todo list:', allDays);

