
import axios from 'axios'
import { appConfig } from '../api/config'

const { apiURL } = appConfig
// get all products
export const getAllProducts = async query => {
  const url = query === '' ? 'products' : `products?${query}`
  const { data } = await axios.get(`${apiURL}/${url}`)
  return data
}

export const getProduct = async (productID) => {
  console.log('hllo')
  try {
    const response = await axios.get(`${apiURL}/products/${productID}`)
    return response.data
  }
  catch (e) {
    console.log('error')
  }
}

export const searchProducts = (searchInput) => {
  return fetch(`${apiURL}/products?title_contains=${searchInput}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
}

export const addOrder = async order => {
  const { data } = await axios.post(`${apiURL}/orders`, order)
  return data
}

export const getOrder = async orderCode => {
  const { data } = await axios.get(`${apiURL}/orders/${orderCode}`)
  return data
}

export const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1)
}

export const removeSpaces = str => {
  return str.split(' ').join('')
}