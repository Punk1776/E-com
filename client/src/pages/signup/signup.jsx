import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [createUser] = useMutation(CREATE_USER);

  const handleSignUp = async () => {
    try {
      const { data } = await createUser({ variables: { email, username, password } });
      console.log('User created successfully:', data);

      // Assuming the token is received in the response from createUser mutation
      if (data && data.createUser && data.createUser.token) {
        Auth.login(data.createUser.token); // Log the user in after successful signup
      }

      // Optionally, handle any additional logic after signup

    } catch (error) {
      setError('Something went wrong');
      console.error('Error while creating user:', error.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <div>
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleSignUp}>Sign Up</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SignUp;
