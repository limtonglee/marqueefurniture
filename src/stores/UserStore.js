//store user logged in information

import { makeAutoObservable, observable } from "mobx";
import { makeLocalStorage } from "./makeLocalStorage.tsx";

//to be edited

class userStore {
  name = "";
  id = "";
  isLoggedIn = false;
  isSeller = false;
  isDesigner = false;
  isAdmin = false;
  address = "";
  description = "";
  shop = "";
  profilePic = "";
  // userStore.isSeller = false
  // getter no need but setter need

  prevTabOnProfile = 0;
  prevTabOnDesignOrder = 0;
  prevViewOnMoodboard = true;
  currentChatPerson = null;

  constructor() {
    makeAutoObservable(this, {
      name: observable,
      id: observable,
      isLoggedIn: observable,
      isSeller: observable,
      isDesigner: observable,
      isAdmin: observable,
      address: observable,
      description: observable,
      shop: observable,
      profilePic: observable,
    });
    makeLocalStorage(this, "userStore", [
      "name",
      "id",
      "isLoggedIn",
      "isSeller",
      "isDesigner",
      "isAdmin",
      "address",
      "description",
      "shop",
      "profilePic",
    ]);
  }

  setUserName = (name) => {
    this.name = name;
  };

  setId = (id) => {
    this.id = id;
  };

  setProfilePic = (profilePic) => {
    this.profilePic = profilePic;
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
    this.isDesigner = false;
    this.address = null;
    this.description = null;
    this.shop = null;
    this.profilePic = "";
  };
  setIsSeller = () => {
    this.isSeller = true;
  };

  setIsDesigner = () => {
    this.isDesigner = true;
  };

  setIsAdmin = () => {
    this.isAdmin = true;
  };

  setUserAddress = (link) => {
    this.address = link;
  };

  setDescription = (description) => {
    this.description = description;
  };

  setShop = (shop) => {
    this.shop = shop;
  };

  setPrevTabOnProfile = (newTab) => {
    this.prevTabOnProfile = newTab;
  };

  setPrevTabOnDesignOrder = (newTab) => {
    this.prevTabOnDesignOrder = newTab;
  };

  setPrevViewOnMoodboard = (newView) => {
    this.prevViewOnMoodboard = newView;
  };

  setCurrentChatPerson = (newPersonId) => {
    this.currentChatPerson = newPersonId;
  };
}

export default userStore;
