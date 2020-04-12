import React from 'react'
import { useSelector } from 'react-redux'
import { selectAuth } from 'features/auth/authSlice'
import { isLoaded } from 'react-redux-firebase'

// Components
import { Box, Spinner, useColorMode } from '@chakra-ui/core/dist'

export const AuthIsLoaded = ({ children }: any) => {
  const auth = useSelector(selectAuth)
  const { colorMode } = useColorMode()
  const spinnerColor = { light: 'primary', dark: 'gray.200' }
  const spinnerEmptyColor = { light: 'gray.200', dark: 'gray.700' }

  if (!isLoaded(auth))
    return (
      <Box position={'absolute'} top={'50%'} left={'50%'} transform={'translate(-50%, -50%)'}>
        <Spinner
          size={'xl'}
          color={spinnerColor[colorMode]}
          emptyColor={spinnerEmptyColor[colorMode]}
          thickness={'4px'}
        />
      </Box>
    )

  return children
}
