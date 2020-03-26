import { createSlice } from '@reduxjs/toolkit'

// Slices
import { todosSlice } from 'features/todos/todosSlice'
import { counterSlice } from 'features/counter/counterSlice'
import { filtersSlice } from 'features/visibilityFilter/filtersSlice'

// Root state type
import { RootState } from 'app/rootReducer'

// Action creators
const { addTodo, deleteCompleted, editTodo, deleteTodo, toggleTodo } = todosSlice.actions
const { reset, incrementByAmount, decrement, increment } = counterSlice.actions
const { setFilter } = filtersSlice.actions

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
    [reset.type]: (state) => state + 1,
    [incrementByAmount.type]: (state) => state + 1,
    [decrement.type]: (state) => state + 1,
    [increment.type]: (state) => state + 1,
    [setFilter.type]: (state) => state + 1,
  },
})

// State selector
export const actionCounterSelector = (state: RootState) => state.actionCounter

export default actionCounterSlice.reducer
