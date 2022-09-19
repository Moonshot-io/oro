import React, { useState, useContext } from 'react';
import Picker from 'emoji-picker-react';
import { BsEmojiSmileFill } from 'react-icons/bs';
import {TextField, Grid, ArrowCircleUpIcon, UseTheme} from '../styles/material';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';
import ChatBoxStyle from './ChatBoxStyle';

const ChatInput: React.FC<{}> = ({ handleSendMsg }) => {
  const theme = UseTheme();
  const inverseMode = theme.palette.secondary.main;
  const iconColors = theme.palette.secondary.contrastText;

  const userContext = useContext(UserContext);
  const { currentUserInfo } = userContext;
  const currentUser = currentUserInfo;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState('');

  const handleEmojiClick = (e, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const handleEmojiMenuToggle = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const closeEmojiMenu = () => {
    setShowEmojiPicker(false);
  }

  const enterClick = (e) => {
    if (e.keyCode === 13) {
      sendChat(e);
    }
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  };

  return (
    <Chat>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiMenuToggle} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container"
      onSubmit={(e) => sendChat(e)}>
        <input
        onClick={closeEmojiMenu}
          type="text"
          onKeyDown={(e)=>enterClick(e)}
          placeholder="Aa"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <ArrowCircleUpIcon />
        </button>
      </form>
    </Chat>
  );
};

  const Chat = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #e2e3e5;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #a352ff;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #a352ff;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
  `;

export default ChatInput;
