const API_URL = "https://jsonplaceholder.typicode.com/users";

const usersList = document.querySelector(".user-list");
const errorMessage = document.getElementById("error-message");

const fetchUsers = () => {
    return new Promise((resolve, reject) => {
        fetch(API_URL)
        .then(response => {
            if(!response.ok) {
                throw new Error(`HTTP Error! Status Code: ${response.status}`)
            } 
            return response.json();
        })
        .then(data => {
            const storedData = {
                users: data,
                timeStamp: Date.now()
            };
            localStorage.setItem("usersData", JSON.stringify(storedData));
            resolve(data);
        })
        .catch(error => {
            errorMessage.textContent = "Error loading user data!";
            errorMessage.style.display = "block";
            reject(error);
        });
    });
};

const getUsers = () => {
    const oneDay = 24 * 60 * 60 *1000;
    const storedData = localStorage.getItem("usersData");

    if(storedData) {
        const parsedData = JSON.parse(storedData);
        if(Date.now() - parsedData.timeStamp < oneDay) {
            console.log("Datas came from localStorage");
            return Promise.resolve(parsedData.users);
        }
    }

    console.log("Data fetching from API...")
    return fetchUsers();
};

const addUsersToList = (users) => {
    usersList.innerHTML = "";

    const userTable = document.createElement('table');
    userTable.classList.add("user-table");


    userTable.innerHTML = `
        <thead>
            <tr>
                <th>User Name</th>
                <th>E-mail</th>
                <th>Adress</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            ${users.map(user => `
                <tr>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.address.street}, ${user.address.city}</td>
                    <td class="action-td">
                        <button class="delete-btn" data-id="${user.id}">
                            Delete
                        </button>
                    </td>
                </tr>
            `).join('')}
        </tbody>
    `;

    usersList.appendChild(userTable);

    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            event.stopPropagation();
            const userId = parseInt(event.target.getAttribute("data-id"));
            deleteUser(userId);
        });
    });
}

const deleteUser = (id) => {
    const storedData = localStorage.getItem("usersData");

    if(storedData) {
        let parseData = JSON.parse(storedData);
        parseData.users = parseData.users.filter(user => user.id !== id);
        localStorage.setItem("usersData", JSON.stringify(parseData));
        console.log(`User ID: ${id} deleted!`);
        getUsers().then(addUsersToList);
    }
};


getUsers()
    .then(addUsersToList)
    .catch(error => console.log("Error:", error));



    /*Hamburger menu*/
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("active");
    });

    document.addEventListener("click", function (event) {
        if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove("active");
            hamburger.classList.remove("active");
        }
    });