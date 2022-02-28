//store user logged in information

import { makeAutoObservable, observable } from "mobx";
import { makeLocalStorage } from "./makeLocalStorage.tsx";

//to be edited

class cartStore {
  items = [];
  constructor() {
    makeAutoObservable(this, {
      items: observable,
    });
    makeLocalStorage(this, "cartStore", ["items"]);
  }
  addItems = (item) => {
    this.items.push(item);
  };
  removeItems = (id) => {
      //todo
  }

  getItems = () => {
      return this.items;
  }

  clearAllItems = () => {
      this.items = null;
  }
}

export default cartStore;
