import { createBrowserRouter } from "react-router-dom";

import { Layout } from '../components';
import { Main, Film, Favorite, SignIn, SignUp} from '../pages';

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
        path: '/signIn',
        element: <SignIn />, 
      },
      {
        path: '/signUp',
        element: <SignUp />, 
      },
    ],
  },
]);