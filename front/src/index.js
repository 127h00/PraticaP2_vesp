import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home/Home';
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD
import Login from './pages/Login/Login';
=======
import {createBrowserRouter, RouterProvider} from  "react-router-dom";
import Produtos from './pages/InfoProdutos/Produtos';
>>>>>>> c0478fe4b500978c2b8f310463a82bcb02c1b459

const root = ReactDOM.createRoot(document.getElementById('root'));
const Routering = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/produtos",
    element: <Produtos/>
  }
]);

root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <Login/>
=======
    <RouterProvider router={Routering} />
>>>>>>> c0478fe4b500978c2b8f310463a82bcb02c1b459
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
