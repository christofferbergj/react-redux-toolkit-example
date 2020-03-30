import React from 'react'

// Slices
import { User as UserType } from './usersSlice'

// Components
import { Flex, Text } from '@chakra-ui/core/dist'

type Props = {
  user: UserType
}

export const User = ({ user }: Props) => {
  const { email, id, name, username } = user

  return (
    <>
      <Flex>
        <Text>User id: {id}</Text>
        <Text>User name: {name}</Text>
        <Text>User username: {username}</Text>
        <Text>User email: {email}</Text>
      </Flex>
    </>
  )
}
