//store user logged in information

import { makeAutoObservable } from "mobx";

//to be edited

class userStore {
  name = "John doe";
  isLoggedIn = false;
  isSeller = false;
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
}

export default userStore;