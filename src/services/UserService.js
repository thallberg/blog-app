const STORAGE_KEY = "loggedInUser";

export const UserService = {

    updateUser: (username, email, password) => {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let currentUser = JSON.parse(localStorage.getItem(STORAGE_KEY));

        if (currentUser) {
            // Uppdatera användardatan
            currentUser.username = username;
            currentUser.email = email;
            currentUser.password = password;

            // Spara tillbaka till localStorage
            localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));

            // Om du vill uppdatera alla användare
            users = users.map(user => user.username === currentUser.username ? currentUser : user);
            localStorage.setItem("users", JSON.stringify(users));
        }
    },


    register: (username, password) => {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        
        if (users.some(user => user.username === username)) {
            return false; // Användarnamnet är redan taget
        }

        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));
        return true;
    },

    login: (username, password) => {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = users.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
            return true;
        }

        return false;
    },

    logout: () => {
        localStorage.removeItem(STORAGE_KEY);
    },

    isAuth: () => {
        return localStorage.getItem(STORAGE_KEY) !== null;
    },

    getUser: () => {
        return JSON.parse(localStorage.getItem(STORAGE_KEY));
    },

   


};

export default UserService;
