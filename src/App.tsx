import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import SocialCalls, { loader as socialCallsLoader } from './routes/socialCalls';
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
