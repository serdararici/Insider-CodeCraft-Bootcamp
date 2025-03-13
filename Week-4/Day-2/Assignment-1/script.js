

const fetchUsers = () => {
    return new Promise((resolve, reject) => {
        fetch("https://jsonplaceholder.typicode.com/users")
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
        })
        .catch(error => reject(error));
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

const deleteUsers = (id) => {
    const storedData = localStorage.getItem("usersData");

    if(storedData) {
        let parseData = JSON.parse(storedData);
        parseData.user = parseData.users.filter(user => users.id !== id);
        localStorage.setItem("usersData", JSON.stringify(parseData));
        console.log(`User ID: ${id} deleted!`);
    }
};


getUsers()
    .then(users => console.log('Users: ', users))
    .catch(error => console.log('error: ', error));
