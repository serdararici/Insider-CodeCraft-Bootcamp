$(document).ready(function() {
    $('#addTaskBtn').on('click', function() {
        let taskText = $('#taskInput').val().trim();
        
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }
        
        let li = $('<li></li>');

        // Checkbox ekleme
        let checkbox = $('<input type="checkbox" class="task-checkbox">');

        let taskTextSpan = $('<span class="task-text"></span>').text(taskText);
        
        let buttonsDiv = $('<div class="buttons"></div>');
        
        let deleteBtn = $('<button class="delete-btn"></button>').text('Delete');
        
        buttonsDiv.append(deleteBtn);
        
        li.append(checkbox, taskTextSpan, buttonsDiv);

        // Silme işlemi
        deleteBtn.on('click', function() {
            li.remove(); 
        });

        // Checkbox değiştiğinde görev tamamlandı olarak işaretle
        checkbox.on('change', function() {
            if (checkbox.is(':checked')) {
                li.addClass('completed');
            } else {
                li.removeClass('completed');
            }
        });

        $('#taskList').append(li);
        $('#taskInput').val('');
    });

    // Enter tuşu ile görev ekleme
    $('#taskInput').keypress(function(event) {
        if (event.key === 'Enter') {
            $('#addTaskBtn').click();
        }
    });
});
