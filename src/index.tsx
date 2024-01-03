import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ToastContainer />
    <SkeletonTheme baseColor='#222' highlightColor='#333'>
      <ThirdwebProvider activeChain='ethereum' clientId={process.env.THIRDWEB_CLIENT_ID}>
        <App />
      </ThirdwebProvider>
    </SkeletonTheme>
  </React.StrictMode>,
);
