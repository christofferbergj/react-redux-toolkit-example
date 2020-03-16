import React, { ReactNode } from 'react'

// Components
import { Flex, BoxProps } from '@chakra-ui/core/dist'

type Props = {
  children: ReactNode
} & BoxProps

export const AppLayout = ({ children, ...rest }: Props) => {
  return (
    <Flex direction={'column'} minHeight={'100vh'} bg={'gray.100'} {...rest}>
      <Flex direction={'column'} flex={1}>
        {children}
      </Flex>
    </Flex>
  )
}
