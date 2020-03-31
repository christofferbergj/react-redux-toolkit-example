import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/rootReducer'

// Utils
import { sleep } from 'utilities/sleep'

const API_URL = 'https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole'

export type User = {
  first: string
  last: string
  email: string
  address: string
  created: string
  balance: string
}

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_arg, { getState, requestId }) => {
    // @ts-ignore
    const { currentRequestId, loading } = getState().users

    if (loading !== 'pending' || requestId !== currentRequestId) {
      return
    }

    const response = await fetch(API_URL)
    const json = await response.json()
    json.splice(10)
    await sleep(1000)
    return json
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
