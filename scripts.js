document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.querySelector('#task-form form');
    const taskList = document.querySelector('#task-list ul');

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskInput = document.querySelector('#task');
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const li = document.createElement('li');
            const taskSpan = document.createElement('span');
            taskSpan.textContent = taskText;
            li.appendChild(taskSpan);

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.addEventListener('click', function() {
                taskSpan.style.textDecoration = taskSpan.style.textDecoration === 'line-through' ? 'none' : 'line-through';
            });
            li.appendChild(completeButton);

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


