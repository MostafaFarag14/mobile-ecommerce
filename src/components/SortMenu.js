import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
export default function SortMenu({ query, setQuery }) {
  const [sortOption, setSortOption] = useState()
  const options = [
    { text: 'Price: low to high', value: 'ASC' },
    { text: 'Price high to low', value: 'DESC' }
  ]
  return (
    <div>
      <span>Sort By: </span>
      <Dropdown
        options={options}
        selection
        value={sortOption}
        placeholder='Select Sort Option'
        onChange={(e, { value }) => {
          query.indexOf('_sort') === -1 ?
          setQuery(query + `&_sort=price:${value}`)
          : 
          setQuery(query.slice(0,query.indexOf('&_sort')) + `&_sort=price:${value}`)
          setSortOption(value)
        }
        }
      />
    </div>
  )
}
