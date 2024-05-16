import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Provider } from 'react-redux';
import { ThemeProvider } from './context';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


export const App = () => (
    <Provider store={store}>
      <ThemeProvider>
              <RouterProvider router={router} />
      </ThemeProvider>
  </ Provider>
);

export default App;
