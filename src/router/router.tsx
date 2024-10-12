import ErrorPage from 'components/ErrorPage/ErrorPage';
import Layout from 'components/Layout/Layout';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import PrivateRouteWrapper from './routes/privateRoute';
import Root from './routes/root';
import SocialAccounts from './routes/socialAccounts';
import SocialWatchlist from './routes/socialWatchlist';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path='/' element={<Root />} />
      <Route element={<PrivateRouteWrapper />}>
        <Route path='socialAccounts' element={<SocialAccounts />} />
      </Route>
      <Route element={<PrivateRouteWrapper />}>
        <Route path='socialWatchlist' element={<SocialWatchlist />} />
      </Route>
      <Route path='*' element={<ErrorPage />} />
    </Route>,
  ),
);
