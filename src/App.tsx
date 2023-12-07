import { RouterProvider } from 'react-router-dom';
import { router } from 'router/router';

function App() {
  return <RouterProvider router={router} fallbackElement={<span>Loading...</span>} />;
}

export default App;
