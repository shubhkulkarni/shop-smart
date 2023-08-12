import React from 'react'
import Layout from '../Views/Layout'
import Banner from '../components/Banner/Banner'
import ProductCard from '../components/ProductCard/ProductCard'
import ProductsShelf from '../Views/ProductsShelf'
import { products } from '../mock/products'
import { IProduct } from '../types/types'
import { productMock } from '../mock/services'

function Home() {
  return (
    <Layout>
        <Banner/>
        <ProductsShelf products={productMock as unknown as IProduct[]}/>
    </Layout>
  )
}

export default Home
