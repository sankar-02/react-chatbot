// handleOptionClick.ts
import { ActionType } from '../components/reducer';
import { Message } from '../components/types';
import * as constant from '../constants/constant';

export const HandleOptionClick = (option: string, state: any, dispatch: React.Dispatch<any>) => {
  const newMessage: Message = {
    id: state.messages.length + 1,
    message: option,
    sender: constant.user,
  };
  dispatch({ type: ActionType.SET_MESSAGES, payload: [...state.messages, newMessage] });
};
