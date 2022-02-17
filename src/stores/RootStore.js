//store file

import React from "react";
import UserStore from "./UserStore";

class RootStore {
    constructor() {
        this.userStore = new UserStore(this)
    }
}

const StoresContext = React.createContext(new RootStore());

export const useStores = () => React.useContext(StoresContext);
