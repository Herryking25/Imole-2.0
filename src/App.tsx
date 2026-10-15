import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AppProvider } from './context/AppContext';
import { ParentProvider } from './context/ParentContext';
import { AppRoutes } from './routes/AppRoutes';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppProvider>
          <ParentProvider>
            <AppRoutes />
          </ParentProvider>
        </AppProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;
