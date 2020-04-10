import React, { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'react-redux-firebase'
import { useHistory } from 'react-router-dom'

import { selectAuth, selectFirebaseAuth, signIn } from './authSlice'

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
  const [showPassword, setShowPassword] = React.useState(false)
  const auth = useSelector(selectFirebaseAuth)
  const dispatch = useDispatch()
  const history = useHistory()
  const LinkColor = { light: 'purple.500', dark: 'purple.300' }
  const toast = useToast()
  const { colorMode } = useColorMode()
  const { loading, error } = useSelector(selectAuth)
  const { register, handleSubmit, errors } = useForm<FormData>()

  !isEmpty(auth) && history.push('/')

  useEffect(() => {
    error &&
      toast({
        status: 'error',
        description: error.message,
        isClosable: true,
      })
  }, [error, toast])

  const onSubmit = handleSubmit(async ({ email, password }) => {
    await dispatch(signIn({ email, password }))
  })

  return (
    <>
      <Inner>
        <ElevatedBox>
          <Heading mb={8}>Sign in</Heading>

          <Box as={'form'} onSubmit={onSubmit}>
            <Stack spacing={6} maxWidth={'containers.sm'}>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor="email">Email address</FormLabel>

                <Input
                  ref={register({
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  name="email"
                  type="text"
                  placeholder={'your-email@gmail.com'}
                  aria-describedby="email-helper-text"
                />
                <FormErrorMessage>Email is required</FormErrorMessage>
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
                isLoading={loading === 'pending'}
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
