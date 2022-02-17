//store user logged in information

import { makeAutoObservable } from "mobx";

//to be edited

class userStore {
  name = "John doe";

  constructor() {
    makeAutoObservable(this);
  }

  setUserName = (name) => {
    this.name = name;
  };
}

export default userStore;