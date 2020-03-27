import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import nanoid from 'nanoid'

// Root state type
import { RootState } from 'app/rootReducer'
import { AppThunk } from 'app/store'

// Utils
import { mockAddTodo } from 'utilities/mock'

// Action creators
import { addToast } from 'features/toasts/toastSlice'

export type Todo = {
  id: string
  description: string
  isCompleted: boolean
}

export type TodoError = {
  id: string
  errorMessage: string
}

export type TodosState = {
  data: Todo[]
  errors: TodoError[]
}

const initialState: TodosState = {
  data: [
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
  ],
  errors: [],
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.data.push(action.payload)
    },
    toggleTodo: (state, action: PayloadAction<Pick<Todo, 'id' | 'isCompleted'>>) => {
      const { id, isCompleted } = action.payload
      const todo = state.data.find((todo) => todo.id === id)

      if (todo) todo.isCompleted = !isCompleted
    },
    deleteTodo: (state, action: PayloadAction<Todo['id']>) => {
      state.data = state.data.filter((todo) => todo.id !== action.payload)
    },
    editTodo: (state, action: PayloadAction<Pick<Todo, 'id' | 'description'>>) => {
      const { id, description } = action.payload
      const todo = state.data.find((todo) => todo.id === id)

      if (todo) todo.description = description
    },
    deleteCompleted: (state) => {
      state.data = state.data.filter((todo) => !todo.isCompleted)
    },
    todoError: {
      reducer: (state, action: PayloadAction<TodoError>) => {
        state.errors.push(action.payload)
      },
      prepare: (errorMessage: TodoError['errorMessage']): { payload: TodoError } => ({
        payload: {
          id: nanoid(),
          errorMessage,
        },
      }),
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
    dispatch(todoError(err.message))
    dispatch(
      addToast({
        title: 'Could not create todo',
        status: 'error',
      })
    )
    dispatch(deleteTodo(err.todoId))
  }
}

// Action creators
export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  deleteCompleted,
  editTodo,
  todoError,
} = todosSlice.actions

// State selectors
export const selectTodos = (state: RootState) => state.todos.data
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
