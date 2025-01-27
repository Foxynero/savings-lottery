import React from 'react';
import ReactDOM from 'react-dom/client';  // for React 18 and above
import App from './App'; // Main app component
import { BrowserRouter as Router } from 'react-router-dom'; // If you're using React Router

// Find the root element in index.html where the app will be rendered
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the main App component inside the root
root.render(
  <Router>
    <App />
  </Router>
);
