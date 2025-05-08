import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        username: '',
        loggedIn: false,
        profilePicture: null,
        token: null,
    }),
    actions: {
        onBootLogIn() {
            const token = localStorage.getItem('authToken');
            if (token) {
                this.token = token;
                this.loggedIn = true;
            }
        },
        defaultLogIn(username, profilePicture, token) {
            this.username = username;
            this.profilePicture = profilePicture;
            this.loggedIn = true;
            this.token = token;
        },
        logOut() {
            this.username = '';
            this.profilePicture = null;
            this.loggedIn = false;
            this.token = null;
            localStorage.removeItem('authToken');
        },
    },
});
