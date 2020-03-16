import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

// Slices
import { counterReducer } from 'features/counter/counterSlice'
import { todosReducer } from 'features/todos/todosSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
