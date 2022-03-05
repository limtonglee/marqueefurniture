//store user logged in information

import { makeAutoObservable, observable } from "mobx";
import { makeLocalStorage } from "./makeLocalStorage.tsx";

//to be edited

class switchStore {
    checked = false;

  constructor() {
    makeAutoObservable(this, {
        checked: observable
    });
    makeLocalStorage(this, "switchStore", [
      "checked",
    ]);
  }

  setCheck = (status) => {
    this.checked = status;
  }


}

export default switchStore;
