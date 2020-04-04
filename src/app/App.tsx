import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Features
import { CounterExample } from 'features/counter'
import { TodosExample } from 'features/todos'
import { UsersExample } from 'features/users'
import { SignIn } from 'features/auth'

// Components
import { Stack } from '@chakra-ui/core/dist'
import { AppLayout } from 'components/Layout'
import { PrivateRoute } from 'components'

const App = () => {
  return (
    <AppLayout>
      <Switch>
        <Route path="/login">
          <SignIn />
        </Route>

        <PrivateRoute exact path="/">
          <Stack spacing={{ base: 6, lg: 8 }}>
            <CounterExample />
            <TodosExample />
            <UsersExample />
          </Stack>
        </PrivateRoute>
      </Switch>
    </AppLayout>
  )
}

export default App
