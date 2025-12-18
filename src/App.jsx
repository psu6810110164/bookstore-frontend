import './App.css';
import axios from 'axios'
import { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import BookScreen from './components/BookScreen';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLoginSuccess = () => {
    setIsAuthenticated(true) 
  }

  return (
    <>
      {}
      {!isAuthenticated ? (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      ) : (
        <BookScreen />
      )}
    </>
  );
}

export default App;