import React from 'react'
import { useSelector } from 'react-redux'
import { selectAuth } from 'features/auth/authSlice'
import { isLoaded } from 'react-redux-firebase'

export const AuthIsLoaded = ({ children }: any) => {
  const auth = useSelector(selectAuth)
  if (!isLoaded(auth)) return <div>splash screen...</div>

  return children
}
