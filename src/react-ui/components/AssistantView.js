import React, { useState, useEffect, useRef } from 'react';
import './AssistantView.css';

function AssistantView({ responses, currentResponseIndex, status, onSendText, onResponseIndexChange }) {
    const [message, setMessage] = useState('');
    const [isListening, setIsListening] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [responses]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendText(message);
            setMessage('');
        }
    };

    const currentResponse = responses[currentResponseIndex] || null;

    return (
        <div className="assistant-view fade-in">
            <div className="assistant-container">
                <div className="status-bar">
                    <div className="status-indicator">
                        <div className={`status-dot ${isListening ? 'active' : ''}`}></div>
                        <span className="status-text">
                            {isListening ? 'Listening & Analyzing...' : 'Ready'}
                        </span>
                    </div>

                    {status && (
                        <div className="status-message">{status}</div>
                    )}
                </div>

                <div className="assistant-grid">
                    <div className="response-panel card">
                        <div className="panel-header">
                            <h2>💡 AI Suggestions</h2>
                            {responses.length > 1 && (
                                <div className="response-navigator">
                                    <button
                                        className="nav-arrow"
                                        onClick={() => onResponseIndexChange(Math.max(0, currentResponseIndex - 1))}
                                        disabled={currentResponseIndex === 0}
                                    >
                                        ←
                                    </button>
                                    <span className="response-count">
                                        {currentResponseIndex + 1} / {responses.length}
                                    </span>
                                    <button
                                        className="nav-arrow"
                                        onClick={() => onResponseIndexChange(Math.min(responses.length - 1, currentResponseIndex + 1))}
                                        disabled={currentResponseIndex === responses.length - 1}
                                    >
                                        →
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="response-content">
                            {currentResponse ? (
                                <div className="response-text" dangerouslySetInnerHTML={{ __html: currentResponse.html }}></div>
                            ) : (
                                <div className="empty-state">
                                    <div className="empty-icon">🤖</div>
                                    <p>Waiting for questions...</p>
                                    <span className="empty-hint">The AI will provide suggestions as it analyzes the interview</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="chat-panel card">
                        <div className="panel-header">
                            <h2>💬 Quick Chat</h2>
                        </div>

                        <div className="chat-messages">
                            {responses.length === 0 ? (
                                <div className="empty-state">
                                    <p>Ask the AI anything...</p>
                                </div>
                            ) : (
                                responses.map((response, index) => (
                                    <div key={index} className="chat-message">
                                        <div className="message-avatar">🤖</div>
                                        <div className="message-content">
                                            <div className="message-text" dangerouslySetInnerHTML={{ __html: response.html }}></div>
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        <form onSubmit={handleSubmit} className="chat-input-form">
                            <input
                                type="text"
                                className="chat-input"
                                placeholder="Type a question..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button type="submit" className="send-btn" disabled={!message.trim()}>
                                <span>📤</span>
                            </button>
                        </form>
                    </div>
                </div>

                <div className="controls-bar">
                    <button className="control-btn">
                        <span>⏸️</span>
                        Pause
                    </button>
                    <button className="control-btn active">
                        <span>🎤</span>
                        {isListening ? 'Listening...' : 'Start Listening'}
                    </button>
                    <button className="control-btn">
                        <span>📸</span>
                        Screenshot
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AssistantView;
