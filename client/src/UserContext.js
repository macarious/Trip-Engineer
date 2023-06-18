import React, { useContext, useState } from "react";

const UserContext = React.createContext();
const useUser = () => useContext(UserContext);

export { useUser, UserProvider };

function UserProvider({ children }) {
  const [user, setUser] = useState();
  const value = { user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
