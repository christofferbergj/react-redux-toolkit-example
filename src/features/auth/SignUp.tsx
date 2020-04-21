import React, { useState } from 'react'
import { isEmpty, useFirebase, useFirestore } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { timestamp } from 'app/firebase'

// Auth slice
import { handleSignInWithGoogle, NewUser, selectAuth } from 'features/auth/authSlice'

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
import { IoLogoGoogle } from 'react-icons/all'

export const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = useState<'idle' | 'pending'>('idle')
  const auth = useFirebase().auth()
  const firestore = useFirestore()
  const authState = useSelector(selectAuth)
  const history = useHistory()
  const toast = useToast()
  const { colorMode } = useColorMode()
  const { register, handleSubmit, errors } = useForm<NewUser>()

  const LinkColor = { light: 'purple.500', dark: 'purple.300' }

  !isEmpty(authState) && history.push('/')

  const handleSignUp = handleSubmit(async ({ email, password, firstName, lastName }: NewUser) => {
    setIsLoading('pending')
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password)

      firestore
        .collection('users')
        .doc(user?.uid as string)
        .set({
          firstName,
          lastName,
          initials: firstName[0] + lastName[0],
          createdAt: timestamp(),
        })
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
            Sign up
          </Heading>

          <Box as={'form'} onSubmit={handleSignUp}>
            <Stack spacing={6} maxWidth={'containers.sm'}>
              <FormControl isInvalid={!!errors.firstName}>
                <FormLabel htmlFor={'firstName'}>First name</FormLabel>
                <Input
                  ref={register({
                    required: 'First name is required',
                    maxLength: {
                      value: 32,
                      message: 'First name too long',
                    },
                  })}
                  name={'firstName'}
                  type={'text'}
                  placeholder="John"
                />

                <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.lastName}>
                <FormLabel htmlFor={'lastName'}>Last name</FormLabel>
                <Input
                  ref={register({
                    required: 'Last name is required',
                    maxLength: {
                      value: 32,
                      message: 'Last name is too long',
                    },
                  })}
                  name={'lastName'}
                  type={'text'}
                  placeholder="Doe"
                />

                <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
              </FormControl>

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
                    ref={register({
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password should be at least 6 characters',
                      },
                    })}
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

                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>

              <Stack isInline spacing={3} align={'center'} mt={6}>
                <Button
                  type={'submit'}
                  size={'sm'}
                  isLoading={isLoading === 'pending'}
                  alignSelf={'flex-start'}
                >
                  Sign up
                </Button>

                <Button onClick={handleSignInWithGoogle} size={'sm'} leftIcon={IoLogoGoogle}>
                  Sign up with Google
                </Button>
              </Stack>
            </Stack>
          </Box>
        </ElevatedBox>

        <Text mt={5} fontSize={'sm'}>
          If you already have an account, go to {/*
          // @ts-ignore */}
          <Link as={RouterLink} to={'/sign-in'} color={LinkColor[colorMode]}>
            sign in
          </Link>
        </Text>
      </Inner>
    </>
  )
}
