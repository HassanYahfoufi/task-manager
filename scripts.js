document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.querySelector('#task-form form');
    const taskList = document.querySelector('#task-list ul');

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskInput = document.querySelector('#task');
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const li = document.createElement('li');
            li.textContent = taskText;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function() {
                taskList.removeChild(li);
            });

            li.appendChild(deleteButton);
            taskList.appendChild(li);
            taskInput.value = '';
        }
    });
});

