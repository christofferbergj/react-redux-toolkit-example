import React from 'react'
import { useSelector } from 'react-redux'

// Toast slice
import { selectToasts } from './toastSlice'

// Components
import { Alert, AlertTitle } from '@chakra-ui/core/dist'

export const Toasts = () => {
  const toasts = useSelector(selectToasts)

  const renderToasts = () => {
    return toasts.map((toast) => (
      <Alert key={toast.id} position={'absolute'}>
        <AlertTitle>{toast.title}</AlertTitle>
      </Alert>
    ))
  }

  return <>{renderToasts()}</>
}
