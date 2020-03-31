import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import nanoid from 'nanoid'

// Root state type
import { RootState } from 'app/rootReducer'
import { AppThunk } from 'app/store'

// Utils
import { mockAddTodo } from 'utilities/mockIncrement'

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

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload)
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

export const addTodoAsync = (payload: Todo['description']): AppThunk => async (dispatch) => {
  const todo: Todo = {
    id: nanoid(),
    description: payload,
    isCompleted: false,
  }

  dispatch(addTodo(todo))

  try {
    await mockAddTodo(todo, 500)
  } catch (err) {
    dispatch(deleteTodo(err.todoId))
  }
}

// ActionType creators
export const { addTodo, toggleTodo, deleteTodo, deleteCompleted, editTodo } = todosSlice.actions

// State selectors
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
