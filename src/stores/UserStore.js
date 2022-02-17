//store user logged in information

import { makeAutoObservable } from "mobx";

//to be edited

class userStore {
  name = "John doe";
  isLoggedIn = false;

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
}

export default userStore;