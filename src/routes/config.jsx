import { createBrowserRouter } from "react-router-dom";

import { Layout } from '../components';
import { Main, Film } from '../pages';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: '/film/:filmId',
        element: <Film />, 
      },
    ],
  },
]);