import React, { useContext } from 'react'
import { Card, Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { CartContext } from '../contexts/CartContext'
import { capitalize } from '../api/helpers'
export default function ProductCard({ product }) {
  const { addProductToCart } = useContext(CartContext)

  const handleClick = (e, data) => {
    e.preventDefault()
    addProductToCart(product)
  }
  
  return (
    <Card as={Link} to={`/product/${product.id}`} raised centered style={{ textAlign: 'left', height: '100%' }}>
      <Card.Content textAlign='center'>
        <img alt={product.title} src={product.imageURL} style={{ height: '200px', margin: 10, maxWidth: '90%' }} />
      </Card.Content>
      <Card.Content>
        <Header textAlign='center' size='small'>{product.title.toUpperCase()}</Header>
        <Card.Meta>
          <span className='date'>{capitalize(product.category)}</span>
        </Card.Meta>
        <Card.Description style={{ display: 'flex',justifyContent: 'space-between' }}>
          <Header style={{margin:0}} size='small' >{product.internalStorage}</Header>
          <Header style={{margin:0}} size='small'>{product.ram} RAM</Header>
        </Card.Description>
      </Card.Content>
      <Card.Content textAlign='center' >
        <Header size='small' color='blue'>{product.price} EGP</Header>
        <Button fluid color='teal' content='ADD TO CART' icon='cart' floated='right'
          onClick={handleClick}
        />
      </Card.Content>
    </Card>
  )
}
