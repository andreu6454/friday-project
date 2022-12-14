import { RouterProvider } from 'react-router-dom';

import { routesConfig } from './routes/routes-config';

function App() {
  return <RouterProvider router={routesConfig} />;
}

export default App;
