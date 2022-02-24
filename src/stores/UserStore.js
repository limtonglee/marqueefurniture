//store user logged in information

import { makeAutoObservable, observable } from "mobx";
import { autorun } from 'mobx'
import { makeLocalStorage } from "./makeLocalStorage.tsx";

//to be edited

class userStore {
  name = "John doe";
  isLoggedIn = false;
  isSeller = false;
  isAdmin = false;
  // userStore.isSeller = false
  // getter no need but setter need 

  constructor() {
    makeAutoObservable(this, {
      name: observable,
      isLoggedIn: observable,
      isSeller: observable,
      isAdmin: observable
    });
    makeLocalStorage(this, 'userStore', ['name', 'isLoggedIn', 'isSeller','isAdmin']);
  }

  setUserName = (name) => {
    this.name = name;
  };
  setIsLoggedIn = () => {
    this.isLoggedIn = true;
  };
  setIsLoggedOut = () => {
    this.isLoggedIn = false;
  };
  setIsSeller = () => {
    this.isSeller = true;
  }

  setIsAdmin = () => {
    this.isAdmin = true;
  }
}

export default userStore;