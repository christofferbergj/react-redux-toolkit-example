import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/rootReducer'
import { getFirebase } from 'react-redux-firebase'

export type Credentials = {
  email: string
  password: string
}

export const signIn = createAsyncThunk<Promise<void>, Credentials>(
  'auth/signIn',
  async ({ email, password }) => {
    const firebase = getFirebase()

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (err) {
      throw new Error(err)
    }
  }
)

export const signOut = createAsyncThunk('auth/signOut', async () => {
  const firebase = getFirebase()

  try {
    await firebase.auth().signOut()
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
})

export type AuthError = {
  name: string
  message: string
  stack: string
} | null

export type AuthState = {
  loading: 'idle' | 'pending'
  currentRequestId: undefined
  error: AuthError
}

const initialState: AuthState = {
  loading: 'idle',
  currentRequestId: undefined,
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [signIn.pending.type]: (state) => {
      console.log('SignIn pending')
      state.loading = 'pending'
    },
    [signIn.fulfilled.type]: (state) => {
      console.log('SignIn success')
      state.loading = 'idle'
      state.error = null
    },
    [signIn.rejected.type]: (state, { error }) => {
      console.log('SignIn failed')
      state.loading = 'idle'
      state.error = error
    },
  },
})

// Auth selector
export const selectAuth = (state: RootState) => state.auth
export const selectFirebaseAuth = (state: RootState) => state.firebase.auth

export default authSlice.reducer
