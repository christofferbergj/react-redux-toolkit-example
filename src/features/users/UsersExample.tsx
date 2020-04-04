import React from 'react'
import { useDispatch } from 'react-redux'

// Slice
import { fetchUsers } from './usersSlice'

// Components
import { ElevatedBox, Inner } from 'components'
import { Button, Flex, Heading } from '@chakra-ui/core/dist'
import { Users } from './Users'

export const UsersExample = ({ ...rest }) => {
  const dispatch = useDispatch()

  return (
    <>
      <Inner {...rest}>
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
    </>
  )
}
