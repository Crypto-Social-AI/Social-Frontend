import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import ErrorPage from './components/ErrorPage/ErrorPage';
import SocialCalls from './components/SocialCalls/SocialCalls';
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
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
