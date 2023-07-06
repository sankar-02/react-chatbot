
import React, { useEffect, useRef, useReducer } from 'react';
import { Button, Form } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import ChatInput from './ChatInput';
import { fetchRandomQuote } from './quote';
import FileDownload from '../utility/FileDownload';
import * as constant from '../constants/constant';
import reducer, { ActionType } from './reducer';
import { Message } from './types';
import '../styles/Chatbot.css';
import ChatHeader from './ChatHeader';
import { handleInputChange } from '../utility/HandleInputChange';
import { handleSendMessage } from '../utility/HandleSendMessage';
import { handleKeyDown } from '../utility/HandleKeyDown';
import { HandleOptionClick } from '../utility/HandleOptionClick';

const ChatbotContainer: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    showDialog: false,
    messages: [],
    inputValue: constant.empty,
  });
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  const toggleDialog = () => {
    dispatch({ type: ActionType.TOGGLE_DIALOG });
  };

  const scrollToLatestMessage = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToLatestMessage();
  }, [state.messages]);

  useEffect(() => {
    const handleBotReply = async () => {
      const lastUserMessage = state.messages[state.messages.length - 1].message.toLowerCase();

      switch (lastUserMessage) {
        case constant.quote.toLowerCase():
          const quote = await fetchRandomQuote();

          if (quote) {
            const newMessage: Message = {
              id: state.messages.length + 1,
              message: quote,
              sender: constant.bot,
            };

            dispatch({
              type: ActionType.SET_MESSAGES,
              payload: [...state.messages, newMessage],
            });
          }
          break;

        case constant.help.toLowerCase():
          const documents: Message[] = [
            {
              id: state.messages.length + 1,
              message: constant.help_fileName,
              sender: constant.bot,
              fileURL: constant.help_fileURL,
            },
            {
              id: state.messages.length + 2,
              message: constant.help_fileName_2,
              sender: constant.bot,
              fileURL: constant.help_fileURL_2,
            },
            {
              id: state.messages.length + 3,
              message: constant.help_fileName_3,
              sender: constant.bot,
              fileURL: constant.help_fileURL_3,
            },
            {
              id: state.messages.length + 4,
              message: constant.help_fileName_4,
              sender: constant.bot,
              fileURL: constant.help_fileURL_4,
            },
          ];

          dispatch({
            type: ActionType.SET_MESSAGES,
            payload: [...state.messages, ...documents],
          });
          break;

        default:
      }
    };

    if (state.showDialog && state.messages.length === 0) {
      const initialBotMessage: Message = {
        id: 1,
        message: constant.hello_msg,
        sender: constant.bot,
      };

      dispatch({ type: ActionType.SET_MESSAGES, payload: [initialBotMessage] });
    } else if (
      state.messages.length > 0 &&
      state.messages[state.messages.length - 1]?.sender === constant.user
    ) {
      handleBotReply();
    }
  }, [state.showDialog, state.messages]);

  return (
    <Form className="chatbot-container">
      {!state.showDialog && (
        <div className={`chatbot-bubble ${state.showDialog? 'hidden' : constant.empty}`} onClick={toggleDialog}>
          <MessageOutlined className="bubble-icon" />
        </div>
      )}

      {state.showDialog && (
        <Form.Item className="chatbot-dialog">
          <ChatHeader toggleDialog={toggleDialog} />

          <div className="chat-messages"  ref={chatMessagesRef}>
            {state.messages.map((message) => (
              <FileDownload key={message.id} message={message} />
            ))}

            {state.messages.length > 0 && state.messages[state.messages.length - 1].sender === constant.bot && (
              <Form.Item className="options-container">
                <Button
                  type="primary"
                  onClick={() => HandleOptionClick(constant.help, state, dispatch)}
                  style={{ marginRight: '10px' }}
                >
                  {constant.help}
                </Button>
                <Button type="primary" onClick={() => HandleOptionClick(constant.quote, state, dispatch)}>
                  {constant.quote}
                </Button>
              </Form.Item>
            )}
          </div>

          <ChatInput
            inputValue={state.inputValue}
            handleInputChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleInputChange(event, dispatch)
            }
            handleSendMessage={() => handleSendMessage(state, dispatch)}
            handleKeyDown={(event: React.KeyboardEvent<HTMLTextAreaElement>) =>
              handleKeyDown(event, () => handleSendMessage(state, dispatch))
            }
          />
        </Form.Item>
      )}
    </Form>
  );
};

export default ChatbotContainer;
