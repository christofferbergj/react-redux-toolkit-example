import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import nanoid from 'nanoid'
import { RootState } from 'app/rootReducer'
import { getFirebase } from 'react-redux-firebase'

export type UserCredentials = {
  email: string
  password: string
}

export type NewUser = {
  firstName: string
  lastName: string
} & UserCredentials

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
 * User sign in
 * @type {((arg: UserCredentials) => (dispatch: GetDispatch<{}>, getState: () => GetState<{}>, extra: GetExtra<{}>) => (Promise<PayloadAction<Promise<void>, string, {arg: UserCredentials; requestId: string}, never> | PayloadAction<GetRejectValue<{}> | undefined, string, {arg: UserCredentials; requestId: string; aborted: boolean}, SerializedError>> & {abort: (reason?: (string | undefined)) => void})) & {pending: ActionCreatorWithPreparedPayload<[string, UserCredentials], undefined, string, never, {arg: UserCredentials; requestId: string}>; rejected: ActionCreatorWithPreparedPayload<[(Error | null), string, UserCredentials, (GetRejectValue<{}> | undefined)], GetRejectValue<{}> | undefined, string, SerializedError, {arg: UserCredentials; requestId: string; aborted: boolean}>; fulfilled: ActionCreatorWithPreparedPayload<[Promise<void>, string, UserCredentials], Promise<void>, string, never, {arg: UserCredentials; requestId: string}>}}
 */
export const signIn = createAsyncThunk<any, UserCredentials, { rejectValue: AuthError }>(
  'auth/signIn',
  async ({ email, password }, { rejectWithValue }) => {
    const firebase = getFirebase()

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (err) {
      const { code, message } = err
      return rejectWithValue({ code, message, id: nanoid() })
    }
  }
)

/**
 * User sign out
 * @type {((arg: void) => (dispatch: GetDispatch<{}>, getState: () => GetState<{}>, extra: GetExtra<{}>) => (Promise<PayloadAction<void, string, {arg: void; requestId: string}, never> | PayloadAction<GetRejectValue<{}> | undefined, string, {arg: void; requestId: string; aborted: boolean}, SerializedError>> & {abort: (reason?: (string | undefined)) => void})) & {pending: ActionCreatorWithPreparedPayload<[string, void], undefined, string, never, {arg: void; requestId: string}>; rejected: ActionCreatorWithPreparedPayload<[(Error | null), string, void, (GetRejectValue<{}> | undefined)], GetRejectValue<{}> | undefined, string, SerializedError, {arg: void; requestId: string; aborted: boolean}>; fulfilled: ActionCreatorWithPreparedPayload<[void, string, void], void, string, never, {arg: void; requestId: string}>}}
 */
export const signOut = createAsyncThunk('auth/signOut', async () => {
  const firebase = getFirebase()

  try {
    await firebase.auth().signOut()
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
})

/**
 * User sign up
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
    builder.addCase(signIn.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(signIn.fulfilled, (state) => {
      state.loading = 'idle'
      state.error = undefined
    })
    builder.addCase(signIn.rejected, (state, { payload }) => {
      state.loading = 'idle'
      state.error = payload
    })
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
export const selectAuth = (state: RootState) => state.auth
export const selectFirebaseAuth = (state: RootState) => state.firebase.auth

export default authSlice.reducer
