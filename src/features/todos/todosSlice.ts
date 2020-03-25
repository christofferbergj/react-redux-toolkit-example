import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import nanoid from 'nanoid'
import { RootState } from 'app/rootReducer'

export type Todo = {
  id: string
  description: string
  isCompleted: boolean
}

const initialState: Todo[] = [
  {
    id: nanoid(),
    description: 'My first todo',
    isCompleted: false,
  },
  {
    id: nanoid(),
    description: 'Create slices',
    isCompleted: false,
  },
  {
    id: nanoid(),
    description: 'Love Redux-ToolKit',
    isCompleted: false,
  },
]

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.push(action.payload)
      },
      prepare: (payload: Todo['description']): { payload: Todo } => ({
        payload: {
          id: nanoid(),
          description: payload,
          isCompleted: false,
        },
      }),
    },
    toggleTodo: (state, action: PayloadAction<Pick<Todo, 'id' | 'isCompleted'>>) => {
      const { id, isCompleted } = action.payload
      const todo = state.find((todo) => todo.id === id)

      if (todo) todo.isCompleted = !isCompleted
    },
    deleteTodo: (state, action: PayloadAction<Todo['id']>) => {
      return state.filter((todo) => todo.id !== action.payload)
    },
    editTodo: (state, action: PayloadAction<Pick<Todo, 'id' | 'description'>>) => {
      const { id, description } = action.payload
      const todo = state.find((todo) => todo.id === id)

      if (todo) todo.description = description
    },
    deleteCompleted: (state) => {
      return state.filter((todo) => !todo.isCompleted)
    },
  },
})

// Slice actions
export const { addTodo, toggleTodo, deleteTodo, deleteCompleted, editTodo } = todosSlice.actions

// Selectors
export const selectTodos = (state: RootState) => state.todos
export const selectTodosCount = createSelector(selectTodos, (todos) => todos.length)
export const selectActiveTodosCount = createSelector(
  selectTodos,
  (todos) => todos.filter((todo) => !todo.isCompleted).length
)
export const selectCompleteTodosCount = createSelector(
  selectTodos,
  (todos) => todos.filter((todo) => todo.isCompleted).length
)

export default todosSlice.reducer
