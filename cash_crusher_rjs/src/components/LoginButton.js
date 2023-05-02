import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  console.log('isAuthenticated:', isAuthenticated); // Add this line to log the value

  return (
    !isAuthenticated && (
      <button onClick={() => loginWithRedirect()}>
        Log In
      </button>
    )
  )
}

export default LoginButton;
