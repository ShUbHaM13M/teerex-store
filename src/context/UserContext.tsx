import { createContext } from "react";

export const UserContext = createContext({});

export default function UserProvider() {
  const value = {};
  return <UserContext.Provider value={value}></UserContext.Provider>;
}
