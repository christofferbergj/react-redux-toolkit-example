import { useState } from 'react'
import { useToast } from '@chakra-ui/core/dist'
import { useFirebase } from 'react-redux-firebase'

export const useSendEmailVerificationLink = () => {
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const toast = useToast()
  const auth = useFirebase().auth()

  const sendEmailVerificationLink = async (showSuccessToast: boolean = false) => {
    try {
      setLoading(true)

      await auth?.currentUser?.sendEmailVerification({
        url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT as string,
      })

      setEmailSent(true)

      showSuccessToast &&
        toast({
          status: 'success',
          title: 'Email was sent',
          description: 'Please verify your email by clicking the link in the email we sent you',
        })
    } catch ({ code, message }) {
      setEmailSent(false)
      toast({
        status: 'error',
        title: code,
        description: message,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    emailSent,
    sendEmailVerificationLink,
  }
}
