import React, { useState, useEffect } from 'react'
import { Accordion, Form, Menu } from 'semantic-ui-react'
import qs from 'qs'
import PriceMenu from './PriceMenu'
import { capitalize } from '../api/helpers'


const Filter = ({ setQuery }) => {

  const [filter, setFilter] = useState({
    brand: [],
    category: [],
    color: [],
    priceFrom: [],
    priceTo: []
  })

  useEffect(() => {
    const query = qs.stringify({
      _where: Object.keys(filter).map(key => {
        if (key === 'priceFrom') {
          return { 'price_gte': filter[key] }
        }
        else if (key === 'priceTo') {
          return { 'price_lte': filter[key] }
        }
        else
          return { [key]: filter[key] }
      })
    });
    console.log(query)
    setQuery(query)

  }, [filter])

  const [activeIndexes, setActiveIndexes] = useState([])

  const menu = {
    color: ['red', 'orange', 'green', 'blue'],
    brand: ['adel', 'prima', 'panda'],
    category: ['school products', 'office tools'],
    price: []
  }


  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    activeIndexes.includes(index) ?
      setActiveIndexes(activeIndexes.filter(item => item !== index))
      :
      setActiveIndexes([...activeIndexes, index])
  }

  const handleMenuClick = (e, data, key) => {
    filter[key].includes(data.value) ?
      setFilter({ ...filter, [key]: filter[key].filter(item => item !== data.value) })
      :
      setFilter({ ...filter, [key]: [...filter[key], data.value] })
  }
  return (
    <div style={{ width: '20%', marginTop: 20 }}>

      <Accordion as={Menu} vertical>
        {
          Object.keys(menu).map(key => {
            return (
              <Menu.Item key={key}>
                <Accordion.Title
                  active={activeIndexes.includes(key)}
                  content={capitalize(key)}
                  index={key}
                  onClick={handleClick}
                />
                {
                  key === 'price' ?
                    <Accordion.Content active={activeIndexes.includes(key)}>
                      <PriceMenu filter={filter} setFilter={setFilter} />
                    </Accordion.Content>
                    :
                    <Accordion.Content active={activeIndexes.includes(key)}>
                      <Form>
                        <Form.Group grouped >
                          {menu[key].map((value, index) => {
                            return (<Form.Checkbox
                              key={index} label={capitalize(value)}
                              name={value}
                              checked={filter[key].includes(value) ? true : false}
                              value={value}
                              onClick={(e, data) => handleMenuClick(e, data, key)}
                            />)
                          })}
                        </Form.Group>
                      </Form>
                    </Accordion.Content>
                }
              </Menu.Item>
            )
          })
        }
      </Accordion>
    </div>
  )

}

export default Filter;