import React, { ReactNode } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isEmpty, useFirebase, useFirestore } from 'react-redux-firebase'
import { selectAuth } from 'features/auth/authSlice'

type Props = {
  children: ReactNode
} & RouteProps

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated or if auth is not
// yet loaded
export const PrivateRoute = ({ children, ...rest }: Props) => {
  const authState = useSelector(selectAuth)
  const auth = useFirebase().auth()
  const firestore = useFirestore()

  auth.onAuthStateChanged(async (authUser) => {
    if (!authUser) return

    const { uid, displayName, email, emailVerified, phoneNumber, photoURL } = authUser

    const userData = {
      displayName,
      email,
      emailVerified,
      phoneNumber,
      photoURL,
    }

    try {
      await firestore
        .collection('users')
        .doc(uid as string)
        .set(userData, { merge: true })
    } catch (err) {
      console.log(err)
    }
  })

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isEmpty(authState) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/sign-in',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
