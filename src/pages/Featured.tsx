import ProductsShelf from '../Views/ProductsShelf'

import Results from '../Views/Results'
import { productMock } from '../mock/services'
import { IProduct } from '../types/types'

function Featured() {
  return (
   
      <Results title={"Today's featured"} >
        <ProductsShelf products={productMock as unknown as IProduct[]}/>
      </Results>
   
  )
}

export default Featured