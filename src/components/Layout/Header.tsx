import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'react-redux-firebase'
import { IoLogoGithub } from 'react-icons/all'

// Slices
import { selectFirebaseAuth, signOut } from 'features/auth/authSlice'

// Components
import {
  Box,
  BoxProps,
  Button,
  Flex,
  IconButton,
  Link,
  Stack,
  Tooltip,
  useColorMode,
} from '@chakra-ui/core/dist'
import { Inner } from 'components/Inner'

export const Header = ({ ...rest }: BoxProps) => {
  const dispatch = useDispatch()
  const auth = useSelector(selectFirebaseAuth)
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = { light: 'gray.50', dark: 'gray.800' }

  return (
    <>
      <Box
        as="header"
        role={'banner'}
        position={'fixed'}
        width={'100%'}
        zIndex={10}
        bg={bgColor[colorMode]}
        py={3}
        mb={10}
        borderBottomWidth={'1px'}
        {...rest}
      >
        <Inner display={'flex'} alignItems={'center'}>
          {!isEmpty(auth) && (
            <Button onClick={() => dispatch(signOut())} size={'xs'}>
              Sign out
            </Button>
          )}

          <Stack isInline spacing={3} ml={'auto'} align={'center'}>
            <Flex align={'center'}>
              <Link
                href="https://github.com/christofferberg/react-redux-toolkit-example"
                isExternal
                color={'gray.500'}
                rounded={'md'}
                p={2}
              >
                <Box as={IoLogoGithub} size={'20px'} />
              </Link>

              <Tooltip
                aria-label={colorMode === 'light' ? 'Toggle dark mode' : 'Toggle light mode'}
                label={colorMode === 'light' ? 'Toggle dark mode' : 'Toggle light mode'}
                showDelay={1000}
                fontSize="xs"
              >
                <IconButton
                  bg={'transparent'}
                  color={'gray.500'}
                  aria-label={'Toggle color mode'}
                  onClick={toggleColorMode}
                  fontSize={'20px'}
                  icon={colorMode === 'light' ? 'moon' : 'sun'}
                />
              </Tooltip>
            </Flex>
          </Stack>
        </Inner>
      </Box>
    </>
  )
}
