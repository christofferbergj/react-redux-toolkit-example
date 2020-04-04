import React, { ReactNode } from 'react'

// Components
import { Box, BoxProps } from '@chakra-ui/core/dist'

type Props = {
  maxWidth?: 'sm' | 'md' | 'lg'
  children: ReactNode
} & BoxProps

export const Inner = ({ maxWidth = 'md', children, ...rest }: Props) => {
  return (
    <>
      <Box
        width={'full'}
        maxWidth={`containers.${maxWidth}`}
        mx={'auto'}
        px={{ base: 4, sm: 6 }}
        {...rest}
      >
        {children}
      </Box>
    </>
  )
}
