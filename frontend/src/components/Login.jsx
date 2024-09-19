import React from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const validateInput = (value) => {
    const emailPattern = /^\S+@\S+\.\S+$/;
    const phonePattern = /^[1-9][0-9]{9}$/;

    if (value.includes('@')) {
      if (!emailPattern.test(value)) {
        return 'Enter a valid email';
      }
      return true;
    } else if (!isNaN(value)) {
      if (!phonePattern.test(value)) {
        return 'Phone number must be exactly 10 digits';
      }
      return true;
    } else {
      if (value.length < 8) {
        return 'Username must be at least 8 characters';
      }
      if (value.length > 20) {
        return 'Username cannot exceed 20 characters';
      }
      return true;
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg"
      >
        <div className="mb-6">
          <input
            type="text"
            placeholder="Phone number, username or email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('input', {
              required: 'This field is required',
              validate: validateInput,
            })}
          />
          {errors.input && (
            <p className="text-red-500 text-sm mt-1">{errors.input.message}</p>
          )}
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('password', {
              required: 'Password is required',
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <input
            type="submit"
            value="Login"
            className="w-full bg-blue-500 text-white py-3 rounded-lg cursor-pointer hover:bg-blue-600"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;

