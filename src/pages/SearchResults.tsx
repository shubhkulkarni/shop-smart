import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductsShelf from '../Views/ProductsShelf';
import Results from '../Views/Results';
import NoItem from '../components/NoItem/NoItem';
import { productMock, searchProduct } from '../mock/services';

function SearchResults() {
    const {query} = useParams();
    const [products,setProducts] = useState([]);
    useEffect(()=>{
       if(query === 'all'){
            setProducts(productMock);
        }else if(query){
            const list = searchProduct(query) ?? [];
            setProducts(list);
        }
    },[query]);
    console.log({query})
  return (
    <Results title={`Found ${products?.length ?? 0} ${products.length===1 ? 'result' : 'results'} for "${query}"`}>
        {products?.length === 0 && <NoItem type="products found"/>} 
        <ProductsShelf products={products}/>
    </Results>
  )
}

export default SearchResults