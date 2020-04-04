import React from 'react'

// Features
import { CounterExample } from 'features/counter'
import { TodosExample } from 'features/todos'
import { UsersExample } from 'features/users'

// Components
import { Stack } from '@chakra-ui/core/dist'
import { AppLayout } from 'components/Layout'

const App = () => {
  return (
    <AppLayout>
      <Stack spacing={{ base: 6, lg: 8 }}>
        <CounterExample />
        <TodosExample />
        <UsersExample />
      </Stack>
    </AppLayout>
  )
}

export default App
