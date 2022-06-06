import React, { createContext, useState, useEffect } from 'react';
import { authProvider } from "../container/auth";

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
  useEffect(() => {
    if (user === null) {
      const userData = JSON.parse(sessionStorage.getItem('user'));
      userData && setUser(userData);
    }
  }, [user]);

  let signin = (user, callback) => {
    return authProvider.signin(user, (response) => {
      if (response) {
        setUser(response);
        sessionStorage.setItem('user', JSON.stringify(response));
      } else {
        setUser(null);
        sessionStorage.setItem('user', JSON.stringify(null));
      }
      callback();
    });
  };

  let signout = (callback) => {
    return authProvider.signout(() => {
      setUser(null);
      sessionStorage.setItem('user', JSON.stringify(null));
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
