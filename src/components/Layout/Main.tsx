import React from 'react'

// Components
import { BoxProps, Flex } from '@chakra-ui/core/dist'

export const Main = ({ children, ...rest }: BoxProps) => {
  return (
    <>
      <Flex
        as="main"
        role={'main'}
        direction={'column'}
        flex={1}
        pt={['90px', '100px', '125px']}
        mb={{ base: 20, md: 32 }}
        {...rest}
      >
        {children}
      </Flex>
    </>
  )
}
