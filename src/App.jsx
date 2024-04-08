import { RouterProvider } from 'react-router-dom';

import { router } from './routes';
import { FilmsContextProvider } from './context';

import { FilmsContextProvider } from './context';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

export const App = () => (
  <FilmsContextProvider>
      <div className="page">
        <RouterProvider router={router} />
      </div>
  </FilmsContextProvider>
);

export default App;
