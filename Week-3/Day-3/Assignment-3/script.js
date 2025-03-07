$(document).ready(function() {
    // Başvuru Yap butonuna tıklandığında formu göster
    $('#applyBtn').click(function() {
        $('#applicationForm').fadeIn();
        $(this).hide();
    });

    // Kapatma butonuna tıklandığında formu gizle
    $('#closeBtn').click(function() {
        $('#applicationForm').fadeOut();
        $('#applyBtn').show();
    });

    // Telefon numarasına maske ekleyelim
    $('#phone').mask('(9999) 999-99-99');  // Amerikan formatında telefon numarası

    // Tarih seçici (datepicker) ekleyelim
    $('#startDate').datepicker({
        dateFormat: 'yy-mm-dd',
        minDate: 0 // Bugünden önceki tarihler seçilemesin
    });

    // Formu doğrulama işlemi
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
                required: true,
                phoneTR: true  // Masked input ile daha fazla doğrulama yapar
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
                required: "Phone number is required",
                phoneUS: "Please enter a valid phone number"
            },
            position: {
                required: "Please select a position"
            }
        },
        submitHandler: function(form) {
            // Başarı mesajını göster
            $('#successMessage').fadeIn().delay(3000).fadeOut(); // 3 saniye sonra kaybolacak
            // Formu gönder (gerçekten bir sunucuya göndermek isterseniz burada ajax kullanabilirsiniz)
            form.reset();
        }
    });
});
