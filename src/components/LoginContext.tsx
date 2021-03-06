import React, { Dispatch, SetStateAction, useState } from "react";
import { initialUser, User } from "../types";

type loginContext = {
  logged: boolean;
  newCustomer: boolean;
  setLogged: Dispatch<SetStateAction<boolean>>;
  setNewCustomer: Dispatch<SetStateAction<boolean>>;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
};

export const LoginContext = React.createContext<loginContext>(
  {} as loginContext
);

export const LoginProvider: React.FC = ({ children }) => {
  const [logged, setLogged] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [newCustomer, setNewCustomer] = useState<boolean>(false);
  const [user, setUser] = useState<User>(initialUser);
  const [update, setUpdate] = useState<boolean>(false);

  return (
    <LoginContext.Provider
      value={{
        logged,
        setLogged,
        newCustomer,
        setNewCustomer,
        user,
        setUser,
        open,
        setOpen,
        update,
        setUpdate,
      }}>
      {children}
    </LoginContext.Provider>
  );
};
