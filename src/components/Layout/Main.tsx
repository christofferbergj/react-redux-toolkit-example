import React from 'react'

// Components
import { Box, BoxProps } from '@chakra-ui/core/dist'

export const Main = ({ children, ...rest }: BoxProps) => {
  return (
    <>
      <Box as="main" role={'main'} pt={24} mb={{ base: 20, md: 32 }} {...rest}>
        {children}
      </Box>
    </>
  )
}
