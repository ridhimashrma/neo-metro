import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import LocationProvider from "./context/LocationContext";
import './index.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocationProvider>
      <App />
    </LocationProvider>
  </StrictMode>
);
