document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const filterCompletedButton = document.getElementById('filter-completed');
    let tasks = [];

    // Görev Ekleme
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const priority = document.querySelector('input[name="priority"]:checked')?.value;

        // Form doğrulama
        if (!title || !priority) {
            alert("Başlık ve Öncelik alanlarını doldurmalısınız.");
            return;
        }

        const task = {
            title,
            description,
            priority,
            completed: false,
        };

        tasks.push(task);
        renderTasks();
        taskForm.reset();
    });

    // Görevleri Render Etme
    function renderTasks() {
        taskList.innerHTML = '';

        tasks.forEach((task, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task-item');
            if (task.completed) taskDiv.classList.add('completed');

            taskDiv.innerHTML = `
                <div>
                    <strong>${task.title}</strong>
                    <p>${task.description}</p>
                    <span>Öncelik: ${task.priority}</span>
                </div>
                <div>
                    <button class="complete" onclick="markCompleted(${index})">Tamamla</button>
                    <button class="delete" onclick="deleteTask(${index})">Sil</button>
                </div>
            `;

            taskList.appendChild(taskDiv);
        });
    }

    // Görev Tamamla
    window.markCompleted = function (index) {
        tasks[index].completed = true;
        renderTasks();
    };

    // Görev Sil
    window.deleteTask = function (index) {
        tasks.splice(index, 1);
        renderTasks();
    };

    // Sadece tamamlananları göster
    filterCompletedButton.addEventListener('click', () => {
        const completedTasks = tasks.filter(task => task.completed);
        tasks = completedTasks;
        renderTasks();
    });
});
