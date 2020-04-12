import React from 'react'

// Components
import { Box, Heading, Text } from '@chakra-ui/core/dist'
import { ElevatedBox, Inner } from 'components'
import { TodoList } from './TodoList'

export const TodosExample = ({ ...rest }) => {
  return (
    <>
      <Inner {...rest}>
        <ElevatedBox>
          <Box mb={8}>
            <Heading mb={1} fontSize={'xl'}>
              Todos example
            </Heading>

            <Text fontSize={'sm'}>
              Connected to Firestore realtime{' '}
              <span role={'img'} aria-label={'Fire emoji'}>
                🔥
              </span>
            </Text>
          </Box>

          <TodoList />
        </ElevatedBox>
      </Inner>
    </>
  )
}
