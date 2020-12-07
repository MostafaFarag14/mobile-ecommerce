import React, { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import { Table, Button } from 'semantic-ui-react'
export default function CartDetail() {
  const { cart, removeFromCart } = useContext(CartContext)

  return (

      <Table unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>Remove</Table.HeaderCell>

          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            cart.count === 0 ?
              <Table.Row>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell textAlign='center'>No Products In Cart</Table.Cell>
              </Table.Row>
              :
              cart.items.map((product, index) => (
                <Table.Row key={index}>
                  <Table.Cell textAlign='center'><img src={product.imageURL} height={50} /></Table.Cell>
                  <Table.Cell>{product.title}</Table.Cell>
                  <Table.Cell>{product.price}</Table.Cell>
                  <Table.Cell>{product.quantity}</Table.Cell>
                  <Table.Cell>{product.price * product.quantity}</Table.Cell>
                  <Table.Cell><Button onClick={() => removeFromCart(product)} compact icon='remove' /></Table.Cell>
                </Table.Row>
              ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell>Total Amount:</Table.HeaderCell>
            <Table.HeaderCell>{cart.total} EGP</Table.HeaderCell>
            {[1, 2, 3, 4].map((item, index) => <Table.HeaderCell key={index} />)}
          </Table.Row>
        </Table.Footer>
      </Table>

  )
}
