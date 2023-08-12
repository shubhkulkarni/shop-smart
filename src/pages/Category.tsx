import { Title1 } from '@fluentui/react-components'
import { useParams } from 'react-router-dom'
import ProductsShelf from '../Views/ProductsShelf'
import Results from '../Views/Results'
import { getProducts } from '../mock/services'

function Category() {
    const { category} = useParams()
    if (category) return (
        <Results title={category}>
            <ProductsShelf products={getProducts(category)}/>
        </Results>
    )

    return <Title1>No products under {category}</Title1>
}

export default Category

