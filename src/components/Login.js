import { signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import { auth, googleProvider } from "../firebase/firebase";

const Login = ({ setUser }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setCurrentUser(result.user);
      setUser(result.user);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = () => {
    signOut(auth);
    setCurrentUser(null);
    setUser(null);
  };

  return (
    <div>
      {currentUser ? (
        <>
          <p>Welcome, {currentUser.displayName}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login with Google</button>
      )}
    </div>
  );
};

export default Login;
