//store user logged in information

import { makeAutoObservable, observable } from "mobx";
import { makeLocalStorage } from "./makeLocalStorage.tsx";

//to be edited

class userStore {
  name = "";
  id = "";
  isLoggedIn = false;
  isSeller = false;
  isAdmin = false;
  userWebLink = "";
  description = "";
  shop = "";
  // userStore.isSeller = false
  // getter no need but setter need

  constructor() {
    makeAutoObservable(this, {
      name: observable,
      id: observable,
      isLoggedIn: observable,
      isSeller: observable,
      isAdmin: observable,
      userWebLink: observable,
      description: observable,
      shop: observable,
    });
    makeLocalStorage(this, "userStore", [
      "name",
      "id",
      "isLoggedIn",
      "isSeller",
      "isAdmin",
      "userWebLink",
      "description",
      "shop",
    ]);
  }

  setUserName = (name) => {
    this.name = name;
  };

  setId = (id) => {
    this.id = id;
  };

  setIsLoggedIn = () => {
    this.isLoggedIn = true;
  };
  setIsLoggedOut = () => {
    this.isLoggedIn = false;
    this.id = null;
    this.name = null;
    this.isSeller = false;
    this.isAdmin = false;
    this.userWebLink = null;
    this.description = null;
    this.shop = null;
  };
  setIsSeller = () => {
    this.isSeller = true;
  };

  setIsAdmin = () => {
    this.isAdmin = true;
  };

  setUserWebLink = (link) => {
    this.userWebLink = link;
  };

  setDescription = (description) => {
    this.description = description;
  };

  setShop = (shop) => {
    this.shop = shop;
  };
}

export default userStore;
