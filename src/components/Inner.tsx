import React, { ReactNode } from 'react'

// Components
import { Box, BoxProps } from '@chakra-ui/core/dist'

type Props = {
  children: ReactNode
} & BoxProps

export const Inner = ({ children, ...rest }: Props) => {
  return (
    <>
      <Box width={'full'} maxWidth={'800px'} mx={'auto'} px={{ base: 4, sm: 6 }} {...rest}>
        {children}
      </Box>
    </>
  )
}
