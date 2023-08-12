import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home';
import Featured from '../pages/Featured';
import Product from '../pages/Product';
import Category from '../pages/Category';
import SearchResults from '../pages/SearchResults';
import CheckOut from '../pages/CheckOut';

function Router() {
  return (
    <BrowserRouter>
        <Routes>
           {routes.map(route=>{
            return <Route key={route.path} {...route}/>
           })}
        </Routes>
    </BrowserRouter>
  )
}

export default Router

const routes = [{
    path:"/",
    element: <Home/>
},
{
    path:"/featured",
    element: <Featured/>
},
{
    path:"/product/:id",
    element: <Product/>
},
{
    path:"/category/:category",
    element: <Category/>
},
{
    path:"/search/:query",
    element: <SearchResults/>
},
{
    path:"/checkout/:id",
    element: <CheckOut/>
},
];