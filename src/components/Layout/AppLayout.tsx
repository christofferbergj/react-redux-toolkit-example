import React, { ReactNode } from 'react'

// Components
import { Flex, BoxProps } from '@chakra-ui/core/dist'
import { Header } from './Header'
import { Footer } from './Footer'
import { Main } from './Main'

type Props = {
  children: ReactNode
} & BoxProps

export const AppLayout = ({ children, ...rest }: Props) => {
  return (
    <Flex direction={'column'} minHeight={'100vh'} {...rest}>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Flex>
  )
}
