document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const filterCompletedButton = document.getElementById('filter-completed');
    const sortOrderSelect = document.getElementById('sort-order');

    let tasks = [];
    let isFilteringCompleted = false;

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addTask();
    });

    renderTasks();
    
    taskList.addEventListener('click', function (e) {
        const target = e.target;
        
        if (target.classList.contains('complete')) {
            e.stopPropagation();  
            toggleTaskCompletion(target.dataset.id); 
        } else if (target.classList.contains('delete')) {
            e.stopPropagation();  
            deleteTask(target.dataset.id);
        }
    });

    filterCompletedButton.addEventListener('click', () => {
        isFilteringCompleted = !isFilteringCompleted;

        if (isFilteringCompleted) {
            filterCompletedButton.textContent = "Show All";
            filterCompletedButton.style.backgroundColor = "red";
        } else {
            filterCompletedButton.textContent = "Show Completed";
            filterCompletedButton.style.backgroundColor = "#0e9717";
        }

        renderTasks();
    });

    // Sort order change listener
    sortOrderSelect.addEventListener('change', () => {
        renderTasks();
    });

    function addTask() {
        const titleInput = document.getElementById('title');
        const descriptionInput = document.getElementById('description');
        const priorityInput = document.querySelector('input[name="priority"]:checked');

        try {
            if (!titleInput.value || !priorityInput) {
                throw new Error("You must provide a title and select a priority!");
            }
        } catch (error) {
            alert(error.message);
            return;
        }

        const newTask = {
            id: generateUniqueId(),
            title: titleInput.value.trim(),
            description: descriptionInput.value.trim(),
            priority: priorityInput.value,
            completed: false
        };

        tasks.push(newTask);
        renderTasks();
        taskForm.reset();
    }

    function renderTasks() {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        let sortedTasks = [...tasks];
        if (sortOrderSelect.value === "low-to-high") {
            sortedTasks.sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority));
        } else {
            sortedTasks.sort((a, b) => priorityValue(b.priority) - priorityValue(a.priority));
        }

        if (isFilteringCompleted) {
            sortedTasks = sortedTasks.filter(task => task.completed);
        }

        if (tasks.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = "No tasks added yet.";
            emptyMessage.classList.add('empty-message');
            taskList.appendChild(emptyMessage);
            return;
        }

        sortedTasks.forEach((task) => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task-item');
            if (task.completed) taskDiv.classList.add('completed');

            const taskTitle = document.createElement('strong');
            taskTitle.textContent = task.title;

            const taskDesc = document.createElement('p');
            taskDesc.textContent = task.description;

            const taskPriority = document.createElement('span');
            taskPriority.textContent = `Priority: ${task.priority}`;

            const buttonContainer = document.createElement('div');

            const completeButton = document.createElement('button');
            completeButton.textContent = task.completed ? 'Undo' : 'Complete';
            completeButton.classList.add('complete');
            completeButton.dataset.id = task.id; 

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete');
            deleteButton.dataset.id = task.id;

            buttonContainer.appendChild(completeButton);
            buttonContainer.appendChild(deleteButton);

            taskDiv.appendChild(taskTitle);
            taskDiv.appendChild(taskDesc);
            taskDiv.appendChild(taskPriority);
            taskDiv.appendChild(buttonContainer);

            taskList.appendChild(taskDiv);
        });
    }

    function toggleTaskCompletion(id) {
        const task = tasks.find(task => task.id === id);
        task.completed = !task.completed;
        renderTasks();
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }

    function generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9); // Generate a simple unique ID
    }

    function priorityValue(priority) {
        if (priority === "Low") return 1;
        if (priority === "Medium") return 2;
        if (priority === "High") return 3;
        return 0;
    }
});
