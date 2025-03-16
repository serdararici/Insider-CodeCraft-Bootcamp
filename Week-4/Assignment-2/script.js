const API_URL = "https://jsonplaceholder.typicode.com/users";
const JQUERY_URL = "https://code.jquery.com/jquery-3.6.0.min.js";
const USER_STORAGE = "usersData";
const RELOAD_BUTTON_USED = "reloadButtonUsed"; // SessionStorage key

let appendLocation = ".user-list"; 

let errorMessage;

//sessionStorage.clear();  // it is used for testing

(() => {
    const init = () => {
        buildHTML();
        buildCSS();
        setEvents();
    };



    const buildHTML = () => {
        const html = `

            <nav class="navbar">
                <div class="logo">
                     <img src="https://useinsider.com/assets/img/logo-old.png" alt="Logo">
                </div>
        
                <ul class="nav-links">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>

                <div class="profile">
                    <img src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg" alt="Profile">
                </div>

                <div class="hamburger">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
            </nav>


            <div class="user-container">
                <h1 id="user-list-title">User List</h1>
                <div id="error-message" class="error-message"></div>
                <div id="user-list" class="user-list"></div>
                <div class="no-user" style="display: none;">
                    <p class="no-user-message">No users found. Try reloading the users.</p>
                    <button id="reload-users-btn" 
                    style="display: none;">Reload Users</button>
                </div> 
            </div>


            <footer id="contact">
                <p>Designed and developed by <strong>Serdar Arıcı</strong> &copy; 2025. All rights reserved.</p>
            </footer>
        `;
        $("body").append(html);
        
    };


    const buildCSS = () => {
        const css = `
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                min-height: 100vh;
                position: relative;
                justify-content: center;
                align-items: center;
                display: flex; flex-direction: column;
            }

            .navbar {
                display: flex;
                justify-content: space-around;
                width: 100%;
                align-items: center;
                padding: 1rem 2rem;
                background-color: #f8f9fa;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }

            .logo img {
                height: 40px;
            }

            .nav-links {
                display: flex;
                gap: 4rem;
                list-style: none;
            }

            .nav-links a {
                text-decoration: none;
                color: #797979;
                font-weight: 500;
                font-size: 1.2rem;
                transition: color 0.3s ease;
            }

            .nav-links a:hover {
                color: #000000;
                text-decoration-line: underline;
            }

            .nav-links a::after {
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 2px;
                background: #650f0f;
                transform: scaleX(0);
                transition: transform 0.3s;
            }

            .nav-links a:hover::after {
                transform: scaleX(1);
            }

            .profile img {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                cursor: pointer;
            }

            .hamburger {
                display: none;
                cursor: pointer;
            }

            .bar {
                display: block;
                width: 25px;
                height: 3px;
                margin: 5px auto;
                background-color: #333;
                transition: all 0.3s ease;
            }

            .user-container {
                background: #fff;
                display: flex;
                flex-direction: column;
                padding: 20px;
                margin: 120px 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                width: 80%;
                text-align: center;
            }

            #user-list-title {
                font-size: 32px;
                text-decoration: underline;
                margin-bottom: 20px;
            }

            .error-message {
                color: red;
                font-weight: bold;
                display: none;
                margin-bottom: 10px;
            }

            .user-list {
                width: 100%;
                overflow-x: auto;
            }

            .user-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
                min-width: 600px;
            }

            .user-table th, .user-table td {
                border: 1px solid #ddd;
                padding: 10px;
                text-align: left;
                white-space: nowrap;
            }

            .user-table th {
                background-color: #35727e;
                color: white;
            }

            .action-td {
                align-items: center;
                justify-content: center;
                display: flex;
            }

            .user-table tr:nth-child(even) {
                background-color: #f2f2f2;
            }

            .user-table tr:hover {
                background-color: #ddd;
            }

            .delete-btn {
                background: red;
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 5px;
                cursor: pointer;
            }

            .delete-btn:hover {
                background: darkred;
            }

            .no-user-message {
                font-size: 24px;
            }

            #reload-users-btn {
                background: #386caf;
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 18px;
                width: 350px;
                height: 40px;
                margin-top: 20px;
            }

            /* Footer */
            footer {
                background-color: #f8f9fa;
                color: #000000;
                padding: 2rem;
                width: 100%;
                text-align: center;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }

            .social-links {
                margin-top: 1rem;
            }

            .social-links a {
                color: #000000;
                margin: 0 0.5rem;
                font-size: 1.5rem;
                transition: all 0.3s ease;
            }

            .social-links a:hover {
                color: #386caf;
            }

            @media (max-width: 768px) {
                .hamburger {
                    display: block;
                }

                .hamburger.active .bar:nth-child(2) {
                    opacity: 0;
                }

                .hamburger.active .bar:nth-child(1) {
                    transform: translateY(8px) rotate(45deg);
                }

                .hamburger.active .bar:nth-child(3) {
                    transform: translateY(-8px) rotate(-45deg);
                }

                .nav-links {
                    position: fixed;
                    left: -150%;
                    top: 80px;
                    flex-direction: column;
                    background-color: #f8f9fa;
                    width: 100%;
                    text-align: center;
                    transition: left 0.3s ease;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                
                .nav-links.active {
                    left: 0;
                    gap: 2rem;
                }

                .action-td {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

            }
        `;

        $('<style>').addClass('style').html(css).appendTo('head');
    };


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
                    console.log("Datas came from API");
                    resolve(data);
                },
                error: (error) => {
                    errorMessage = $("#error-message");
                    errorMessage.text("Error loading user data!").show();
                    reject(error);
                }
            });
        });
    };
    
    const getUsers = () => {
        const oneDay = 24 * 60 * 60 * 1000;
        //const oneDay = 10000;  // for testing
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

        if (users.length === 0) {

            $(".no-user").show();
            $("#reload-users-btn").show();
            return;
        } else {
            $(".no-user").hide();
            $("#reload-users-btn").hide();
        }

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

    //Added mutationObserver to watchUserList 
    const watchUserList = () => {
        const targetNode = document.querySelector(appendLocation);

        if (!targetNode) {
            console.warn("Target node not found for MutationObserver.");
            return;
        }

        const observer = new MutationObserver(() => {
            console.log("Observe");
            const tableBody = document.querySelector(".user-table tbody");
            if (!tableBody || tableBody.children.length === 0) {
                $(".no-user").show();
                $("#reload-users-btn").show();
            } else{
                $(".no-user").hide();
            }
            
        });

        observer.observe(targetNode, { childList: true, subtree: true });
        
    };

    const setReloadButtonEvent = () => {
        $("#reload-users-btn").on("click", () => {
            if (sessionStorage.getItem(RELOAD_BUTTON_USED) === "true") {
                alert("You have already used this button in this session.");
                return;
            }
            sessionStorage.setItem(RELOAD_BUTTON_USED, "true");
            
            fetchUsers().then(addUsersToList);
            //$("#reload-users-btn").hide();
            
        });
    };
    
    const setEvents = () => {
        getUsers().then(addUsersToList);
        watchUserList();
        setReloadButtonEvent();
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
    })

})();



