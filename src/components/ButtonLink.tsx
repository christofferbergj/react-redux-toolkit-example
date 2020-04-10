import React, { forwardRef, Ref } from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'

// Components
import { Button, ButtonProps } from '@chakra-ui/core/dist'

type Props = ButtonProps & RouterLinkProps

/**
 * This is to work around the `as` prop needing generics.
 * @see https://github.com/chakra-ui/chakra-ui/issues/148#issuecomment-540457308
 */
export const ButtonLink = forwardRef<Ref<any>, Props>(({ children, ...rest }, ref) => {
  return (
    <Button ref={ref} as={RouterLink} {...rest}>
      {children}
    </Button>
  )
})
