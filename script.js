document.addEventListener('DOMContentLoaded', function() {
    const markCompleteButton = document.getElementById('mark-complete-button');
    const deleteTaskButton = document.getElementById('delete-task-button');
    const taskFilterDropdown = document.getElementById('task-filter-dropdown');
    const taskListFiltered = document.getElementById('task-list-filtered').querySelector('tbody');

    // Sample tasks data
    const tasks = [
        { id: 1, name: 'Task 1', status: 'pending' },
        { id: 2, name: 'Task 2', status: 'completed' },
        { id: 3, name: 'Task 3', status: 'pending' }
    ];

    function renderTasks(filter = 'all') {
        taskListFiltered.innerHTML = '';
        const filteredTasks = tasks.filter(task => filter === 'all' || task.status === filter);
        filteredTasks.forEach(task => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${task.name}</td><td>${task.status}</td>`;
            taskListFiltered.appendChild(row);
        });
    }

    markCompleteButton.addEventListener('click', function() {
        tasks.forEach(task => {
            if (task.status === 'pending') {
                task.status = 'completed';
            }
        });
        renderTasks(taskFilterDropdown.value);
    });

    deleteTaskButton.addEventListener('click', function() {
        const remainingTasks = tasks.filter(task => task.status !== 'completed');
        tasks.length = 0;
        tasks.push(...remainingTasks);
        renderTasks(taskFilterDropdown.value);
    });

    taskFilterDropdown.addEventListener('change', function() {
        renderTasks(this.value);
    });

    renderTasks();
});