import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import nanoid from 'nanoid'

// Root state type
import { RootState } from 'app/rootReducer'

// Utils
import { AppDispatch } from 'app/store'

export const TODOS_COLLECTION = 'todos'

export const addTodoFirebase: any = createAsyncThunk<
  any,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    extra: {
      getFirebase: Function
    }
  }
>(
  'todos/addTodoFirebase',
  async (payload, { dispatch, rejectWithValue, requestId, getState, extra: { getFirebase } }) => {
    const { currentRequestId, loading } = getState().todos

    // Single request at a time
    if (loading === 'pending' && requestId !== currentRequestId) return

    const todo: Todo = {
      id: nanoid(),
      description: payload,
      isCompleted: false,
    }

    dispatch(addTodo(todo))

    try {
      // firestore.collection(TODOS_COLLECTION).add({ todo })
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export type Todo = {
  id: string
  description: string
  isCompleted: boolean
}

export type TodosState = {
  entities: Todo[]
  loading: 'idle' | 'pending'
  currentRequestId: undefined
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
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.entities.push(action.payload)
    },
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
  extraReducers: {
    [addTodoFirebase.pending.type]: (state, { meta }) => {
      state.loading = 'pending'
      state.currentRequestId = meta.requestId
    },
    [addTodoFirebase.fulfilled.type]: (state) => {
      state.loading = 'idle'
      state.currentRequestId = undefined
    },
    [addTodoFirebase.rejected.type]: (state, { payload }) => {
      state.loading = 'idle'
      state.entities = state.entities.filter((todo) => todo.id !== payload.id)
      state.currentRequestId = undefined
      state.error = payload
    },
  },
})

// ActionType creators
export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  deleteCompleted,
  editTodo,
  completeAll,
} = todosSlice.actions

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
