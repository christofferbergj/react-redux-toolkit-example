import React from 'react'
import { GoMarkGithub } from 'react-icons/all'

// Slices
import { ActionCounter } from 'features/actionCounter'

// Components
import { Box, IconButton, Link, Stack, useColorMode } from '@chakra-ui/core/dist'
import { Inner } from 'components/Inner'

export const Header = ({ ...rest }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Inner display={'flex'} alignItems={'center'} {...rest}>
        <ActionCounter />

        <Stack isInline spacing={0} ml={'auto'} align={'center'}>
          <Link
            href="https://github.com/christofferberg/react-redux-toolkit-example"
            isExternal
            color={'gray.500'}
            rounded={'md'}
            p={2}
          >
            <Box as={GoMarkGithub} size={'20px'} />
          </Link>

          <IconButton
            bg={'transparent'}
            color={'gray.500'}
            aria-label={'Toggle color mode'}
            onClick={toggleColorMode}
            fontSize={'20px'}
            icon={colorMode === 'light' ? 'moon' : 'sun'}
          />
        </Stack>
      </Inner>
    </>
  )
}
