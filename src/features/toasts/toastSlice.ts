import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import nanoid from 'nanoid'
import { RootState } from 'app/rootReducer'
import { AppThunk } from 'app/store'

export type Toast = {
  id: string
  title: string
  description?: string
  type?: 'error' | 'success' | 'warning'
  duration?: number | null
  isClosable?: boolean
}

const initialState: Toast[] = []

const toastsSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    addToast: (state, { payload }: PayloadAction<Toast>) => {
      state.push(payload)
    },
    clearToast: (state, { payload }: PayloadAction<Toast['id']>) => {
      state.splice(
        state.findIndex((toast) => toast.id === payload),
        1
      )
    },
  },
})

export const createToast = (toast: Omit<Toast, 'id'>): AppThunk => (dispatch) => {
  const id = nanoid()
  const { description, duration = 5000, isClosable = false, type = 'success', title } = toast

  dispatch(
    addToast({
      id,
      title,
      type: type,
      description,
      duration,
      isClosable,
    })
  )

  duration && setTimeout(() => dispatch(clearToast(id)), duration)
}

// Slice actions
export const { addToast, clearToast } = toastsSlice.actions

// State selectors
export const selectToasts = createSelector(
  (state: RootState) => state.toasts,
  (toasts) => toasts
)

export default toastsSlice.reducer
