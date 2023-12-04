import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain='ethereum' clientId={process.env.THIRDWEB_CLIENT_ID}>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>,
);
