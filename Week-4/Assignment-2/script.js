const API_URL = "https://jsonplaceholder.typicode.com/users";
const JQUERY_URL = "https://code.jquery.com/jquery-3.6.0.min.js";
const USER_STORAGE = "usersData";

const appendLocation = ".user-list"; 

let errorMessage;

(() => {
    const init = () => {
        buildHTML();
        errorMessage = $("#error-message");
        setEvents();
    };



    const buildHTML = () => {
        const html = `
            <div class="user-container">
                <h1>User List</h1>
                <div id="error-message" class="error-message"></div>
                <div id="user-list" class="user-list"></div>
            </div>
        `;
        $("body").append(html);
    };

    /*
    const buildCSS = () => {
        const css = `
            .container {
                background-color: red;
                height: 100px;
                width: 100px;
            }
        `;

        $('<style>').addClass('carousel-style').html(css).appendTo('head');
    };
    */

    const fetchUsers = () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: API_URL,
                method: "GET",
                success: (data) => {
                    const storedData = {
                        users: data,
                        timeStamp: Date.now()
                    };
                    localStorage.setItem(USER_STORAGE, JSON.stringify(storedData));
                    resolve(data);
                },
                error: (error) => {
                    errorMessage.text("Error loading user data!").show();
                    reject(error);
                }
            });
        });
    };

    const getUsers = () => {
        const oneDay = 24 * 60 * 60 * 1000;
        const storedData = localStorage.getItem(USER_STORAGE);

        if (storedData) {
            const parsedData = JSON.parse(storedData);
            if (Date.now() - parsedData.timeStamp < oneDay) {
                console.log("Datas came from localStorage");
                console.log(parsedData.users);
                return Promise.resolve(parsedData.users);
            }
        }

        console.log("Data fetching from API...");
        return fetchUsers();
    };

    const addUsersToList = (users) => {
        const usersList = $(appendLocation);
        usersList.html("");

        const userTable = $("<table>").addClass("user-table");

        const tableHtml = `
            <thead>
                <tr>
                    <th>User Name</th>
                    <th>E-mail</th>
                    <th>Address</th>
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
        
        userTable.html(tableHtml);
        usersList.append(userTable);

        $(".delete-btn").click(function(event) {
            const userId = parseInt($(this).data("id"));
            deleteUser(userId);
        });
    };

    const deleteUser = (id) => {
        const storedData = localStorage.getItem(USER_STORAGE);

        if (storedData) {
            let parseData = JSON.parse(storedData);
            parseData.users = parseData.users.filter(user => user.id !== id);
            localStorage.setItem(USER_STORAGE, JSON.stringify(parseData));
            console.log(`User ID: ${id} deleted!`);
            getUsers().then(addUsersToList);
        }
    };
    
    const setEvents = () => {
        getUsers().then(addUsersToList);
    };


    const ensureJQuery = (callback) => {
        if (window.jQuery) {
            $(document).ready(callback);
        } else {
            let script = document.createElement("script");
            script.src = JQUERY_URL;
            script.onload = () => $(document).ready(callback);
            document.head.appendChild(script);
        }
    };

    ensureJQuery(() => {
        init();
    });

})();



