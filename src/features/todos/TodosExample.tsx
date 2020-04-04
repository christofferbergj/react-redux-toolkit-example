import React from 'react'

// Components
import { Heading } from '@chakra-ui/core/dist'
import { ElevatedBox, Inner } from 'components'
import { TodoList } from './TodoList'

export const TodosExample = ({ ...rest }) => {
  return (
    <>
      <Inner {...rest}>
        <ElevatedBox>
          <Heading mb={8} fontSize={'xl'}>
            Todos example
          </Heading>
          <TodoList />
        </ElevatedBox>
      </Inner>
    </>
  )
}
