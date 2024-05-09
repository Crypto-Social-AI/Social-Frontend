import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThirdwebProvider } from 'thirdweb/react';
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
      <ThirdwebProvider>
        <App />
      </ThirdwebProvider>
    </SkeletonTheme>
  </React.StrictMode>,
);
