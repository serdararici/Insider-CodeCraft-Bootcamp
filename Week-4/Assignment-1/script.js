class UserList {
    constructor() {
        this.container = document.querySelector('.ins-api-users');
        this.init();
        this.addStyles();
    }

    addStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            .ins-api-users {
                max-width: 1000px;
                margin: 20px auto;
                font-family: Arial, sans-serif;
            }
            .user-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }
            .user-table th, .user-table td {
                border: 1px solid #ddd;
                padding: 12px;
                text-align: left;
            }
            .user-table th {
                background-color: #f4f4f4;
            }
            .delete-btn {
                background-color: #ff4444;
                color: white;
                border: none;
                padding: 5px 10px;
                cursor: pointer;
                border-radius: 3px;
            }
            .error-message {
                background-color: #ffebee;
                color: #c62828;
                padding: 10px;
                margin: 10px 0;
                border-radius: 4px;
            }
        `;
        document.head.appendChild(styles);
    }

    async init() {
        try {
            const users = await this.getUsers();
            if (users) {
                this.renderUsers(users);
            }
        } catch (error) {
            this.showError('Kullanıcı verileri yüklenirken bir hata oluştu.');
        }
    }

    async getUsers() {
        // localStorage kontrolü
        const stored = localStorage.getItem('users');
        const timestamp = localStorage.getItem('usersTimestamp');
        const now = new Date().getTime();
        const oneDay = 24 * 60 * 60 * 1000;

        if (stored && timestamp && (now - Number(timestamp)) < oneDay) {
            return JSON.parse(stored);
        }

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) throw new Error('API yanıt vermedi');
            
            const users = await response.json();
            
            // localStorage'a kaydet
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('usersTimestamp', now.toString());
            
            return users;
        } catch (error) {
            this.showError('API\'den veri çekilemedi.');
            return null;
        }
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        this.container.appendChild(errorDiv);
    }

    deleteUser(userId) {
        const users = JSON.parse(localStorage.getItem('users'));
        const updatedUsers = users.filter(user => user.id !== userId);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        this.renderUsers(updatedUsers);
    }

    renderUsers(users) {
        this.container.innerHTML = '';
        
        const table = document.createElement('table');
        table.className = 'user-table';
        
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Kullanıcı Adı</th>
                    <th>E-posta</th>
                    <th>Adres</th>
                    <th>İşlemler</th>
                </tr>
            </thead>
            <tbody>
                ${users.map(user => `
                    <tr>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>${user.address.street}, ${user.address.city}</td>
                        <td>
                            <button class="delete-btn" onclick="userList.deleteUser(${user.id})">
                                Sil
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        
        this.container.appendChild(table);
    }
}

// Uygulamayı başlat
const userList = new UserList(); 