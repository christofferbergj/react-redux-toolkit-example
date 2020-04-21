import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import nanoid from 'nanoid'
import { RootState } from 'app/rootReducer'
import { getFirebase } from 'react-redux-firebase'

export type UserCredentials = {
  email: string
  password: string
}

export type User = {
  firstName: string
  lastName: string
  initials: string
}

export type NewUser = User & UserCredentials

export type AuthError = {
  code: string
  message: string
  id: string
}

export type AuthState = {
  loading: 'idle' | 'pending'
  currentRequestId: undefined
  error: AuthError | undefined
}

/**
 * NewUser sign up
 * @type {((arg: ({firstName: string; lastName: string} & UserCredentials)) => (dispatch: GetDispatch<{}>, getState: () => GetState<{}>, extra: GetExtra<{}>) => (Promise<PayloadAction<RejectWithValue<{} extends {rejectValue: infer RejectValue} ? RejectValue : unknown>, string, {arg: {firstName: string; lastName: string} & UserCredentials; requestId: string}, never> | PayloadAction<GetRejectValue<{}> | undefined, string, {arg: {firstName: string; lastName: string} & UserCredentials; requestId: string; aborted: boolean}, SerializedError>> & {abort: (reason?: (string | undefined)) => void})) & {pending: ActionCreatorWithPreparedPayload<[string, ({firstName: string; lastName: string} & UserCredentials)], undefined, string, never, {arg: {firstName: string; lastName: string} & UserCredentials; requestId: string}>; rejected: ActionCreatorWithPreparedPayload<[(Error | null), string, ({firstName: string; lastName: string} & UserCredentials), (GetRejectValue<{}> | undefined)], GetRejectValue<{}> | undefined, string, SerializedError, {arg: {firstName: string; lastName: string} & UserCredentials; requestId: string; aborted: boolean}>; fulfilled: ActionCreatorWithPreparedPayload<[RejectWithValue<{} extends {rejectValue: infer RejectValue} ? RejectValue : unknown>, string, ({firstName: string; lastName: string} & UserCredentials)], RejectWithValue<{} extends {rejectValue: infer RejectValue} ? RejectValue : unknown>, string, never, {arg: {firstName: string; lastName: string} & UserCredentials; requestId: string}>}}
 */
export const signUp = createAsyncThunk<any, NewUser, { rejectValue: AuthError }>(
  'auth/signUp',
  async (newUser, thunkAPI) => {
    const firebase = getFirebase()
    const firestore = firebase.firestore()
    const { firstName, lastName, email, password } = newUser
    const { rejectWithValue } = thunkAPI

    try {
      const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
      await firestore
        .collection('users')
        .doc(response.user?.uid)
        .set({
          firstName,
          lastName,
          initials: firstName[0] + lastName[0],
        })
    } catch (err) {
      const { code, message } = err
      return rejectWithValue({ code, message, id: nanoid() })
    }
  }
)

export const handleSignInWithGoogle = () => {
  return getFirebase().login({ provider: 'google', type: 'popup' })
}

const initialState: AuthState = {
  loading: 'idle',
  currentRequestId: undefined,
  error: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(signUp.fulfilled, (state) => {
      state.loading = 'idle'
      state.error = undefined
    })
    builder.addCase(signUp.rejected, (state, { payload }) => {
      state.loading = 'idle'
      state.error = payload
    })
  },
})

// Auth selector
export const selectAuth = (state: RootState) => state.firebase.auth
export const selectProfile = (state: RootState) => state.firebase.profile

export default authSlice.reducer
