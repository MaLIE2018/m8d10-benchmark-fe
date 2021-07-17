import React, { Dispatch, SetStateAction, useState } from "react";
import { User } from "../types";

type loginContext = {
  logged: boolean;
  newCustomer: boolean;
  setLogged: Dispatch<SetStateAction<boolean>>;
  setNewCustomer: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const LoginContext = React.createContext<loginContext>(
  {} as loginContext
);

export const LoginProvider: React.FC = ({ children }) => {
  const [logged, setLogged] = useState<boolean>(false);
  const [newCustomer, setNewCustomer] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  return (
    <LoginContext.Provider
      value={{ logged, setLogged, newCustomer, setNewCustomer, user, setUser }}>
      {children}
    </LoginContext.Provider>
  );
};
