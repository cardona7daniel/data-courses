import { loginUserApi } from "../../api/login";

const authProvider = {
  isAuthenticated: false,
  signin(user, callback) {
    loginUserApi(user)
      .then((userInfo) => {
        authProvider.isAuthenticated = true;
        callback(userInfo.data);
      })
      .catch((_) => (authProvider.isAuthenticated = false));
  },
  signout(callback) {
    authProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

export { authProvider };
