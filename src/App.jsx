import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { router } from './routes';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


export const App = () => {
  const { theme } = useSelector(state => state.user);
  
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <RouterProvider router={router} />
  )
};

export default App;
