$(document).ready(function() {
    $('<style>')
        .text(`
            .title {
                text-align: center;
                font-size: 24px;
                width: 50%;
                margin: 0 auto;
                margin-top: 20px;
                color: #2c3e50;
                border-bottom: 2px solid #2c3e50;
                padding: 10px;
            }
            .product-container {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                padding: 20px;
                width: 90%;
                max-width: 1200px;
                margin: 0 auto;
            }
            .product-card {
                background: white;
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .product-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                background:rgb(232, 234, 210);
            }
            .product-name {
                color: #2c3e50;
                font-size: 1.2em;
                margin: 10px 0;
                font-weight: 500;
            }
            .product-price {
                color:rgb(211, 110, 15);
                font-weight: bold;
                font-size: 1.1em;
                margin: 5px 0;
            }
            .product-link {
                display: inline-block;
                margin-top: 10px;
                padding: 8px 15px;
                background-color: #2c3e50;
                color: #ecf0f1;
                text-decoration: none;
                border-radius: 5px;
                transition: background-color 0.3s;
            }
            .product-link:hover {
                background-color: #52a6de;
            }
            .popup-overlay {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.7);
                z-index: 1001;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .popup-content {
                background: white;
                padding: 30px;
                border-radius: 8px;
                max-width: 500px;
                width: 90%;
                position: relative;
                animation: popupIn 0.3s ease-out;
            }
            @keyframes popupIn {
                from {
                    transform: scale(0.8);
                    opacity: 0;
                }
                to {
                    transform: scale(1);
                    opacity: 1;
                }
            }
            .close-btn {
                position: absolute;
                top: 15px;
                right: 15px;
                font-size: 24px;
                cursor: pointer;
                color: #2c3e50;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: #f4f4f4;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }
            .close-btn:hover {
                background: #e0e0e0;
                transform: rotate(90deg);
            }
            .popup-content h2 {
                color: #2c3e50;
                margin-bottom: 20px;
                font-size: 24px;
            }
            .popup-content p {
                margin: 15px 0;
                line-height: 1.6;
                color: #555;
            }
            .popup-content .product-link {
                margin-top: 20px;
            }
            @media (max-width: 768px) {
                .product-container {
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                }
            }
        `)
        .appendTo('head');

    $('.menu-toggle').click(function() {
        $('.nav-links').toggleClass('active');
    });

    $.ajax({
        url: 'products.json',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            data.products.forEach(function(product) {
                const productCard = $('<div>')
                    .addClass('product-card')
                    .append(
                        $('<h3>').addClass('product-name').text(product.name),
                        $('<p>').addClass('product-price').text(`$${product.price.toFixed(2)}`),
                        $('<a>')
                            .addClass('product-link')
                            .attr('href', product.link)
                            .attr('target', '_blank')
                            .text('View Product')
                    )
                    .click(function(e) {
                        if (!$(e.target).is('a')) {
                            showPopup(product);
                        }
                    });

                $('#dynamic-content').append(productCard);
            });
        },
        error: function(xhr, status, error) {
            $('#dynamic-content').html('<p>Error loading products. Please try again later.</p>');
            console.error('Error loading products:', error);
        }
    });

    function showPopup(product) {
        $('.popup-overlay').remove();

        const $overlay = $('<div>')
            .addClass('popup-overlay')
            .html(`
                <div class="popup-content">
                    <span class="close-btn">×</span>
                    <h2>${product.name}</h2>
                    <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                    <p><strong>Details:</strong> ${product.details}</p>
                    <a href="${product.link}" target="_blank" class="product-link">Visit Product Page</a>
                </div>
            `)
            .appendTo('body');

        $overlay.hide().fadeIn(300);

        $('.popup-overlay').on('click', function(e) {
            if ($(e.target).hasClass('popup-overlay')) {
                $(this).fadeOut(300, function() {
                    $(this).remove();
                });
            }
        });

        $('.close-btn').on('click', function() {
            $('.popup-overlay').fadeOut(300, function() {
                $(this).remove();
            });
        });
    }
});