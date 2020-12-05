import React, { useContext } from 'react'
import { Card, Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { CartContext } from '../contexts/CartContext'
export default function ProductCard({ product }) {
  const { addProductToCart } = useContext(CartContext)
  return (
    <Card raised centered style={{ textAlign: 'left' }}>
      <Card.Content textAlign='center'>
        <Link to={`/product/${product.id}`}>
          <img src={product.imageURL} style={{ height: '200px', margin: 10, maxWidth: '90%' }} />
        </Link>
      </Card.Content>
      <Card.Content>
        <Header textAlign='center' size='small'>{product.title}</Header>
        <Card.Meta>
          <span className='date'>{product.category}</span>
        </Card.Meta>
        <Card.Description>
          <Header size='small' >{product.brand}</Header>
        </Card.Description>
        <Card.Description>
          <Header size='tiny' color={product.color}>{product.color}</Header>
        </Card.Description>
      </Card.Content>
      <Card.Content textAlign='center' >
        <Header size='small' color='blue'>{product.price} EGP</Header>
        <Button fluid color='teal' content='ADD TO CART' icon='cart' floated='right'
          onClick={() => addProductToCart(product)}
        />
      </Card.Content>
    </Card>
  )
}
