//store user logged in information

import { makeAutoObservable } from "mobx";

//to be edited

class userStore {
  name = "";
  isLoggedIn = false;
  isSeller = false;
  isAdmin = false;
  userWebLink = "";
  // userStore.isSeller = false
  // getter no need but setter need 

  constructor() {
    makeAutoObservable(this);
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

  setUserWebLink = (link) => {
    this.userWebLink = link
  }
}

export default userStore;