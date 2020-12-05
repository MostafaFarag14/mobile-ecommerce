import db from './DATA'

// get all products
export const getAllProducts = (query) => {
  if (query.length === 0) {
    return fetch(`http://localhost:1337/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
  }
  else {
    return fetch(`http://localhost:1337/products?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())

  }

}

export const getProduct = (key, value) => {
  return fetch
}

export const searchProducts = (searchInput) => {
  return fetch(`http://localhost:1337/products?title_contains=${searchInput}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
}

export const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1)
}
