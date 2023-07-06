// handleSendMessage.ts
import { ActionType } from '../components/reducer';
import { Message } from '../components/types';
import * as constant from '../constants/constant';

export const handleSendMessage = (state: any, dispatch: React.Dispatch<any>) => {
  if (state.inputValue.trim() === constant.empty) {
    return;
  }

  const newMessage: Message = {
    id: state.messages.length + 1,
    message: state.inputValue,
    sender: constant.user,
  };

  dispatch({
    type: ActionType.SET_MESSAGES,
    payload: [...state.messages, newMessage],
  });
  dispatch({ type: ActionType.SET_INPUT_VALUE, payload: constant.empty });
};
