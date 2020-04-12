import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/rootReducer'

// Todos selector
import { selectTodos, Todo } from 'features/todos/todosSlice'

export enum VisibilityFilters {
  SHOW_ALL = 'SHOW_ALL',
  SHOW_COMPLETED = 'SHOW_COMPLETED',
  SHOW_ACTIVE = 'SHOW_ACTIVE',
}

export const filtersSlice = createSlice({
  name: 'visibilityFilter',
  initialState: VisibilityFilters.SHOW_ALL,
  reducers: {
    setFilter: (state, action: PayloadAction<VisibilityFilters>) => {
      return action.payload
    },
  },
})

// Slice action creators
export const { setFilter } = filtersSlice.actions

// Selectors
export const selectFilter = (state: RootState) => state.visibilityFilter
export const selectVisibleTodos = createSelector(
  [selectTodos, selectFilter],
  (todos: Todo[], filter) => {
    switch (filter) {
      case VisibilityFilters.SHOW_ALL:
        return todos
      case VisibilityFilters.SHOW_COMPLETED:
        return todos.filter((todo) => todo.isCompleted)
      case VisibilityFilters.SHOW_ACTIVE:
        return todos.filter((todo) => !todo.isCompleted)
      default:
        return todos
    }
  }
)

export default filtersSlice.reducer
