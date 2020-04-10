import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { isEmpty, useFirebase } from 'react-redux-firebase'
import { useHistory } from 'react-router-dom'

import { selectAuth } from './authSlice'

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
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState<'idle' | 'pending'>('idle')
  const auth = useFirebase().auth()
  const authState = useSelector(selectAuth)
  const history = useHistory()
  const LinkColor = { light: 'purple.500', dark: 'purple.300' }
  const toast = useToast()
  const { colorMode } = useColorMode()
  const { register, handleSubmit, errors } = useForm<FormData>()

  !isEmpty(authState) && history.push('/')

  const handleSignIn = handleSubmit(async ({ email, password }) => {
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
          <Heading mb={8}>Sign in</Heading>

          <Box as={'form'} onSubmit={handleSignIn}>
            <Stack spacing={6} maxWidth={'containers.sm'}>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor="email">Email address</FormLabel>

                <Input
                  defaultValue={'christofferbergj@gmail.com'}
                  ref={register({
                    required: 'Email is required',
                    pattern: {
                      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Is your email correct?',
                    },
                  })}
                  name="email"
                  type="text"
                  placeholder={'email@domain.com'}
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

              <Button
                type={'submit'}
                isLoading={isLoading === 'pending'}
                mt={6}
                alignSelf={'flex-start'}
              >
                Sign in
              </Button>
            </Stack>
          </Box>
        </ElevatedBox>

        <Text mt={5} fontSize={'sm'}>
          If you don't have an account, go to {/*
          // @ts-ignore */}
          <Link as={RouterLink} to={'/sign-up'} color={LinkColor[colorMode]}>
            sign up
          </Link>
        </Text>
      </Inner>
    </>
  )
}
