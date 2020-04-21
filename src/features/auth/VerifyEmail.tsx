import React from 'react'
import { ElevatedBox, Inner } from 'components'
import { Button, Heading, Text, useColorMode } from '@chakra-ui/core/dist'
import { useSendEmailVerificationLink } from 'hooks/useSendEmailVerificationLink'

export const VerifyEmail = ({ ...rest }) => {
  const { colorMode } = useColorMode()
  const { loading, sendEmailVerificationLink, emailSent } = useSendEmailVerificationLink()

  const borderColor = { light: 'yellow.400', dark: 'yellow.500' }

  return (
    <>
      <Inner {...rest}>
        <ElevatedBox borderLeft={'5px solid'} borderColor={borderColor[colorMode]}>
          <Heading mb={1} fontSize={'xl'}>
            Please verify your email
          </Heading>

          <Text>To use specific features, you need to verify your email.</Text>

          <Text>
            Check you emails (spam folder included) for a confirmation email or send another
            confirmation email
          </Text>

          <Button
            isLoading={loading || emailSent}
            loadingText={
              loading ? 'Sending email' : emailSent ? 'Awaiting confirmation' : undefined
            }
            onClick={() => sendEmailVerificationLink(true)}
            mt={6}
          >
            Send confirmation email
          </Button>
        </ElevatedBox>
      </Inner>
    </>
  )
}
