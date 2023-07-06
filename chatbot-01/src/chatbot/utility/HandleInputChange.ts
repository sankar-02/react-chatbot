// handleInputChange.ts
import { ActionType } from '../components/reducer';

export const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>, dispatch: React.Dispatch<any>) => {
  dispatch({ type: ActionType.SET_INPUT_VALUE, payload: event.target.value });
};
