import { RouterProvider } from 'react-router-dom';

import { router } from './routes';
import { FilmsContextProvider, ThemeProvider } from './context';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


export const App = () => (
  <ThemeProvider>
    <FilmsContextProvider>
        <div className="page">
          <RouterProvider router={router} />
        </div>
    </FilmsContextProvider>
  </ThemeProvider>
);

export default App;
