import React, { ReactNode } from 'react'

// Components
import { Flex, BoxProps, useColorMode } from '@chakra-ui/core/dist'

type Props = {
  children: ReactNode
} & BoxProps

export const AppLayout = ({ children, ...rest }: Props) => {
  const { colorMode } = useColorMode()
  const bgColor = { light: 'gray.50', dark: 'gray.900' }

  return (
    <Flex direction={'column'} minHeight={'100vh'} bg={bgColor[colorMode]} {...rest}>
      <Flex direction={'column'} flex={1}>
        {children}
      </Flex>
    </Flex>
  )
}
