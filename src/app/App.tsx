import React from 'react'
import { useDispatch } from 'react-redux'

// Slices
import { fetchUsers } from 'features/users/usersSlice'

// Features
import { Counter } from 'features/counter'
import { TodoList } from 'features/todos'
import { Users } from 'features/users/Users'

// Components
import { Button, Flex, Heading, Stack } from '@chakra-ui/core/dist'
import { AppLayout, ElevatedBox, Inner } from 'components'
import { Header } from 'components/Layout'

const App = () => {
  const dispatch = useDispatch()

  return (
    <AppLayout py={10}>
      <Stack spacing={{ base: 6, lg: 8 }}>
        <Header />

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
            <Flex align={'center'} mb={8}>
              <Heading fontSize={'xl'}>Users example</Heading>

              <Button onClick={() => dispatch(fetchUsers())} size={'sm'} ml={'auto'}>
                Fetch users
              </Button>
            </Flex>

            <Users />
          </ElevatedBox>
        </Inner>
      </Stack>
    </AppLayout>
  )
}

export default App
