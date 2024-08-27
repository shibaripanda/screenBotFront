import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div style={{width: window.innerWidth, height: window.innerHeight, textAlign: 'center'}}>
    <App />
  </div>
);
