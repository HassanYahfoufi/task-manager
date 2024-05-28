document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.querySelector('#task-form form');
    const taskList = document.querySelector('#task-list ul');

    loadTasks();

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskInput = document.querySelector('#task');
        const categoryInput = document.querySelector('#category');
        const dueDateInput = document.querySelector('#due-date');
        const taskText = taskInput.value.trim();
        const category = categoryInput.value;
        const dueDate = dueDateInput.value;

        if (taskText !== '' && dueDate !== '') {
            addTask(taskText, category, dueDate);
            taskInput.value = '';
            saveTasks();
        }
    });

    function addTask(taskText, category, dueDate, completed = false) {
        const li = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = `${taskText} [${category}] (Due: ${dueDate})`;
        if (completed) {
            taskSpan.style.textDecoration = 'line-through';
        }
        li.appendChild(taskSpan);

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', function() {
            taskSpan.style.textDecoration = taskSpan.style.textDecoration === 'line-through' ? 'none' : 'line-through';
            saveTasks();
        });
        li.appendChild(completeButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(li);
            saveTasks();
        });
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            const taskText = li.querySelector('span').textContent.split(' [')[0];
            const category = li.querySelector('span').textContent.split(' [')[1].split('] (Due: ')[0];
            const dueDate = li.querySelector('span').textContent.split(' (Due: ')[1].slice(0, -1);
            const completed = li.querySelector('span').style.textDecoration === 'line-through';
            tasks.push({ taskText, category, dueDate, completed });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task.taskText, task.category, task.dueDate, task.completed));
    }
});


