import React, { ReactNode } from 'react'

// Components
import { Box, BoxProps } from '@chakra-ui/core/dist'

type Props = {
  children: ReactNode
  shadowSize?: 'sm' | 'md' | 'lg'
} & BoxProps

export const ElevatedBox = ({ children, shadowSize = 'md', ...rest }: Props) => {
  return (
    <>
      <Box rounded={'md'} p={5} bg={'white'} shadow={shadowSize} {...rest}>
        {children}
      </Box>
    </>
  )
}
