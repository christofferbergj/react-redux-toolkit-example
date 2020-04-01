import { createSlice } from '@reduxjs/toolkit'

// Root state type
import { RootState } from 'app/rootReducer'

// Slices
import { todosSlice } from 'features/todos/todosSlice'
import { counterSlice, incrementByAmountAsync } from 'features/counter/counterSlice'
import { filtersSlice } from 'features/visibilityFilter/filtersSlice'
import { fetchUsers } from 'features/users/usersSlice'

// Action creators
const {
  addTodo,
  deleteCompleted,
  editTodo,
  deleteTodo,
  toggleTodo,
  completeAll,
} = todosSlice.actions
const { reset, incrementByAmount, decrement, increment } = counterSlice.actions
const { setFilter } = filtersSlice.actions

// Async action creators
const {
  rejected: fetchUsersRejected,
  fulfilled: fetchUsersFulfilled,
  pending: fetchUsersPending,
} = fetchUsers

const {
  rejected: incrementByAmountAsyncRejected,
  fulfilled: incrementByAmountAsyncFulfilled,
  pending: incrementByAmountAsyncPending,
} = incrementByAmountAsync

const actionCounterSlice = createSlice({
  name: 'actionsCounter',
  initialState: 0,
  reducers: {},
  extraReducers: {
    [addTodo.type]: (state) => state + 1,
    [deleteCompleted.type]: (state) => state + 1,
    [editTodo.type]: (state) => state + 1,
    [deleteTodo.type]: (state) => state + 1,
    [toggleTodo.type]: (state) => state + 1,
    [completeAll.type]: (state) => state + 1,
    [reset.type]: (state) => state + 1,
    [incrementByAmount.type]: (state) => state + 1,
    [decrement.type]: (state) => state + 1,
    [increment.type]: (state) => state + 1,
    [setFilter.type]: (state) => state + 1,
    [fetchUsersRejected.type]: (state) => state + 1,
    [fetchUsersFulfilled.type]: (state) => state + 1,
    [fetchUsersPending.type]: (state) => state + 1,
    [incrementByAmountAsyncRejected.type]: (state) => state + 1,
    [incrementByAmountAsyncFulfilled.type]: (state) => state + 1,
    [incrementByAmountAsyncPending.type]: (state) => state + 1,
  },
})

// State selector
export const actionCounterSelector = (state: RootState) => state.actionCounter

export default actionCounterSlice.reducer
