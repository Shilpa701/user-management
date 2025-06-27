import React, { useState } from 'react';
import { UserProvider } from './context/UserContext';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import { User } from './types/user';

const App = () => {
  const [editUser, setEditUser] = useState<User | null>(null);

  const onResetEdit = () => {
    setEditUser(null);
  };

  return (
    <UserProvider>
      <div className="container mx-auto max-w-xl p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>
        <UserForm editUser={editUser} onResetEdit={onResetEdit} />
        <UserList onEdit={setEditUser} />
      </div>
    </UserProvider>
  );
};

export default App;

