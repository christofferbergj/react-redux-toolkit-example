import React from 'react'

// Features
import { ActionCounter } from 'features/actionCounter'
import { Counter } from 'features/counter'
import { TodoList } from 'features/todos'
import { Users } from 'features/users/Users'

// Components
import { Heading, Stack } from '@chakra-ui/core/dist'
import { AppLayout, ElevatedBox, Inner } from 'components'

const App = () => {
  return (
    <AppLayout py={10}>
      <Stack spacing={8}>
        <Inner>
          <ActionCounter />
        </Inner>

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

        <Inner>
          <ElevatedBox>
            <Heading mb={8} fontSize={'xl'}>
              Users example
            </Heading>
            <Users />
          </ElevatedBox>
        </Inner>
      </Stack>
    </AppLayout>
  )
}

export default App
