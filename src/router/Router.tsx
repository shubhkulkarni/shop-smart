import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Category from '../pages/Category';
import CheckOut from '../pages/CheckOut';
import Featured from '../pages/Featured';
import Home from '../pages/Home';
import Product from '../pages/Product';
import SearchResults from '../pages/SearchResults';

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