import React from 'react'

// Features
import { Counter } from 'features/counter'
import { TodoList } from 'features/todos'

// Components
import { Heading, Stack } from '@chakra-ui/core/dist'
import { Inner } from 'components/Inner'
import { AppLayout } from 'components/AppLayout'
import { ElevatedBox } from 'components/ElevatedBox'

export const App = () => {
  return (
    <AppLayout py={10}>
      <Stack spacing={8}>
        <Inner>
          <ElevatedBox>
            <Heading mb={8} fontSize={'xl'}>
              Counter example
            </Heading>
            <Counter />
          </ElevatedBox>
        </Inner>

        <Inner>
          <ElevatedBox>
            <Heading mb={8} fontSize={'xl'}>
              Todos example
            </Heading>
            <TodoList />
          </ElevatedBox>
        </Inner>
      </Stack>
    </AppLayout>
  )
}
