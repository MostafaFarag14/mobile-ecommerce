import React from 'react'
import { Grid, Input } from 'semantic-ui-react'
import { removeSpaces } from '../api/helpers'

export default function OrderInformationForm({ getFieldProps, errors, touched }) {
  return (
    <Grid padded>
      {['First Name', 'Last Name', 'Email', 'Phone Number'].map((item, index) => {
        const name = removeSpaces(item).toLowerCase()
        return (<Grid.Column key={index} computer={8} mobile={16} >
          <Input fluid name={name} placeholder={item} {...getFieldProps(name)} error={touched[name]}/>
        </Grid.Column>)
      }
      )}
      <Grid.Column width={16}>
        <Input fluid placeholder='Address' name='address' {...getFieldProps('address')} error={touched['address']}/>
      </Grid.Column>
    </Grid>
  )
}
