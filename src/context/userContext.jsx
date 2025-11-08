import { createContext, useContext, useEffect, useState } from 'react';
import { useGetAdminProfileQuery } from '../Redux/api/profileApi';

const UserContext = createContext({ currentUser: null });

export const useUserContext = () => useContext(UserContext);
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { data } = useGetAdminProfileQuery();

  useEffect(() => {
    if (data) {
      setCurrentUser(data?.data);
    }
  }, [data]);

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};
