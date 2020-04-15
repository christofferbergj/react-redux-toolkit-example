import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

// Features
import { TodosExample } from 'features/todos'
import { CounterExample } from 'features/counter'
import { UsersExample } from 'features/users'
import { SignIn, SignUp } from 'features/auth'

// Components
import { Stack } from '@chakra-ui/core/dist'
import { AppLayout } from 'components/Layout'
import { PrivateRoute } from 'components'
import { VerifiedUser } from '../components/VerifiedUser'

const App = () => {
  return (
    <Router>
      <AppLayout>
        <Switch>
          <Route path="/sign-in">
            <SignIn />
          </Route>

          <Route path="/sign-up">
            <SignUp />
          </Route>

          <PrivateRoute exact path="/">
            <Stack spacing={{ base: 6, lg: 8 }}>
              <VerifiedUser>
                <TodosExample />
              </VerifiedUser>

              <CounterExample />
              <UsersExample />
            </Stack>
          </PrivateRoute>
        </Switch>
      </AppLayout>
    </Router>
  )
}

export default App
