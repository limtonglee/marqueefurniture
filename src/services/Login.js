//for login services

import { postAsFormInput } from "./api";
import { URL_LOGIN } from "./endpoints";

// const encryptPassword = (password) => {
//   //todo
//   return password;
// };

export const login = (email, password) => {
  return postAsFormInput(URL_LOGIN, {
    email,
    password,
  });
};
// encryptPassword(password).then((data) => {
//   const { encryptedPassword } = data;
//   return api.postAsFormInput(URL_LOGIN, {
//     username,
//     password
//   });
// });

// export const logout = () =>
//   api.postAsJson(URL_LOGOUT).then((res) => {
//     console.log("logout successfully");
//     return res;
//   });
