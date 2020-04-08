import React, { useEffect } from 'react'
import { isEmpty } from 'react-redux-firebase'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

// Auth slice
import { selectAuth, signUp, NewUser, selectFirebaseAuth } from 'features/auth/authSlice'

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
  Stack,
  useToast,
} from '@chakra-ui/core/dist'

export const SignUp = () => {
  const auth = useSelector(selectFirebaseAuth)
  const dispatch = useDispatch()
  const history = useHistory()
  const toast = useToast()
  const { loading, error } = useSelector(selectAuth)
  const { register, handleSubmit, errors } = useForm<NewUser>()
  const [showPassword, setShowPassword] = React.useState(false)

  !isEmpty(auth) && history.push('/')

  useEffect(() => {
    error && toast({ status: 'error', description: error.message, isClosable: true })
  }, [error, toast])

  const onSubmit = handleSubmit((data) => {
    dispatch(signUp(data))
  })

  return (
    <>
      <Inner>
        <ElevatedBox>
          <Heading mb={8}>Sign up</Heading>

          <Box as={'form'} onSubmit={onSubmit}>
            <Stack spacing={6} maxWidth={'containers.sm'}>
              <FormControl isInvalid={!!errors.firstName}>
                <FormLabel htmlFor={'firstName'}>First name</FormLabel>
                <Input
                  defaultValue={'Christoffer Berg'}
                  ref={register({
                    required: 'First name is required',
                    maxLength: {
                      value: 32,
                      message: 'First name too long',
                    },
                  })}
                  name={'firstName'}
                  type={'text'}
                />

                <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.lastName}>
                <FormLabel htmlFor={'lastName'}>Last name</FormLabel>
                <Input
                  defaultValue={'Jensen'}
                  ref={register({
                    required: 'Last name is required',
                    maxLength: {
                      value: 32,
                      message: 'Last name is too long',
                    },
                  })}
                  name={'lastName'}
                  type={'text'}
                />

                <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
              </FormControl>

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
                    minLength: {
                      value: 3,
                      message: 'too slow',
                    },
                  })}
                  name="email"
                  type="text"
                  placeholder={'email@domain.com'}
                  aria-describedby="email-helper-text"
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    ref={register({
                      required: 'Password is required',
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

              <Button
                type={'submit'}
                isLoading={loading === 'pending'}
                mt={6}
                alignSelf={'flex-start'}
              >
                Sign up
              </Button>
            </Stack>
          </Box>
        </ElevatedBox>
      </Inner>
    </>
  )
}
