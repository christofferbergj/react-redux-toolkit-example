import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/rootReducer'

// Todos selector
import { selectTodos } from 'features/todos/todosSlice'

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
export const selectVisibleTodos = createSelector([selectTodos, selectFilter], (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos.entities
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.entities.filter((todo) => todo.isCompleted)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.entities.filter((todo) => !todo.isCompleted)
    default:
      return todos.entities
  }
})

export default filtersSlice.reducer
