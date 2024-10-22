import { isPast, isToday, isWithinInterval, addDays } from 'date-fns';

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

    getTasksWithLabel(labelName) {
        let tasksWithLabel = []
        tasksWithLabel = this.tasks.filter(task =>
            task.labels.some(label => label[0] === labelName) // label[0] referring to the label's name.
        );
        return tasksWithLabel.length;
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

    removeTaskFromDayByName(dayName, taskName) {
        const day = this.findDay(dayName);
        if (day) {
            day.removeTask(taskName);
        }
        this.checkAndRemoveDay(day.date);
    }

    removeTaskFromDay(day, task) {
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

    rearrangeDays() {
        this.days.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
        });
    }

    filterFutureDates() {
        return this.days.filter(day => {
            return (isToday(day.date)) || !(isPast(day.date));
        });
    }

    filterFutureSevenDates() {
        const isDateInNext7Days = (date) => {
            const today = new Date();
            const in7Days = addDays(today, 7);

            return isWithinInterval(date, {
                start: today,
                end: in7Days,
            });
        };
        return this.filterFutureDates().filter(day => {
            return (isToday(day.date) || isDateInNext7Days(day.date));
        })
    }

    filterPastDates() {
        return this.days.filter(day => {
            return (isPast(day.date)) && !(isToday(day.date));
        });
    }

    getNumberOfTasksWithLabel(labelName) {
        let tasksWithLabel = 0
        this.days.forEach(day => {
            tasksWithLabel += day.getTasksWithLabel(labelName)
        })
        return tasksWithLabel;
    }

}

const todolist = new TodoList();

export { todolist };