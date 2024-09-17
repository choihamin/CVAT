document.addEventListener('DOMContentLoaded', function() {
    fetchProjects();
    fetchTasks();

    document.getElementById('create-task-form').addEventListener('submit', createTask);
});

function fetchProjects() {
    fetch('/projects')
        .then(response => response.json())
        .then(data => {
            const projectList = document.getElementById('project-list');
            data.results.forEach(project => {
                const li = document.createElement('li');
                li.textContent = project.name;
                projectList.appendChild(li);
            });
        });
}

function fetchTasks() {
    fetch('/tasks')
        .then(response => response.json())
        .then(data => {
            const taskList = document.getElementById('task-list');
            data.results.forEach(task => {
                const li = document.createElement('li');
                li.textContent = task.name;
                taskList.appendChild(li);
            });
        });
}

function createTask(event) {
    event.preventDefault();
    const taskName = document.getElementById('task-name').value;
    fetch('/create_task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: taskName }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Task created:', data);
        fetchTasks();  // Refresh the task list
    });
}