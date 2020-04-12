import { createSelector, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/rootReducer'

export type Todo = {
  id: string
  description: string
  isCompleted: boolean
}

export type TodosState = {
  entities: Todo[]
  loading: 'idle' | 'pending'
  currentRequestId: string | undefined
  error: any
}

const initialState: TodosState = {
  entities: [],
  loading: 'idle',
  currentRequestId: undefined,
  error: null,
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: () => {},
})

// State selectors
export const selectTodos = (state: RootState) => state.firestore.ordered.todos
export const selectTodosCount = createSelector(selectTodos, (todos) => todos.length)
export const selectActiveTodosCount = createSelector(
  selectTodos,
  (todos: Todo[]) => todos && todos.filter((todo) => !todo.isCompleted).length
)
export const selectCompleteTodosCount = createSelector(
  selectTodos,
  (todos: Todo[]) => todos && todos.filter((todo) => todo.isCompleted).length
)

export default todosSlice.reducer
