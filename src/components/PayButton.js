import React from 'react'
import ReactDOM from 'react-dom'
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

export default function PayButton({ total }) {
  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total,
          },
        },
      ],
    });
  }
  const onApproveOrder = (data, actions) => {
    console.log(data)
    // return actions.order.capture();
  }
  return (
    <PayPalButton createOrder={onCreateOrder} onApprove={onApproveOrder} />
  )
}
