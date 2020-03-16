import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import nanoid from 'nanoid'
import { RootState } from 'store'

export type Todo = {
  id: string
  desc: string
  isCompleted: boolean
}

const initialState: Todo[] = [
  {
    id: nanoid(),
    desc: 'My first todo',
    isCompleted: false,
  },
  {
    id: nanoid(),
    desc: 'Create slices',
    isCompleted: false,
  },
  {
    id: nanoid(),
    desc: 'Love Redux-ToolKit',
    isCompleted: false,
  },
]

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    edit: (state, { payload }: PayloadAction<Omit<Todo, 'isCompleted'>>) => {
      const todo = state.find(todo => todo.id === payload.id)

      if (todo) {
        todo.desc = payload.desc
      }
    },
    toggle: (state, { payload }: PayloadAction<string>) => {
      const todo = state.find(todo => todo.id === payload)

      if (todo) {
        todo.isCompleted = !todo.isCompleted
      }
    },
  },
})

// Exporting actions from counter slice
export const { edit, toggle } = todosSlice.actions

/**
 * Todos state selector
 * @param {RootState} state
 * @returns {TodoState}
 */
export const selectTodos = (state: RootState) => state.todos

export const todosReducer = todosSlice.reducer
