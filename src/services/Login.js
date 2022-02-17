//for login services

import { api } from "../services/api";
import { URL_LOGOUT } from "../services/endpoints";

const encryptPassword = (password) => {
    //todo
    return password;
}

const login = (username, password) => encryptPassword(password)
.then((data) => {
    const {encryptedPassword} = data;
    return api.postAsFormInput(URL_LOGIN, {
        username,
        password: encryptedPassword
    })
})

export const logout = () =>
  api.postAsJson(URL_LOGOUT).then((res) => {
    console.log("logout successfully");
    return res;
  });

  export default login;