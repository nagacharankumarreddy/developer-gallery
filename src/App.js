import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import "./App.css";
import { auth, provider, signInWithPopup } from "./firebase/firebase";
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login Failed", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout Failed", error);
    }
  };

  if (loading)
    return (
      <div className="loading-screen">
        <h2>Loading...</h2>
      </div>
    );

  return (
    <div className="app-container">
      <button
        className={user ? "logout-btn" : "login-btn"}
        onClick={user ? handleSignOut : handleSignIn}
      >
        {user ? "Logout" : "Admin Login"}
      </button>
      <Home user={user} />
    </div>
  );
}

export default App;
