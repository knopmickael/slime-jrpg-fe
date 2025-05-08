import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        username: '',
        loggedIn: false,
        profilePicture: null,
    }),
    actions: {
        logIn(username, profilePicture) {
            this.username = username;
            this.profilePicture = profilePicture;
            this.loggedIn = true;
        },
        logOut() {
            this.username = '';
            this.profilePicture = null;
            this.loggedIn = false;
        },
    },
});
