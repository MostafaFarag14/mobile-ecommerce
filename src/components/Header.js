
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Dropdown, Icon, Label, Menu, Search } from 'semantic-ui-react'

import { capitalize, searchProducts } from '../api/helpers'
import { CartContext } from '../contexts/CartContext'

const Header = ({ setQuery }) => {
  const brands = ['samsung', 'oppo', 'xiaomi','huawei']
  const categories = ['phones', 'tablets']
  const [search, setSearch] = useState('')
  const [results, setResults] = useState()

  const handelSearchInputChange = (e, data) => {
    setSearch(data.value)

    data.value && searchProducts(data.value)
      .then(result => {
        console.log(result)
        const formattedResult = result.map(product => ({
          "title": product.title,
          "description": product.category,
          "image": product.imageURL,
          "price": product.price.toString()
        }))

        setResults(formattedResult)
      })
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
              { categories.map( (category , index) => (
                <Dropdown.Item key={index} text={capitalize(category)} value={category} onClick ={ (e, {value}) => setQuery(`category=${value}`)}/>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          {/* <Dropdown item text='All' simple>
            <Dropdown.Menu>
              <Dropdown.Item >
                <Icon name='dropdown' />
                <span className='text'>Office Tools</span>
                <Dropdown.Menu>
                  <Dropdown.Item>Board</Dropdown.Item>
                  <Dropdown.Item>Calculator</Dropdown.Item>
                  <Dropdown.Item>Tape</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Item>
              <Dropdown.Item>Gifts</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}

          <Menu.Menu position='right' >
            <Menu.Item fitted>
              <Search
                size='small'
                onSearchChange={handelSearchInputChange}
                value={search}
                results={results}
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