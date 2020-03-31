import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/rootReducer'

export type User = {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
}

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_arg, { getState, requestId }) => {
    // @ts-ignore
    const { currentRequestId, loading } = getState().users

    if (loading !== 'pending' || requestId !== currentRequestId) {
      return
    }

    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    return await response.json()
  }
)

type UsersState = {
  entities: User[]
  loading: 'idle' | 'pending'
  currentRequestId: string | undefined
  error: any
}

const initialState: UsersState = {
  entities: [],
  loading: 'idle',
  currentRequestId: undefined,
  error: null,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending.type]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },
    [fetchUsers.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.entities = action.payload
        state.currentRequestId = undefined
      }
    },
    [fetchUsers.rejected.type]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = action.error
        state.currentRequestId = undefined
      }
    },
  },
})

// Selectors
export const selectUsers = (state: RootState) => state.users

export default usersSlice.reducer
