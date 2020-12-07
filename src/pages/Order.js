import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { getOrder } from '../api/helpers'
import CartDetail from '../components/CartDetail'
import PayButton from '../components/PayButton'

export default function Order() {
  const { code } = useParams()
  const [orderDetails, setOrderDetails] = useState()
  useEffect(() => {

    const fetchOrder = async () => {
      const order = await getOrder(code)
      setOrderDetails(order)
    }
    fetchOrder()
  }, [])


  return (
    <div style={{ flex: 1, marginTop: 20 }}>
      <CartDetail />
      <div style={{ textAlign: 'center' }}>
        {orderDetails && <PayButton total={orderDetails.total} />}
      </div>
    </div>
  )
}
