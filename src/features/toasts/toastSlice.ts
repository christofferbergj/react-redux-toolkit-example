import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import nanoid from 'nanoid'
import { RootState } from 'app/rootReducer'

export type Toast = {
  id: string
  title: string
  description?: string
  status?: 'error' | 'success' | 'warning'
  duration?: number
  isClosable?: boolean
}

const initialState: Toast[] = []

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: {
      reducer: (state, action: PayloadAction<Toast>) => {
        state.push(action.payload)
      },
      prepare: (payload: Omit<Toast, 'id'>): { payload: Toast } => {
        const {
          description,
          duration = 2000,
          isClosable = true,
          status = 'success',
          title,
        } = payload

        return {
          payload: {
            id: nanoid(),
            description,
            duration,
            isClosable,
            status,
            title,
          },
        }
      },
    },
    removeToast: (state, action: PayloadAction<Toast['id']>) => {
      return state.filter((toast) => toast.id !== action.payload)
    },
  },
})

// Slice actions
export const { addToast, removeToast } = toastSlice.actions

// State selectors
export const selectToasts = createSelector(
  (state: RootState) => state.toasts,
  (toasts) => toasts
)

export default toastSlice.reducer
