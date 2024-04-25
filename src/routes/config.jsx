import { createBrowserRouter } from "react-router-dom";

import { Layout } from '../components';
import { Main, Film, Favorit, Log_in } from '../pages';


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
        path: '/favorits',
        element: <Favorit />, 
      },
      {
        path: '/log_in',
        element: <Log_in />, 
      },
    ],
  },
]);