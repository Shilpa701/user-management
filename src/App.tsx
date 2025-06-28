import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
      <Router>
        <div className="container mx-auto max-w-xl p-4">
          <h1 className="text-3xl font-bold mb-4 text-center">User Management</h1>
   <div className="flex gap-4 mb-6 justify-center">

            <Link to="/" className="text-blue-500 hover:underline">Form</Link>
            <Link to="/list" className="text-blue-500 hover:underline">User List</Link>
          </div>

          <Routes>
            <Route
              path="/"
              element={<UserForm editUser={editUser} onResetEdit={onResetEdit} />}
            />
            <Route
              path="/list"
              element={<UserList onEdit={setEditUser} />}
            />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;



