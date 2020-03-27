import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Toast slice
import { selectToasts, removeToast, Toast } from './toastSlice'

// Components
import { useToast } from '@chakra-ui/core/dist'

export const Toasts = memo(() => {
  const dispatch = useDispatch()
  const createToast = useToast()
  const toasts = useSelector(selectToasts)
  const latestToast = toasts.slice(-1)

  console.log('toasts', toasts)
  console.log('latestToast', latestToast)

  const handleToast = (toast: Toast) => {
    createToast(toast)

    setTimeout(() => dispatch(removeToast(toast.id)), toast.duration)
  }

  return <>{latestToast.length > 0 && latestToast.map((toast: Toast) => handleToast(toast))}</>
})
