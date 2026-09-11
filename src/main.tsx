import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { SyncProvider } from './context/SyncContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <SyncProvider>
        <App />
      </SyncProvider>
    </LanguageProvider>
  </StrictMode>,
);
