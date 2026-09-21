import { createContext, useContext, useState } from "react";

const WorldContext = createContext();

function WDCProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [pending, setPending] = useState(false);
  const [token, setToken] = useState("");

  return (
    <WorldContext.Provider
      value={{
        users,
        posts,
        setUsers,
        setPosts,
        pending,
        setPending,
        token,
        setToken,
      }}
    >
      {children}
    </WorldContext.Provider>
  );
}

export const useWorld = () => useContext(WorldContext);

export default WDCProvider;
