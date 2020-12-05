import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Container, Grid, Header, Icon, Input, Label } from 'semantic-ui-react'
import { getProduct } from '../api/helpers'
export default function Item() {
  const { id } = useParams()
  const [product, setProduct] = useState()
  const [quantity, setQuantity] = useState(0)
  
  useEffect(() => {
    setProduct(getProduct('id', id.toString()))
  }, [])

  if (product === undefined) {
    return <Container>Loading...</Container>
  }
  else {
    return (<Container style={{ display: 'flex', margin: 10 }}>
      <div style={{ margin: 10 }}>
        <img src={product.imageURL} style={{ textAlign: 'center', height: '500px' , maxWidth: 300}} />
      </div>
      <div style={{ margin: 10 }}>
        <Header>{product.title}</Header>
        <Header color='blue'>{product.price} EGP</Header>
        <Header size='small'>Quantity:</Header>
        <Button icon='minus' onClick={() => setQuantity(quantity - 1)} />
        <Input type='number' value={quantity} onChange={ (e, {value}) => setQuantity(parseInt(value))}/>
        <Button icon='plus' onClick={() => setQuantity(quantity + 1)}/>
        <Button color='blue'>Add To Cart</Button>
      </div>
    </Container>)

  }
}
