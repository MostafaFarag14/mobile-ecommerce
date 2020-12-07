import { createContext, useState } from 'react'

const CartContext = createContext()

const calculateCartTotal = items => {
  localStorage.setItem('cart', JSON.stringify(items))
  const count = items.reduce((acc, curr) => acc + curr.quantity, 0)
  const total = items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
  return { count, total }
}
const CartProvider = ({ children }) => {
  const initialItems = JSON.parse(localStorage.getItem('cart')) || []
  const [cart, setCart] = useState({
    items: initialItems,
    ...calculateCartTotal(initialItems)
  })

  const addProductToCart = (product, quantityToAdd = 1) => {
    const { items = [] } = cart
    const productIndex = items.findIndex(item => item.id === product.id)
    if (productIndex === -1) {
      items.push({
        ...product,
        quantity: quantityToAdd
      })
    }
    else {
      items[productIndex].quantity += quantityToAdd
    }
    setCart({
      items,
      ...calculateCartTotal(items)
    })
  }

  const removeFromCart = product => {
    let { items } = cart
    items = items.filter(item => item.id !== product.id)
    setCart({
      items,
      ...calculateCartTotal(items)
    })
  }

  return (
    <CartContext.Provider value={{ cart, addProductToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export { CartProvider, CartContext }