$(document).ready(function() {
    $('#applyBtn').click(function() {
        $('#applicationForm').slideDown(500);
        $(this).fadeOut();
    });

    $('#closeBtn').click(function() {
        $('#applicationForm').slideUp(500, function() {
            $('#applyBtn').fadeIn();
        });
        $('#jobForm')[0].reset();
    });
    $('#phone').mask('(9999) 999-99-99');

    $('#startDate').datepicker({
        dateFormat: 'dd/mm/yy',
        minDate: 0
    });

    $('#jobForm').validate({
        rules: {
            firstName: {
                required: true,
                minlength: 2
            },
            lastName: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true
            },
            position: {
                required: true
            }
        },
        messages: {
            firstName: {
                required: "First name is required",
                minlength: "First name must be at least 2 characters long"
            },
            lastName: {
                required: "Last name is required",
                minlength: "Last name must be at least 2 characters long"
            },
            email: {
                required: "Email is required",
                email: "Please enter a valid email address"
            },
            phone: {
                required: "Phone number is required"
            },
            position: {
                required: "Please select a position"
            }
        },
        errorPlacement: function(error, element) {
            error.addClass('error');
            error.insertAfter(element); 
        },
        highlight: function(element) {
            $(element).addClass('input-error'); 
        },
        unhighlight: function(element) {
            $(element).removeClass('input-error'); 
        },
        submitHandler: function(form) {
            $('#applicationForm').slideUp(500, function() {
                $('#applyBtn').fadeIn(1000);
            });

            $('#successMessage').hide().text('Application Submitted Successfully!').fadeIn().delay(3000).fadeOut(1000);
            form.reset();
        }
    });
});
