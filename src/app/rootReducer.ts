import { combineReducers } from '@reduxjs/toolkit'

import counterReducer from 'features/counter/counterSlice'
import todosReducer from 'features/todos/todosSlice'
import visibilityFilterReducer from 'features/visibilityFilter/filtersSlice'
import actionCounterReducer from 'features/actionCounter/actionCounterSlice'
import toastsReducer from 'features/toasts/toastSlice'

const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todosReducer,
  visibilityFilter: visibilityFilterReducer,
  actionCounter: actionCounterReducer,
  toasts: toastsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
