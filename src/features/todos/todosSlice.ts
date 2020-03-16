import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store'

export type TodoItem = {
  title: string
  id: string
  completed: boolean
}

export type TodoState = {
  todos: TodoItem[]
}

const initialState: TodoState = {
  todos: [],
}

const todos = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: state => {
      console.log('todos add')
    },
    remove: state => {},
    toggle: state => {},
  },
})

// Exporting actions from counter slice
export const { addTodo, remove, toggle } = todos.actions

/**
 * Todos state selector
 * @param {RootState} state
 * @returns {TodoState}
 */
export const selectTodos = (state: RootState) => state.todos

export const todosReducer = todos.reducer
