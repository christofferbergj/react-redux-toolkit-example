import React from 'react'

// Slices
import { User as UserType } from './usersSlice'

// Components
import { Box, Flex, Text } from '@chakra-ui/core/dist'

type Props = {
  user: UserType
}

export const User = ({ user: { first, last, email, address, created } }: Props) => {
  return (
    <>
      <Flex direction={'column'} p={3} borderWidth={'2px'}>
        <Text fontWeight={'bold'}>
          {first} {last}
        </Text>

        <Box fontSize={'sm'}>
          <Text isTruncated>{email}</Text>
          <Text>{address}</Text>
          <Text>{created}</Text>
        </Box>
      </Flex>
    </>
  )
}
