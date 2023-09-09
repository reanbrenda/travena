/* eslint-disable react/prop-types */
import React, { useState } from 'react';

export const AppContext = React.createContext({
  loginDialogOpen: false,
});

export const AppContextProvider = ({ children }) => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  setTimeout(() => {
    // setLoginDialogOpen(true)
    // Keep checking login status here
  }, 10000)

  return <AppContext.Provider value={{ loginDialogOpen, setLoginDialogOpen }}>{children}</AppContext.Provider>;
};
