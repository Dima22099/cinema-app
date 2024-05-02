import { createBrowserRouter } from "react-router-dom";

import { Layout } from '../components';
import { Main, Film, Favorite, Log_in } from '../pages';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: '/film/:id',
        element: <Film />, 
      },
       {
        path: '/favorites',
        element: <Favorite />, 
      },
      {
        path: '/log_in',
        element: <Log_in />, 
      },
    ],
  },
]);