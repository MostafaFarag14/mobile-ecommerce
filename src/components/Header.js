
import { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Container, Dropdown, Icon, Label, Menu, Search } from 'semantic-ui-react'

import { capitalize, searchProducts } from '../api/helpers'
import { CartContext } from '../contexts/CartContext'

const Header = ({ setQuery }) => {
  const brands = ['samsung', 'oppo', 'xiaomi', 'huawei']
  const categories = ['phones', 'tablets']
  const [search, setSearch] = useState('')
  const [rawResults, setRawResults] = useState()
  const [results, setResults] = useState()
  const history = useHistory()
  const handelSearchInputChange = (e, data) => {
    setSearch(data.value)

    data.value && searchProducts(data.value)
      .then(result => {
        setRawResults(result)
        const formattedResult = result.map(product => ({
          "title": product.title,
          "description": product.category,
          "image": product.imageURL,
          "price": product.price.toString()
        }))

        setResults(formattedResult)
      })
  }

  const openProductPage = (e, data) => {
    const {id} = rawResults.find(result => result.title === data.result.title)
    history.push(`/product/${id}`)
  }

  const { cart } = useContext(CartContext)
  return (
    <div>
      <Menu style={{ padding: 10, boxShadow: '0 2px 5px 0 rgba(0,0,0,.08)' }} compact borderless size='large' attached='top'>
        <Container>
          <Menu.Item as={Link} to='/' onClick={() => setQuery('')} name='Home' />

          <Dropdown item text='Brands' simple>
            <Dropdown.Menu >
              {brands.map((brand, index) => (
                <Dropdown.Item key={index} value={brand} onClick={(e, { value }) => setQuery(`brand=${value}`)}>{capitalize(brand)}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown item simple text='Categories'>
            <Dropdown.Menu>
              {categories.map((category, index) => (
                <Dropdown.Item key={index} text={capitalize(category)} value={category} onClick={(e, { value }) => setQuery(`category=${value}`)} />
              ))}
            </Dropdown.Menu>
          </Dropdown>


          <Menu.Menu position='right' >
            <Menu.Item fitted>
              <Search
                size='small'
                onSearchChange={handelSearchInputChange}
                value={search}
                results={results}
                onResultSelect={openProductPage}

              />
            </Menu.Item>
            <Menu.Item>
              <Button circular as={Link} compact basic to='/cart'>
                <Icon fitted name='shopping cart' />
                {cart.count !== 0 && <Label floating circular color='red' content={cart.count} />}
              </Button>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    </div >
  )

}




export default Header