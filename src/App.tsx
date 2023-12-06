import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import SocialCalls, { loader as socialCallsLoader } from './routes/socialCalls';
import SocialAccounts, { loader as socialAccountsLoader } from 'routes/socialAccounts';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Layout from './components/Layout/Layout';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Root />,
      },
      {
        path: '/socialCalls',
        element: <SocialCalls />,
        loader: socialCallsLoader,
      },
      {
        path: '/socialAccounts',
        element: <SocialAccounts />,
        loader: socialAccountsLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} fallbackElement={<span>Loading...</span>} />;
}

export default App;
