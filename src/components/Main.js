import React, { useContext, useEffect, useState } from 'react'
import { Grid } from 'semantic-ui-react'
import { getAllProducts } from '../api/helpers'
import ProductCard from './ProductCard'


export default function Main({ query }) {
  const [products, setProducts] = useState([])
 
  useEffect(() => {
    getAllProducts(query.toString())
      .then(data => setProducts(data));
  }, [query])


  return (

    <Grid >
      <Grid.Row >
        {products.map(product => (
          <Grid.Column  key={product.id} style={{ marginTop: 20, padding:8 }} computer='5' tablet='8' mobile='16' >
            <ProductCard product={product} />
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid >

  )
}
