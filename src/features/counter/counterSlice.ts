import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/rootReducer'
import { AppThunk } from 'app/store'

// Utils
import { mock } from 'utilities/mock'

// Types
type CounterState = number

const initialState: CounterState = 0

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    incrementByAmount: (state, action: PayloadAction<number>) => state + action.payload,
    reset: () => initialState,
  },
})

// Slice action creators
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions

/**
 * Asynchronously increment the counter state
 * @example
 *  dispatch(incrementAsync(10))
 * @param {number} amount
 * @returns {AppThunk}
 */
export const incrementAsync = (amount: number): AppThunk => async (dispatch) => {
  try {
    await mock()
    dispatch(incrementByAmount(amount))
  } catch (err) {
    console.log(err)
  }
}

export const selectCount = (state: RootState) => state.counter

export default counterSlice.reducer
