import { useForm } from 'react-hook-form';
import { useUserContext } from '../context/UserContext';
import { User } from '../types/user';
import states from '../data/states';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  editUser?: User | null;
  onResetEdit?: () => void;
}

const UserForm = ({ editUser, onResetEdit }: Props) => {
  const { addUser, updateUser } = useUserContext();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<User>();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (editUser) {
      setIsEditing(true);
      reset(editUser);
    }
  }, [editUser, reset]);

  const onSubmit = (data: User) => {
    if (isEditing && editUser) {
      updateUser({ ...data, id: editUser.id });
    } else {
      addUser({ ...data, id: uuidv4() });
    }
    reset();
    setIsEditing(false);
    onResetEdit?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-gray-100 p-4 rounded-md shadow-md">
      <div>
        <label className="block font-semibold">Name</label>
        {/* <input
          type="text"
          className="border border-gray-300 rounded w-full p-2"
          {...register('name', { required: true, pattern: /^[A-Za-z\s]+$/ })}
        />
        {errors.name && <p className="text-red-500 text-sm">Enter a valid name (letters & spaces only)</p>} */}
        <input
       type="text"
       className="border border-gray-300 rounded w-full p-2"
       {...register('name', {
       required: 'Name is required',
       pattern: {
      value: /^[A-Za-z\s]+$/,
      message: 'Only letters and spaces are allowed',
     },
    })}
   />  
   {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

      </div>

      <div>
        <label className="block font-semibold">Age</label>
        <input
          type="number"
          className="border border-gray-300 rounded w-full p-2"
          {...register('age', { required: true, min: 1 })}
        />
        {errors.age && <p className="text-red-500 text-sm">Enter a valid age</p>}
      </div>

      <div>
        <label className="block font-semibold">Gender</label>
        <div className="space-x-4">
          <label><input type="radio" value="Male" {...register('gender', { required: true })} /> Male</label>
          <label><input type="radio" value="Female" {...register('gender', { required: true })} /> Female</label>
          <label><input type="radio" value="Other" {...register('gender', { required: true })} /> Other</label>
        </div>
        {errors.gender && <p className="text-red-500 text-sm">Select a gender</p>}
      </div>

      <div>
        <label className="block font-semibold">State</label>
        <select
          className="border border-gray-300 rounded w-full p-2"
          {...register('state', { required: true })}
        >
          <option value="">Select state</option>
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        {errors.state && <p className="text-red-500 text-sm">Select a state</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {isEditing ? 'Update' : 'Submit'}
      </button>
    </form>
  );
};

export default UserForm;
