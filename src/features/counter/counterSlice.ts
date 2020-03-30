import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/rootReducer'
import { AppThunk } from 'app/store'

// Utils
import { mock } from 'utilities/mock'

// Actions
import { startAction, stopAction } from 'features/ui/uiSlice'

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
 *  dispatch(incrementByAmountAsync(10))
 * @returns {AppThunk}
 * @param payload
 */
export const incrementByAmountAsync = (payload: number): AppThunk => async (dispatch) => {
  const { type } = incrementByAmount

  try {
    dispatch(startAction(type))
    await mock()
    dispatch(incrementByAmount(payload))
  } catch (err) {
    console.log(err)
  } finally {
    dispatch(stopAction(type))
  }
}

export const selectCount = (state: RootState) => state.counter

export default counterSlice.reducer
