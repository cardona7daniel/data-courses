import React, { createContext, useState } from 'react';
import { fakeAuthProvider } from "../container/auth";

let AuthContext = createContext(null);

export function useAuth() {
    const context = React.useContext(AuthContext);
    if (!context) {
    throw new Error(
        'useFieldContext must be used within a FieldContextProvider',
    );
    }

    return context;
}

export function AuthProvider({ children }) {
  let [user, setUser] = useState(null);

  let signin = (newUser, callback) => {
    // TODO: Replace for nest API to login
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback) => {
    // TODO: Replace for nest API to logout
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}