import React, { useState, useEffect, useContext, useRef } from 'react';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import axios from 'axios';
import { CssTextField, Box, Grid, Button, UseTheme } from '../styles/material';
import { v4 as uuidv4 } from 'uuid';

const ChatContainer: React.FC<{}> = ({ currentUser, currentChat, socket }) => {
  const theme = UseTheme();
  // const iconColors = theme.palette.secondary.contrastText;
  // const inverseMode = theme.palette.secondary.main;
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [sender, setSender] = useState(null);
  const userContext = useContext(UserContext);
  const { currentUserInfo } = userContext;
  useEffect(() => {
    if (currentChat) {
      const getMessages = async () => {
        const response = await axios.post('/api/messages/getmsg', {
          senderId: currentUser.id,
          receiverId: currentChat.id
        });
        setMessages(response.data);
      };
      getMessages();
    }
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    socket.current.emit('send-msg', {
      senderId: currentUser.id,
      receiverId: currentChat.id,
      text: msg
    });
    await axios.post('/api/messages/addmsg', {
      senderId: currentUser.id,
      receiverId: currentChat.id,
      text: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, text: msg});
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-receive', async (data) => {
        const {senderId} = data;
        if(sender !== currentChat.id){
          setArrivalMessage(() => {
            if(currentChat.id === senderId){
              return {fromSelf: false, text: data.text}
            } else{
              return null;
            }
          })
        }
      });
    }
  });

  const fontColor = {
    style: { color: '#9B27B0' }
  };

  useEffect(() => {

    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth'});
  }, [messages]);

  return (
    <Box>
      <Container>
        <div className="chat-header">
          <div className="user-details">
            <div className="avatar">
              {/* <img
            src={`data:image/svg+xml;base64,${currentChat.profileURL}`}
            alt=""
          /> */}
            </div>
            <div className="username">
              {/* <h3>{currentChat.fullName}</h3> */}
            </div>
          </div>
          {/* <Logout /> */}
        </div> <div className="chat-messages">
          {messages.map((message) => {
            return (
              <div ref={scrollRef} key={uuidv4()}>
                <div
                  className={`message ${
                    message.fromSelf ? 'sent' : 'received'
                  }`}
                >
                  <div className="content ">
                    {message.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <ChatInput handleSendMsg={handleSendMsg} />
      </Container>
    </Box>
  );
};

const Container = styled.div`
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 50vh;
    overflow: auto;
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }
    .sent {
      justify-content: flex-end;
      .content{
        background-color: #4f04ff21;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20
      }
    }
  }
`;

export default ChatContainer;

