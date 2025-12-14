import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

function App() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (success) => {
    if (success) {
      setIsLoggedIn(true);
    }
  };

  const handleSignup = (success) => {
    if (success) {
      alert('Sign up successful! Please log in.');
      setIsLoginView(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert('Logged out!');
  };

  const switchToLogin = () => setIsLoginView(true);
  const switchToSignup = () => setIsLoginView(false);

  return (
    <div className="app-container">
      <h1>SIGN UP FORM</h1>

      {isLoggedIn ? (
        <div className="dashboard">
          <h2>🎉 Welcome! You are logged in.</h2>
          <p>This is your personalized dashboard content.</p>
          <button onClick={handleLogout} className="logout-btn">
            Log Out
          </button>
        </div>
      ) : (
        isLoginView ? (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToSignup={switchToSignup}
          />
        ) : (
          <SignupForm
            onSignup={handleSignup}
            onSwitchToLogin={switchToLogin}
          />
        )
      )}
    </div>
  );
}

export default App;
