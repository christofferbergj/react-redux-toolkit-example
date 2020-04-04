import { combineReducers } from '@reduxjs/toolkit'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

// Reducers
import actionCounterReducer from 'features/actionCounter/actionCounterSlice'
import counterReducer from 'features/counter/counterSlice'
import todosReducer from 'features/todos/todosSlice'
import usersReducer from 'features/users/usersSlice'
import visibilityFilterReducer from 'features/visibilityFilter/filtersSlice'
import authReducer from 'features/auth/authSlice'

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  actionCounter: actionCounterReducer,
  counter: counterReducer,
  todos: todosReducer,
  users: usersReducer,
  visibilityFilter: visibilityFilterReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
