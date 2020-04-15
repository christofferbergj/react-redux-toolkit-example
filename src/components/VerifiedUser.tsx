import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { selectProfile } from 'features/auth/authSlice'
import { VerifyEmail } from 'features/auth/VerifyEmail'
import { Box } from '@chakra-ui/core/dist'

type Props = {
  children: ReactNode
}

/**
 * A wrapper for components that needs to have a verified email to be used
 * @param {React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined} children
 * @param {Pick<Props, never>} rest
 * @returns {any}
 * @constructor
 */
export const VerifiedUser = ({ children, ...rest }: Props) => {
  const profile: any = useSelector(selectProfile)

  return <>{profile.emailVerified ? <Box {...rest}>{children}</Box> : <VerifyEmail {...rest} />}</>
}
