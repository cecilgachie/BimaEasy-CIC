import React, { useState } from 'react';
import { FaHeadset, FaQuestionCircle, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { faqData } from '../../data/FAQData';
import './SupportPage.css';

function SupportPage() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: chatMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setChatHistory([...chatHistory, newMessage]);
    setChatMessage('');

    // Simulate response after 1 second
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        text: "Thank you for your message. Our support team will get back to you shortly. For immediate assistance, please call us at +254 703 099 120.",
        sender: 'support',
        timestamp: new Date().toLocaleTimeString()
      };
      setChatHistory(prev => [...prev, response]);
    }, 1000);
  };

  const filteredFAQs = faqData.filter(faq => faq.category === activeCategory);

  return (
    <div className="support-page">
      <div className="support-header">
        <h1><FaHeadset /> Support Center</h1>
        <p>How can we help you today?</p>
      </div>

      <div className="support-content">
        <div className="support-sidebar">
          <div className="contact-info">
            <h3>Contact Us</h3>
            <div className="contact-method">
              <FaPhone /> <span>+254 703 099 120</span>
            </div>
            <div className="contact-method">
              <FaEnvelope /> <span>callc@cic.co.ke</span>
            </div>
            <div className="contact-method">
              <FaWhatsapp /> <span>+254 703 099 120</span>
            </div>
          </div>

          <div className="faq-categories">
            <h3>FAQ Categories</h3>
            <button 
              className={activeCategory === 'general' ? 'active' : ''} 
              onClick={() => setActiveCategory('general')}
            >
              General Questions
            </button>
            <button 
              className={activeCategory === 'purchasing' ? 'active' : ''} 
              onClick={() => setActiveCategory('purchasing')}
            >
              Purchasing
            </button>
            <button 
              className={activeCategory === 'payments' ? 'active' : ''} 
              onClick={() => setActiveCategory('payments')}
            >
              Payments
            </button>
            <button 
              className={activeCategory === 'claims' ? 'active' : ''} 
              onClick={() => setActiveCategory('claims')}
            >
              Claims
            </button>
            <button 
              className={activeCategory === 'account' ? 'active' : ''} 
              onClick={() => setActiveCategory('account')}
            >
              Account
            </button>
          </div>
        </div>

        <div className="support-main">
          <div className="faq-section">
            <h2><FaQuestionCircle /> Frequently Asked Questions</h2>
            <div className="faq-list">
              {filteredFAQs.map(faq => (
                <div key={faq.id} className="faq-item">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={`chat-widget ${isChatOpen ? 'open' : ''}`}>
        <button className="chat-toggle" onClick={() => setIsChatOpen(!isChatOpen)}>
          <FaHeadset /> {isChatOpen ? 'Close Chat' : 'Chat with Us'}
        </button>

        {isChatOpen && (
          <div className="chat-container">
            <div className="chat-header">
              <h3>Chat with Support</h3>
            </div>
            <div className="chat-messages">
              {chatHistory.map(message => (
                <div key={message.id} className={`chat-message ${message.sender}`}>
                  <div className="message-content">{message.text}</div>
                  <div className="message-timestamp">{message.timestamp}</div>
                </div>
              ))}
            </div>
            <form className="chat-input" onSubmit={handleSendMessage}>
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default SupportPage; 