$(document).ready(function() {
    $("#loadProducts").click(function() {
        $("#statusMessage").text("⏳ Loading products...");

        $.ajax({
            url: "products.json",
            type: "GET",
            dataType: "json",
            success: function(products) {
                $("#statusMessage").text(""); 
                $("#productContainer").empty();

                $.each(products, function(index, product) {
                    let productItem = `
                        <div class="product-item">
                            <h2>📱 ${product.name}</h2>
                            <p>${product.price}</p>
                            <a href="${product.link}" target="_blank">🔗 View Product</a>
                        </div>
                    `;
                    $("#productContainer").append(productItem);
                });
            },
            error: function(xhr, status, error) {
                $("#statusMessage").text("⚠️ An error occurred while loading the products: " + error);
            }
        });
    });
});
