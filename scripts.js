document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.querySelector('#task-form form');
    const taskList = document.querySelector('#task-list ul');

    // Load tasks from local storage
    loadTasks();

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskInput = document.querySelector('#task');
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
            saveTasks();
        }
    });

    function addTask(taskText, completed = false) {
        const li = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
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
            const taskText = li.querySelector('span').textContent;
            const completed = li.querySelector('span').style.textDecoration === 'line-through';
            tasks.push({ taskText, completed });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task.taskText, task.completed));
    }
});


