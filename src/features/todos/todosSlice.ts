import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
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
  reducers: {
    toggleTodo: (state, action: PayloadAction<Pick<Todo, 'id' | 'isCompleted'>>) => {
      const { id, isCompleted } = action.payload
      const todo = state.entities.find((todo) => todo.id === id)

      if (todo) todo.isCompleted = !isCompleted
    },
    deleteTodo: (state, action: PayloadAction<Todo['id']>) => {
      state.entities = state.entities.filter((todo) => todo.id !== action.payload)
    },
    editTodo: (state, action: PayloadAction<Pick<Todo, 'id' | 'description'>>) => {
      const { id, description } = action.payload
      const todo = state.entities.find((todo) => todo.id === id)

      if (todo) todo.description = description
    },
    deleteCompleted: (state) => {
      state.entities = state.entities.filter((todo) => !todo.isCompleted)
    },
    completeAll: (state) => {
      state.entities.forEach((todo) => {
        todo.isCompleted = true
      })
    },
  },
  extraReducers: () => {},
})

// ActionType creators
export const { toggleTodo, deleteTodo, deleteCompleted, editTodo, completeAll } = todosSlice.actions

// State selectors
export const selectTodos = (state: RootState) => state.todos
export const selectTodosCount = createSelector(selectTodos, ({ entities }) => entities.length)
export const selectActiveTodosCount = createSelector(
  selectTodos,
  ({ entities }) => entities.filter((todo) => !todo.isCompleted).length
)
export const selectCompleteTodosCount = createSelector(
  selectTodos,
  ({ entities }) => entities.filter((todo) => todo.isCompleted).length
)

export default todosSlice.reducer
