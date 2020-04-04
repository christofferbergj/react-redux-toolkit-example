import React, { ReactNode } from 'react'

// Components
import { Box, BoxProps, useColorMode } from '@chakra-ui/core/dist'

type Props = {
  children: ReactNode
  shadowSize?: 'sm' | 'md' | 'lg'
} & BoxProps

export const ElevatedBox = ({ children, shadowSize = 'md', ...rest }: Props) => {
  const { colorMode } = useColorMode()
  const bgColor = { light: 'white', dark: 'gray.750' }

  return (
    <>
      <Box rounded={'md'} p={5} bg={bgColor[colorMode]} shadow={shadowSize} {...rest}>
        {children}
      </Box>
    </>
  )
}
