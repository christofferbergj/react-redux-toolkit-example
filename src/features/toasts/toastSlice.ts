import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import nanoid from 'nanoid'
import { RootState } from 'app/rootReducer'
import { AppThunk } from 'app/store'

export type Toast = {
  id: string
  title: string
  description?: string
  status?: 'error' | 'success' | 'warning'
  duration?: number
  isClosable?: boolean
}

const initialState: Toast[] = []

const toastsSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Toast>) => {
      state.push(action.payload)
    },
    removeToast: (state, action: PayloadAction<Toast['id']>) => {
      return state.filter((toast) => toast.id !== action.payload)
    },
  },
})

export const createToast = (toast: Omit<Toast, 'id'>): AppThunk => (dispatch) => {
  console.log('createToast')
  const id = nanoid()
  const { description, duration = 4000, isClosable = true, status = 'success', title } = toast

  dispatch(
    addToast({
      id,
      title,
      status,
      description,
      duration,
      isClosable,
    })
  )

  setTimeout(() => dispatch(removeToast(id)), duration)
}

// Slice actions
export const { addToast, removeToast } = toastsSlice.actions

// State selectors
export const selectToasts = createSelector(
  (state: RootState) => state.toasts,
  (toasts) => toasts
)

export default toastsSlice.reducer
