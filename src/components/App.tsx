import React from 'react'

// Features
import { Counter } from 'features/counter'
import { TodoList } from 'features/todos'

// Components
import { Stack } from '@chakra-ui/core/dist'
import { Inner } from 'components/Inner'
import { AppLayout } from 'components/AppLayout'
import { ElevatedBox } from 'components/ElevatedBox'

export const App = () => {
  return (
    <AppLayout py={10}>
      <Stack spacing={8}>
        <Inner>
          <ElevatedBox>
            <Counter />
          </ElevatedBox>
        </Inner>

        <Inner>
          <ElevatedBox>
            <TodoList />
          </ElevatedBox>
        </Inner>
      </Stack>
    </AppLayout>
  )
}
