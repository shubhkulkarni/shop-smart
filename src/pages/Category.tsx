import React from 'react'
import { useParams } from 'react-router-dom'
import Results from '../Views/Results'
import ProductsShelf from '../Views/ProductsShelf'
import { Title1 } from '@fluentui/react-components'
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

