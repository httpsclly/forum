// src/Feed.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Feed.css";

const Feed = () => {
  const [topics, setTopics] = useState([]);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [topicId, setTopicId] = useState("");
  const userId = 1; // ID do usuário fixo, altere conforme necessário

  useEffect(() => {
    fetchTopics();
    fetchMessages();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/topics/");
      setTopics(response.data);
    } catch (error) {
      console.error("Erro ao buscar tópicos", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/messages/");
      setMessages(response.data);
    } catch (error) {
      console.error("Erro ao buscar mensagens", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Converte topicId para inteiro
    const parsedTopicId = parseInt(topicId, 10);

    // Verifica se o topicId é um número válido
    if (isNaN(parsedTopicId)) {
      console.error("ID do tópico inválido");
      return;
    }

    const messageData = {
      content,
      topic_id: parsedTopicId, // Use o ID convertido
      user_id: userId,
    };

    try {
      await axios.post("http://127.0.0.1:8000/messages/", messageData);
      setContent("");
      setTopicId("");
      fetchMessages(); // Atualiza a lista de mensagens após envio
    } catch (error) {
      console.error("Erro ao enviar mensagem", error);
    }
  };

  return (
    <div>
      <h1>Fórum</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite sua mensagem"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="ID do Tópico"
          value={topicId}
          onChange={(e) => setTopicId(e.target.value)}
          required
        />
        <button type="submit">Postar Mensagem</button>
      </form>
      <h2>Tópicos</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic.id}>{topic.title}</li>
        ))}
      </ul>
      <h2>Mensagens</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;
