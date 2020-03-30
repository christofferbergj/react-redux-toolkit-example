import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/rootReducer'

export type ActionType = string

type UiState = {
  actionsInProgress: ActionType[]
}

const initialState: UiState = {
  actionsInProgress: [],
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    /**
     * Set loading action
     * @param {Draft<State>} state
     * @param {any} payload - Action type
     */
    startAction: (state, { payload }: PayloadAction<ActionType>) => {
      state.actionsInProgress.push(payload)
    },
    /**
     * Stop loading action
     * @param {Draft<State>} state
     * @param {any} payload - Action type
     */
    stopAction: (state, { payload }: PayloadAction<ActionType>) => {
      const { actionsInProgress } = state
      const index = actionsInProgress.findIndex((action) => action !== payload)

      actionsInProgress.splice(index)
    },
  },
})

// ActionType creators
export const { startAction, stopAction } = uiSlice.actions

// Selectors
export const selectLoadingActions = (state: RootState) => state.ui.actionsInProgress

/**
 * Select
 * @param {ActionType} actionTypes
 * @returns {OutputSelector<RootState, boolean, (res: (ActionType[] | any[])) => boolean>}
 */
export const selectIfLoading = (...actionTypes: ActionType[]) => {
  return createSelector(selectLoadingActions, (actions) =>
    actions.some((action) => actionTypes.includes(action))
  )
}

export default uiSlice.reducer
