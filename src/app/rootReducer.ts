import { combineReducers } from '@reduxjs/toolkit'

// Reducers
import actionCounterReducer from 'features/actionCounter/actionCounterSlice'
import counterReducer from 'features/counter/counterSlice'
import todosReducer from 'features/todos/todosSlice'
import uiReducer from 'features/ui/uiSlice'
import usersReducer from 'features/users/usersSlice'
import visibilityFilterReducer from 'features/visibilityFilter/filtersSlice'

const rootReducer = combineReducers({
  actionCounter: actionCounterReducer,
  counter: counterReducer,
  todos: todosReducer,
  ui: uiReducer,
  users: usersReducer,
  visibilityFilter: visibilityFilterReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
