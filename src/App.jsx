import { RouterProvider } from 'react-router-dom';

import { router } from './routes';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


export const App = () =>  (
    <div className="page">
        <RouterProvider router={router} />
    </div>
);


export default App;
