
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'react-router-dom'; // Placeholder to satisfy bundler if needed for type resolution
import 'react'; // Placeholder to satisfy bundler if needed for type resolution

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
