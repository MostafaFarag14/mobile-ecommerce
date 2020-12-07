import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import CartDetail from '../components/CartDetail'

export default function Cart() {
  return (
    <div style={{ flex: 1, marginTop: 20 }}>
      <CartDetail />
      <div>
        <Button size='large' color='vk' as={Link} content='Check Out' to='/checkout' />
      </div>
    </div>
  )
}
