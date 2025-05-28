import React from 'react';
import Captcha from './components/captcha';
import './App.css';

function App() {
  return (
    <div className="main" style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Welcome to domain Frontend</h1>
      <Captcha />
    </div>
  );
}

export default App;
