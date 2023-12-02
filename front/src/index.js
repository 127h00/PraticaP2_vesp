import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home/Home';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from  "react-router-dom";
import Produtos from './pages/InfoProdutos/Produtos';

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
    <RouterProvider router={Routering} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
