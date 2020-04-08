import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

// Features
import { CounterExample } from 'features/counter'
import { TodosExample } from 'features/todos'
import { UsersExample } from 'features/users'
import { SignIn, SignUp } from 'features/auth'

// Components
import { Stack } from '@chakra-ui/core/dist'
import { AppLayout } from 'components/Layout'
import { PrivateRoute } from 'components'

const App = () => {
  return (
    <AppLayout>
      <Router>
        <Switch>
          <Route path="/sign-in">
            <SignIn />
          </Route>

          <Route path="/sign-up">
            <SignUp />
          </Route>

          <PrivateRoute exact path="/">
            <Stack spacing={{ base: 6, lg: 8 }}>
              <CounterExample />
              <TodosExample />
              <UsersExample />
            </Stack>
          </PrivateRoute>
        </Switch>
      </Router>
    </AppLayout>
  )
}

export default App
