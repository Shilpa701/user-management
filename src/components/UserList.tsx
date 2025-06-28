import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { User } from '../types/user';

interface Props {
  onEdit: (user: User) => void;
}

const UserList = ({ onEdit }: Props) => {
  const { users, deleteUser } = useUserContext();
  const navigate = useNavigate();

  const handleEdit = (user: User) => {
    onEdit(user); 
    navigate('/'); 
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">User List</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">No users added yet.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Age</th>
              <th className="p-2">Gender</th>
              <th className="p-2">State</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="text-center border-t">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.age}</td>
                <td className="p-2">{user.gender}</td>
                {/* <td className="p-2">{user.state}</td> */}
                <td>{user.state?.label}</td>

                <td className="p-2 space-x-2">
               
                <button
                  className="bg-yellow-400 px-2 py-1 rounded text-white"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 px-2 py-1 rounded text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;

