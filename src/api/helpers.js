
import axios from 'axios'
import { appConfig } from '../api/config'

const { apiURL } = appConfig
// get all products
export const getAllProducts = async (query = '') => {
  const url = query === '' ? 'phones' : `phones?${query}`
  const { data } = await axios.get(`${apiURL}/${url}`)
  return data
}

export const awakeAPI = async () => {
  return axios.get(`${apiURL}`)
}

export const getProduct = async (productID) => {

  try {
    const response = await axios.get(`${apiURL}/phones/${productID}`)
    return response.data
  }
  catch (e) {
    console.log('error')
  }
}

export const searchProducts = (searchInput) => {
  return fetch(`${apiURL}/phones?title_contains=${searchInput}`, {
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

  if (str === null)
    return ''

  return str[0].toUpperCase() + str.slice(1)
}

export const removeSpaces = str => {
  if (str === null)
    return ''

  return str.split(' ').join('')
}

export const extractSpecsFromProduct =
  ({ internalStorage, ram, brand, color, category, displaySize, rearCamera, frontCamera, batteryCapacity }) => (
    { internalStorage, ram, brand, color, category, displaySize, rearCamera, frontCamera, batteryCapacity }
  )


export const convertSnakeCaseToHuman = stringToConvert => {

  if (stringToConvert === null)
    return ''

  let result = stringToConvert

  stringToConvert.split('').forEach((letter, index) => {
    if (letter === letter.toUpperCase()) {
      result = result.replace(letter, ` ${letter}`)
    }
  })

  return capitalize(result)
}