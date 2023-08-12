import React from 'react'
import Layout from '../Views/Layout'
import { Title1, Title3 } from '@fluentui/react-components'
import ProductsShelf from '../Views/ProductsShelf'

import { IProduct } from '../types/types'
import Results from '../Views/Results'
import { productMock } from '../mock/services'

function Featured() {
  return (
   
      <Results title={"Today's featured"} >
        <ProductsShelf products={productMock as unknown as IProduct[]}/>
      </Results>
   
  )
}

export default Featured