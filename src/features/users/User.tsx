import React from 'react'

// Slices
import { User as UserType } from './usersSlice'

// Components
import { Box, Flex, Text } from '@chakra-ui/core/dist'

type Props = {
  user: UserType
}

export const User = ({ user }: Props) => {
  const { first, last, email, address, created } = user

  return (
    <>
      <Flex direction={'column'} p={3} bg={'gray.50'}>
        <Text fontWeight={'semibold'}>
          {first} {last}
        </Text>

        <Box fontSize={'sm'}>
          <Text>{email}</Text>
          <Text>{address}</Text>
          <Text>{created}</Text>
        </Box>
      </Flex>
    </>
  )
}
