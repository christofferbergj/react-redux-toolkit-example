import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import nanoid from 'nanoid'
import { AppDispatch } from 'app/store'
import { RootState } from 'app/rootReducer'

export type Credentials = {
  email: string
  password: string
}

export const signIn: any = createAsyncThunk<
  any,
  Credentials,
  {
    dispatch: AppDispatch
    state: RootState
    extra: {
      getFirebase: Function
    }
  }
>('auth/signIn', async ({ password, email }, thunkAPI) => {
  const {
    rejectWithValue,
    extra: { getFirebase },
  } = thunkAPI

  const firebase = getFirebase()

  try {
    await firebase.auth().signInWithEmailAndPassword(email, password)
  } catch (err) {
    const { code, message } = err
    return rejectWithValue({ code, message, id: nanoid() })
  }
})

export type AuthError = {
  code: string
  message: string
  id: string
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
      state.loading = 'pending'
    },
    [signIn.fulfilled.type]: (state) => {
      console.log('SignIn success')
      state.loading = 'idle'
      state.currentRequestId = undefined
      state.error = null
    },
    [signIn.rejected.type]: (state, { payload }: PayloadAction<AuthError>) => {
      console.log('SignIn failed')
      state.loading = 'idle'
      state.currentRequestId = undefined
      state.error = payload
    },
  },
})

// Auth selector
export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
