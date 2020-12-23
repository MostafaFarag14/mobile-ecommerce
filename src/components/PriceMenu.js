import React, { useCallback, useState } from 'react'
import { Button, Input } from 'semantic-ui-react'
import SliderView from 'semantic-ui-react-slider';

export default function PriceMenu({ filter, setFilter }) {
  const [minSelectedValue, setMinSelectedValue] = useState(100);
  const [maxSelectedValue, setMaxSelectedValue] = useState(8000);

  const onSliderValuesChange = useCallback((minValue, maxValue) => {
    setMinSelectedValue(minValue);
    setMaxSelectedValue(maxValue);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', marginTop: 10 }}>
        <div style={{ margin: '10px 0px' }}>
          <Input onChange={(e, { value }) => setMinSelectedValue(parseInt(value))} fluid labelPosition='left' label='From' type='number' size='mini' value={minSelectedValue} />
        </div>
        <div>
          <Input onChange={(e, { value }) => setMaxSelectedValue(parseInt(value))} fluid label='To' labelPosition='left' type='number' size='mini' value={maxSelectedValue} />
        </div>
      </div>
      <div style={{ margin: '20px 10px', marginTop: 15 }}>
        <SliderView selectedMinValue={minSelectedValue}
          selectedMaxValue={maxSelectedValue} onSliderValuesChange={onSliderValuesChange} sliderMinValue={100} sliderMaxValue={8000} />
      </div>
      <Button size='tiny' color='teal' style={{ justifySelf: 'flex-end' }} content='APPLY'

        onClick={(e, data) => setFilter({ ...filter, priceFrom: minSelectedValue, priceTo: maxSelectedValue })} />
    </div>
  )
}
