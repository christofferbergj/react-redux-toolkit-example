import React from 'react'

// Slices
import { User as UserType } from './usersSlice'

// Components
import { Box, Flex, Text, useColorMode } from '@chakra-ui/core/dist'

type Props = {
  user: UserType
}

export const User = ({ user: { first, last, email, address, created } }: Props) => {
  const { colorMode } = useColorMode()
  const borderColor = { light: 'gray.100', dark: 'gray.700' }

  return (
    <>
      <Flex direction={'column'} p={3} border={'2px'} borderColor={borderColor[colorMode]}>
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
