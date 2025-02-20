import { defineStore } from 'pinia';
import { User } from "../classes/User";

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    nextId: 1,
    savedUsers: [] as User[],
    validatedUsers: [] as User[],
  }),
  getters: {
    getAllUsers: (state) => state.users,
    getUserById: (state) => (id: number) => state.users.find((user) => user.id === id),
  },
  actions: {
    addUser(user: Omit<User, 'id'>) {
      const newUser = { ...user, _id: this.nextId++ };
      this.users = [...this.users, newUser];
    },
    removeUser(id: number) {
      this.users = this.users.filter((user) => user._id !== id);
      this.saveToLocalStorage();
    },
    updateUser(updatedUser: User) {
      this.users = this.users.map(user => user._id === updatedUser._id ? updatedUser : user);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      this.validatedUsers = this.users.filter(user => {
        if (user instanceof User) {
          return user.validate(user).isValid;
        } else {
          try {
            const userInstance = new User(user._id, user._login, user._userType, user._password);
            return userInstance.validate(userInstance).isValid;
          } catch {
            return false;
          }
        }
      });
      const users = localStorage.getItem('users');

      if (users) {
        this.savedUsers = JSON.parse(users);
        console.log("savedUsers");
        console.log(this.savedUsers);

        const usersWithoutValidation = this.savedUsers.filter(dbItem => {
          return !this.validatedUsers.find(validItem => validItem._id === dbItem._id);
        });
        console.log("usersWithoutValidation");
        console.log(usersWithoutValidation);
        console.log("validatedUsers");
        console.log(this.validatedUsers);
        //console.log([...this.validatedUsers, ...usersWithoutValidation]);
        localStorage.setItem('users', JSON.stringify([...this.validatedUsers, ...usersWithoutValidation]));
      } else {
        localStorage.setItem('users', JSON.stringify(this.validatedUsers));
      }
      localStorage.setItem('nextId', this.nextId.toString());
    },
    loadFromLocalStorage() {
      const users = localStorage.getItem('users');
      const nextId = localStorage.getItem('nextId');

      if (users) {
        this.users = JSON.parse(users);
      }
      if (nextId) {
        this.nextId = parseInt(nextId, 10);
      }
    },
  },
});
