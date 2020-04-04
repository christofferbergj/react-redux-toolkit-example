import React from 'react'

// Components
import { ElevatedBox, Inner } from 'components'
import { Heading } from '@chakra-ui/core/dist'
import { Counter } from './Counter'

export const CounterExample = ({ ...rest }) => {
  return (
    <>
      <Inner {...rest}>
        <ElevatedBox>
          <Heading mb={8} fontSize={'xl'}>
            Counter example
          </Heading>
          <Counter />
        </ElevatedBox>
      </Inner>
    </>
  )
}
