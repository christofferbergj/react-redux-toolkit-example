import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
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
  Stack,
} from '@chakra-ui/core/dist'
import { isEmpty } from 'react-redux-firebase'

type FormData = {
  email: string
  password: string
}

export const SignIn = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { loading } = useSelector(selectAuth)
  const auth = useSelector(selectFirebaseAuth)
  const { register, handleSubmit, errors } = useForm<FormData>()
  const [showPassword, setShowPassword] = React.useState(false)

  !isEmpty(auth) && history.push('/')

  const handleShowPassword = () => setShowPassword(!showPassword)
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
                  ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                  name="email"
                  type="text"
                  id="email"
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
                    id="password"
                    pr="4.5rem"
                    placeholder="Enter password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
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
      </Inner>
    </>
  )
}
