import React from 'react'
import Layout from './Layout'
import { Title3 } from '@fluentui/react-components'
import ProductsShelf from './ProductsShelf'
interface IResultsProps extends React.PropsWithChildren{
    title: string;
}
function Results(props: IResultsProps) {
    const { title,children} = props;
    return (
    <Layout>
    <Title3>{title}</Title3>
    <>{children}</>
  </Layout>
  )
}

export default Results