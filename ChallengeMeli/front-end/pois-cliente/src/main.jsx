import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';
import { PoisApp } from './PoisApp';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PoisApp />
    </BrowserRouter>
  </StrictMode>
);
