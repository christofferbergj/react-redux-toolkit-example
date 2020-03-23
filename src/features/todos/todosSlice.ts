import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import nanoid from 'nanoid'
import { RootState } from 'store'

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
    create: {
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
    toggle: (state, action: PayloadAction<Pick<Todo, 'id' | 'isCompleted'>>) => {
      const { id, isCompleted } = action.payload
      const todo = state.find(todo => todo.id === id)

      if (todo) {
        todo.isCompleted = !isCompleted
      }
    },
    remove: (state, action: PayloadAction<Todo['id']>) => {
      return state.filter(todo => todo.id !== action.payload)
    },
  },
})

// Exporting actions from counter slice
export const { create, toggle, remove } = todosSlice.actions

/**
 * Todos state selector
 * @param {RootState} state
 * @returns {TodoState}
 */
export const selectTodos = (state: RootState) => state.todos

export const todosReducer = todosSlice.reducer
