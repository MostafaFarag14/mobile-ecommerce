import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Container, Grid, Header, Card, Input, Image } from 'semantic-ui-react'
import { getProduct, capitalize, extractSpecsFromProduct, convertSnakeCaseToHuman } from '../api/helpers'
import { CartContext } from '../contexts/CartContext'
export default function Item() {
  const { id } = useParams()
  const [product, setProduct] = useState()
  const [quantity, setQuantity] = useState(1)
  const { addProductToCart } = useContext(CartContext)
  let productSpecs

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProduct(id)
      setProduct(product)
    }
    fetchProduct()
  }, [id])

  const handleClick = (e, data) => {
    addProductToCart(product, quantity)
  }

  if (product === undefined) {
    return <Container>Loading...</Container>
  }

  else {
    productSpecs = extractSpecsFromProduct(product)
    return (<Grid container style={{
      backgroundColor: 'white',
      margin: 20, borderRadius: '10px', boxShadow: '0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5'
    }}>

      <Grid.Column computer='8' mobile='16' >
        <Image centered src={product.imageURL} style={{ height: '400px', maxWidth: '50%' }} />
      </Grid.Column>
      <Grid.Column stretched computer='8' mobile='16' >
        <Card fluid style={{ boxShadow: 'none' }}>
          <Card.Content>
            <Header>{capitalize(product.title)}</Header>
            <Header color='blue'>{product.price} EGP</Header>
          </Card.Content>
          <Card.Content>
            <h3>Specs:</h3>
            <ul>
              {
                Object.keys(productSpecs).map(key => (
                  <li key={key}>{convertSnakeCaseToHuman(key)} : {capitalize(productSpecs[key])}</li>
                ))
              }
            </ul>
          </Card.Content>
          <Card.Content>
            <Header size='small'>Quantity:</Header>
            <Button color='red' icon='minus' onClick={() => { if (quantity > 1) setQuantity(quantity - 1) }} />
            <Input style={{ width: 120 }} value={quantity} onChange={(e, { value }) => {
              isNaN(parseInt(value)) || (parseInt(value) === 0) ? setQuantity(1) : setQuantity(parseInt(value))
            }
            } />
            <Button color='red' icon='plus' onClick={() => setQuantity(quantity + 1)} />
            <Button color='teal' content='ADD TO CART' onClick={handleClick} />
          </Card.Content>
        </Card>
      </Grid.Column>


    </ Grid>)

  }
}
