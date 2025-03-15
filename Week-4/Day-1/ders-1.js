
/*
 _____          _     _                      _____       _   _                     
|_   _|        (_)   | |                    |  _  |     | | (_)                    
  | | _ __  ___ _  __| | ___ _ __   ______  | | | |_ __ | |_ _ _ __ ___  _   _ ___ 
  | || '_ \/ __| |/ _` |/ _ \ '__| |______| | | | | '_ \| __| | '_ ` _ \| | | / __|
 _| || | | \__ \ | (_| |  __/ |             \ \_/ / |_) | |_| | | | | | | |_| \__ \
 \___/_| |_|___/_|\__,_|\___|_|              \___/| .__/ \__|_|_| |_| |_|\__,_|___/
                                                  | |                              
                                                  |_|                              

                                BootCamp '25 - Lesson 1
*/

//* Değişken Tanımlama (var vs. let ve const)
const age = 26;
age = 32;

const colors = ['red'] ;
colors;
colors.push('black');
colors;

//?-----?//

test1
var test1;
test1 = 2;
test1

test2
let test2;
test2 = 2;
test2

//?-----?//


if (1 === 1) {
    let test3 = 4123;
    test3
}

if (1 === 1) {
    var test4 = 888;
    test4
}

//?-----?//

function example() {
    let variableLet = "example";
    var variableVar = "example";

    console.log('function inner', variableLet);
    console.log('function inner', variableVar);
};

example();

console.log(variableVar);
console.log(variableLet);


//* Template Literals (+ yerine `` kullanımı)

let currentDate = new Date();
let currentHour = currentDate.getHours();
let message = 'Hour: ' + currentHour;
let message2 = `Hour: ${currentHour}`;

//* Arrow Functions (function yerine =>)

function sum(a, b) {
    return a + b;
}

let sumArrow = (a, b) => a + b;

//?-----?//

const person = {
    name: 'Emre',
    sayName: function () {
        console.log(this)
    }
}

person.sayName();

const newFunc = person.sayName;

newFunc();

const person2 = {
    name: 'Walter',
    sayName: () => console.log(this)
}

//?-----?//

function exampleArguments() {
    const firstParameter = arguments[0] ?? 'fallbackValue'
    console.log(`First parameter: ${ firstParameter }`)
}

const restParameters = (...args) => {
    const firstParameter = args[0] ?? 'fallbackValue'
    console.log(`First parameter: ${ firstParameter }`)
}

//?-----?//

function newExample(name) {
    this.name = name;

    this.sayHello = function () {
        console.log(`Hello, my name is ${ this.name }`);
    }
}

const newPerson = new newExample('John Doe'); // ✅ 

newPerson.sayHello();



const arrowNewExample = () => {
    this.name = 'John Doe';

    this.sayHello = () => {
        console.log(`Hello, my name is ${ this.name }`);
    }
}

const arrowNewPerson = new arrowNewExample(); // ❌ TypeError: arrowNewExample is not a constructor

//?-----?//


function User(name) {
    this.name = name;
  }
  
  User.prototype.sayHello = function () {
    return `Hello, ${this.name}`;
  };
  
const newUser = new User("Emre"); // ✅ 
console.log(newUser.sayHello());
  


const UserArrowFunc = (name) => {
    this.name = name;
};
  
UserArrowFunc.prototype.sayHello = function () {
    return `Hello, ${this.name}`;
};
  
const newUser2 = new UserArrowFunc("Emre"); // ❌ TypeError: UserArrowFunc is not a constructor

//?-----?//
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} ses çıkardı.`);
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name); // Üst sınıfın constructor'ını çağırır
        this.breed = breed;
    }
}

const myDog = new Dog("Karabaş", "Kangal");
console.log(myDog.name);  // Karabaş
console.log(myDog.breed); // Kangal



class Animal {
    speak() {
        console.log("Hayvan ses çıkardı.");
    }
}

class Dog extends Animal {
    speak() {
        super.speak(); // Üst sınıftaki speak metodunu çağırır
        console.log("Hav hav!");
    }
}

const myDog = new Dog();
myDog.speak();


//?-----?//
const person1 = { name: "Ali" };
const person2 = { name: "Veli" };

function greet() {
    console.log("Merhaba, " + this.name);
}

const greetAli = greet.bind(person1);
const greetVeli = greet.bind(person2);

greetAli(); // Merhaba, Ali
greetVeli(); // Merhaba, Veli



const person = {
    name: "Emre"
};

function greet() {
    console.log("Merhaba, " + this.name);
}

greet.call(person); // Merhaba, Emre



const users = [
    {
        name: 'Emre',
        age: 26
    }
]
const createUser = (newPerson) => {
    users.push(newPerson)
}

function greetTest(newPerson = {}) {
    switch (String(this)) {
        case 'createUser':
            createUser(newPerson);
            break;
        case 'getUsers':
            console.log(users);
            break;
    
        default:
            console.log('wrong choice');
            break;
    }
}


function test(parameter1, parameter2) {
    debugger;
}

test.call(null, ['parameter1', 25]); 
test.apply(null, ['parameter1', 25]); 

// Eğer yeni bir fonksiyon döndürmek istiyorsan → bind()
// Eğer fonksiyonu hemen çağırıp this bağlamını değiştirmek istiyorsan → call()
// Eğer fonksiyonu hemen çağırıp ama parametreleri dizi olarak vermek istiyorsan → apply()

//* import export

export function add(a, b) {
    return a + b;
}

import { add } from "./math.js";
console.log(add(2, 3)); // 5


//* fetch
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(response => response.json())
  .then(user => console.log("👤 Kullanıcı:", user))
  .catch(error => console.error("🚨 Hata:", error));


//* DOM API
document.getElementById("btn").addEventListener("click", () => {
    document.getElementById("text").textContent = "Butona tıkladın!";
});

document.getElementById("test_button").addEventListener("click", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const user = await response.json();
    document.getElementById("userInfo").textContent = `👤 Ad: ${user.name}, 📧 Email: ${user.email}`;
});
  
//* localStorage - sessionStorage (Web API)
localStorage.setItem('test', 'asd')
localStorage.getItem('test')
localStorage.removeItem('test')
localStorage.key('test')
localStorage.clear()
//?-----?//

if (!("Notification" in window)) {
    console.error("Tarayıcı Notification API'yi desteklemiyor!");
} else {
    console.log("Notification API destekleniyor 🚀");
}



const requestNotificationPermission = async () => {
    if (Notification.permission === "granted") {
        console.log("Bildirim izni zaten verilmiş.");
        return;
    }

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
        console.log("Bildirim izni verildi.");
    } else {
        console.log("Bildirim izni reddedildi.");
    }
};

requestNotificationPermission();



const showInteractiveNotification = () => {
    if (Notification.permission === "granted") {
        const notification = new Notification("Tıklanabilir Bildirim 🚀", {
            body: "Beni tıkla!",
            icon: "https://via.placeholder.com/128"
        });

        notification.onclick = () => {
            window.open("https://www.google.com", "_blank");
        };
    }
};

showInteractiveNotification();

//?-----?//
window.addEventListener("orientationchange", () => {
    console.log('cihaz döndü');
});


//?-----?//
navigator.getBattery().then(battery => {
    console.log(`Pil Seviyesi: ${battery.level * 100}%`);
    console.log(`Şarj Durumu: ${battery.charging ? "Şarj Ediliyor" : "Şarj Edilmiyor"}`);
});


//?-----?//
const recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.lang = "tr-TR";

recognition.onstart = () => console.log("Ses tanıma başladı...");
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log("Algılanan metin:", transcript);
};
recognition.onerror = (event) => console.error("Hata:", event.error);
recognition.onend = () => console.log("Ses tanıma bitti.");

//-
recognition.start();