//store user logged in information

import { action, makeAutoObservable, observable } from "mobx";
import { makeLocalStorage } from "./makeLocalStorage.tsx";

//to be edited

class cartStore {
  items = [];
  constructor() {
    makeAutoObservable(this, {
      items: observable,
      clearOneItem: action,
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
      this.items = [];
  }

  clearOneItem = (itemId) => {
    this.items = this.items.filter(item => item.id !== itemId)
  }
}

export default cartStore;
