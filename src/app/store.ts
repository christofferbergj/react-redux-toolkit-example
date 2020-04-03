import { configureStore, Action } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import { createFirestoreInstance } from 'redux-firestore'

import firebase from './firebase'
import rootReducer, { RootState } from './rootReducer'

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
}

const store = configureStore({
  reducer: rootReducer,
})

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
}

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default store
