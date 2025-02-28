// get user information
const userInfo = {
    name: getUserInput('Adınız nedir?'),
    age: getUserInput('Yaşınız kaç?', true),
    job: getUserInput('Mesleğiniz nedir?')
};

if (userInfo.name === null || userInfo.age === null || userInfo.job === null) {
    console.log('Kullanıcı bilgileri tamamlanamadı.');
} else {
    // show user information
    console.log('--- Kullanıcı Bilgileri ---');
    console.log(`Adınız nedir?: ${userInfo.name}`);
    console.log(`Yaşınız kaç?: ${userInfo.age}`);
    console.log(`Mesleğiniz nedir?: ${userInfo.job}`);
    console.log(`Kullanıcı Bilgileri: : ${JSON.stringify(userInfo)}`);
    console.log('--------------------------\n');
}

function getUserInput(question, isNumber = false) {
    let input = prompt(question);

    if (input === null) {
        console.log('İptal edildi!');
        return null;
    }

    if (isNumber) {
        input = parseInt(input);
        if (isNaN(input)) {
            console.log('Geçersiz giriş! Lütfen geçerli bir sayı girin.');
            return getUserInput(question, isNumber);
        }
    }

    return input;
}

// cart application
let cart = [];


while (true) {
    let choice = prompt("Sepete ürün eklemek istiyor musunuz? (y/n)");
    if (choice === null) {
        console.log('İşlem iptal edildi!');
        displayCart();
        break;
    }; // cancel
    choice = choice.toLowerCase(); // convert to lowercase

    if (choice === 'y') {
        addProduct();
    } else if (choice === 'n') {
        displayCart();
        break;
    } else {
        console.log("Geçersiz giriş! 'y' veya 'n' giriniz.");
    }
}



// add product to cart
function addProduct() {
    const productName = prompt('Sepete eklemek istediğiniz ürünü yazın:');
    if (!productName) return; // empty string or cancel
    let productPrice = parseFloat(prompt('Ürünün fiyatı:'));

    while (isNaN(productPrice) || productPrice <= 0) {
        console.log('Hata: Geçerli bir fiyat giriniz!');
        productPrice = parseFloat(prompt('Ürünün fiyatı:'));
    }

    cart.push({
        product: productName,
        price: productPrice
    });

    console.log(`*** ${productName} ürünü spete eklendi. Fiyat: ${productPrice} ₺ ***`);
} 


// remove product from cart
function removeProduct(index) {
    if (index >= 0 && index < cart.length) {
        const removedItem = cart.splice(index, 1)[0];
        console.log(`"${removedItem.product}" sepetten çıkarıldı`);
        displayCart();
    } else if (cart.length === 0) {
        console.log('Sepetiniz boş! Önce ürün ekleyin.');
    } else {
        console.log('Geçersiz ürün indeksi!');
    }
}

// calculate total price
function calculateTotal() {
    return cart.reduce((total, item) => total + item.price, 0);
}

// display cart
function displayCart() {

    console.log('\n--- Alışverişiniz tamamlandı .Sepetinizdeki Ürünler ---');
    if (cart.length === 0) {
        console.log('Sepetiniz boş!');
    } else {
        cart.forEach((item, index) => {
            console.log(`${index}. ${item.product} - ${item.price} ₺`);
        });
        console.log('--------------------------');
        console.log(`Toplam Fiyat: ${calculateTotal()} ₺`);
    }
    console.log('--------------------------\n');
}

// usage instructionsb
console.log('\nKullanım Talimatları:');
console.log('- Ürün eklemek için: addProduct()');
console.log('- Ürün çıkarmak için: removeProduct(index)');
console.log('- Sepeti görüntülemek için: displayCart()');
console.log("Örnek: addProduct() yazıp Enter'a basın\n");

