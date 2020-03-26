import { combineReducers } from '@reduxjs/toolkit'

import counterReducer from 'features/counter/counterSlice'
import todosReducer from 'features/todos/todosSlice'
import visibilityFilterReducer from 'features/visibilityFilter/filtersSlice'
import actionsCounterReducer from 'features/actionCounter/actionCounterSlice'

const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todosReducer,
  visibilityFilter: visibilityFilterReducer,
  actionCounter: actionsCounterReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
