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
    if (!this.containsItem(item.id)) {
      let newItem = {
        id: item.id,
        listingType: item.listingType,
        img: item.img,
        title: item.title,
        author: item.author,
        description: item.description,
        price: item.price,
        video: item.video,
        category: item.category,
        brand: item.brand,
        warrantyInfo: item.warrantyInfo,
        shippingProvider: item.shippingProvider,
        parcelSize: item.parcelSize,
        weight: item.weight,
        stockAvailable: item.stockAvailable,
        variation: item.variation,
        dimension: item.dimension,
        itemQuantity: 1,
      };
      this.items.push(newItem);
    } else {
      this.addItemCount(item.id);
    }
  };

  getItems = () => {
    return this.items;
  };

  clearAllItems = () => {
    this.items = [];
  };

  //remove 1 item
  clearOneItem = (itemId) => {
    if (this.getItemQuantity(itemId) === 1) {
      this.removeItems(itemId);
    } else {
      this.reduceItemCount(itemId);
    }
  };

  //remove all items of the id
  removeItems = (itemId) => {
    this.items = this.items.filter((item) => item.id !== itemId);
  };

  //check if item storage contains the item
  containsItem(itemId) {
    let contains = false;
    this.items.forEach(function (arrayItem) {
      if (arrayItem.id === itemId) {
        contains = true;
      }
    });
    return contains;
  }

  //get item quantity in cart
  getItemQuantity(itemId) {
    let objIndex = this.items.findIndex((obj) => obj.id === itemId);
    return this.items[objIndex].itemQuantity;
  }

  //add 1 item
  addItemCount(itemId) {
    let objIndex = this.items.findIndex((obj) => obj.id === itemId);
    let currentQuantity = this.items[objIndex].itemQuantity;
    currentQuantity++;
    this.items[objIndex].itemQuantity = currentQuantity;
  }

  //remove 1 item
  reduceItemCount(itemId) {
    let objIndex = this.items.findIndex((obj) => obj.id === itemId);
    let currentQuantity = this.items[objIndex].itemQuantity;
    currentQuantity--;
    this.items[objIndex].itemQuantity = currentQuantity;
  }
}

export default cartStore;
