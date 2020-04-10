import React, { ReactNode } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isEmpty } from 'react-redux-firebase'
import { selectAuth } from 'features/auth/authSlice'

type Props = {
  children: ReactNode
} & RouteProps

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated or if auth is not
// yet loaded
export const PrivateRoute = ({ children, ...rest }: Props) => {
  const auth = useSelector(selectAuth)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isEmpty(auth) ? (
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
