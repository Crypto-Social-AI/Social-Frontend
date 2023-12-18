import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Root from './routes/root';
import PrivateRouteWrapper from './routes/privateRoute';
import SocialAccounts from './routes/socialAccounts';
import Layout from 'components/Layout/Layout';
import ErrorPage from 'components/ErrorPage/ErrorPage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path='/' element={<Root />} />
      <Route element={<PrivateRouteWrapper />}>
        <Route path='socialAccounts' element={<SocialAccounts />} />
      </Route>
      <Route path='*' element={<ErrorPage />} />
    </Route>,
  ),
);
