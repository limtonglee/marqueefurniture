//store file

import React from "react";
import UserStore from "./UserStore";
import CartStore from "./CartStore";

class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.cartStore = new CartStore(this);
  }
}

const StoresContext = React.createContext(new RootStore());

export const useStores = () => React.useContext(StoresContext);

/* 
usage template for userStore

import { useStores } from "./stores";
import { useState } from "react";
import { useObserver } from "mobx-react";


const { userStore } = useStores();



const handleNameChange = (e) => {
    e.preventDefault();
    const {
      target: { value }
    } = e;

    // access the user store set name action
    userStore.setUserName(value);
  };


  return useObserver(() => (
    <div className="App">
      <h1>hello {userStore.name}</h1>

      <h2>Change your name here</h2>
      <input type="text" value={userStore.name} onChange={handleNameChange} />
      )}
    </div>


*/
