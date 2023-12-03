import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react'
import axios, { formToJSON } from "axios"
import React from 'react';
import ReactDOM from 'react-dom';


function App() {

  const [currentMessage,setCurrentMessage] = useState("");
  const [messageList,setMessageList] = useState([]);

  async function Send(){
      setMessageList((messageList) => [...messageList,{
        message: currentMessage,
        className: "my-message",
      }]);

      const url = `https://ai-chatbot.p.rapidapi.com/chat/free?message=${currentMessage}&uid=user1`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'Your API Key',
          'X-RapidAPI-Host': 'ai-chatbot.p.rapidapi.com'
        }
      };
      await fetch(url, options).then((res) => res.json().then((res) => 
                setMessageList((messageList) => [...messageList,{
                message: res.chatbot.response,
                className: "bot-message",
      }])));

      
  }


  

  return (
    <div className="chat">
      <div className="chat-messages">
          {messageList.map((name,key) => {
            return (<div className={name.className} key={key}>
              <p>{name.message}</p>
            </div>)
          })}
          
      </div>
      <div className="message">
          <input type="text" value={currentMessage} onChange={(event) => setCurrentMessage(event.target.value)}/>
          <button onClick={Send}>Send</button>
      </div>
    </div>
  )
}

export default App;
