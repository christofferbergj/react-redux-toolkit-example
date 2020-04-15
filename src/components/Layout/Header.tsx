import React from 'react'
import { useSelector } from 'react-redux'
import { isEmpty, useFirebase } from 'react-redux-firebase'
import { RootState } from 'app/rootReducer'
import { selectAuth } from 'features/auth/authSlice'
import { IoLogoGithub } from 'react-icons/all'

// Components
import { Inner } from 'components/Inner'
import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Flex,
  IconButton,
  Link,
  Stack,
  Text,
  Tooltip,
  useColorMode,
} from '@chakra-ui/core/dist'

export const Header = ({ ...rest }: BoxProps) => {
  const auth = useFirebase().auth()
  const authState = useSelector(selectAuth)
  const profile: any = useSelector((state: RootState) => state.firebase.profile)
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
        py={[1, 2]}
        mb={10}
        borderBottomWidth={'1px'}
        {...rest}
      >
        <Inner display={'flex'} alignItems={'center'}>
          {profile.email && (
            <Tooltip
              label={profile.email}
              aria-label={profile.email}
              fontSize={'xs'}
              placement="bottom"
              zIndex={11}
            >
              <Flex alignItems={'center'}>
                <Avatar name={profile.displayName} src={profile.photoURL} size={'sm'} />
                {profile.displayName && (
                  <Text fontWeight={'medium'} lineHeight={'shorter'} ml={3} fontSize={'sm'}>
                    {profile.displayName}
                  </Text>
                )}
              </Flex>
            </Tooltip>
          )}

          <Stack isInline spacing={3} ml={'auto'} align={'center'}>
            {!isEmpty(authState) && (
              <Button onClick={() => auth.signOut()} size={'xs'}>
                Sign out
              </Button>
            )}

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
