import Layout from '../Views/Layout'
import ProductsShelf from '../Views/ProductsShelf'
import Banner from '../components/Banner/Banner'
import { productMock } from '../mock/services'
import { IProduct } from '../types/types'

function Home() {
  return (
    <Layout>
        <Banner/>
        <ProductsShelf products={productMock as unknown as IProduct[]}/>
    </Layout>
  )
}

export default Home
