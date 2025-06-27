import { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types/user';

interface UserContextProps {
  users: User[];
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (user: User) => setUsers(prev => [...prev, user]);
  const updateUser = (updatedUser: User) =>
    setUsers(prev => prev.map(user => (user.id === updatedUser.id ? updatedUser : user)));
  const deleteUser = (id: string) => setUsers(prev => prev.filter(user => user.id !== id));

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUserContext must be used within a UserProvider');
  return context;
};
