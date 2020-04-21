import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { isEmpty, useFirebase } from 'react-redux-firebase'
import { useHistory } from 'react-router-dom'
import { IoLogoGoogle } from 'react-icons/all'

import { handleSignInWithGoogle, selectAuth } from './authSlice'

// Components
import { ElevatedBox, Inner } from 'components'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorMode,
  useToast,
} from '@chakra-ui/core/dist'

type FormData = {
  email: string
  password: string
}

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState<'idle' | 'pending'>('idle')
  const [showPassword, setShowPassword] = useState(false)
  const auth = useFirebase().auth()
  const authState = useSelector(selectAuth)
  const history = useHistory()
  const LinkColor = { light: 'purple.500', dark: 'purple.300' }
  const toast = useToast()
  const { colorMode } = useColorMode()
  const { register, handleSubmit, errors } = useForm<FormData>()

  !isEmpty(authState) && history.push('/')

  const handleSignInWithEmailAndPassword = handleSubmit(async ({ email, password }) => {
    try {
      setIsLoading('pending')
      await auth.signInWithEmailAndPassword(email, password)
    } catch ({ code, message }) {
      toast({
        status: 'error',
        title: code,
        description: message,
        isClosable: true,
      })
    } finally {
      setIsLoading('idle')
    }
  })

  return (
    <>
      <Inner>
        <ElevatedBox>
          <Heading size={'lg'} mb={8}>
            Sign in
          </Heading>

          <Box as={'form'} onSubmit={handleSignInWithEmailAndPassword}>
            <Stack spacing={6} maxWidth={'containers.sm'}>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor="email">Email address</FormLabel>

                <Input
                  ref={register({
                    required: 'Email is required',
                    pattern: {
                      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Is your email correct?',
                    },
                  })}
                  name="email"
                  type="text"
                  placeholder={'john.doe@domain.com'}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    ref={register({ required: true })}
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    pr="4.5rem"
                    placeholder="Enter password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <FormErrorMessage>Password is required</FormErrorMessage>
              </FormControl>

              <Stack isInline spacing={3} align={'center'} mt={6}>
                <Button type={'submit'} size={'sm'} isLoading={isLoading === 'pending'}>
                  Sign in
                </Button>

                <Button onClick={handleSignInWithGoogle} size={'sm'} leftIcon={IoLogoGoogle}>
                  Sign in with Google
                </Button>
              </Stack>
            </Stack>
          </Box>
        </ElevatedBox>

        <Text mt={5} fontSize={'sm'}>
          Don't have an account? Sign up {/*
          // @ts-ignore */}
          <Link as={RouterLink} to={'/sign-up'} color={LinkColor[colorMode]}>
            here
          </Link>
        </Text>
      </Inner>
    </>
  )
}
