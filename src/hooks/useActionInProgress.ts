import { useSelector } from 'react-redux'
import { ActionType, selectIfLoading } from 'features/ui/uiSlice'

export const useActionInProgress = (actionType: ActionType) => {
  return useSelector(selectIfLoading(actionType))
}
