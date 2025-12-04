import React, { useState } from 'react';
import './MainView.css';

function MainView({ onStart, onAPIKeyHelp }) {
    const [apiKey, setApiKey] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!apiKey.trim()) {
            alert('Please enter your API key');
            return;
        }

        setLoading(true);

        // Save API key to localStorage
        localStorage.setItem('gemini-api-key', apiKey);

        // Wait a moment for visual feedback
        setTimeout(() => {
            setLoading(false);
            onStart();
        }, 500);
    };

    return (
        <div className="main-view fade-in">
            <div className="main-container">
                <div className="hero-section">
                    <div className="hero-icon">🎯</div>
                    <h1 className="hero-title">
                        Ready to <span className="highlight">Ace</span> Your Interview?
                    </h1>
                    <p className="hero-subtitle">
                        Your AI assistant is standing by to provide real-time help and suggestions
                    </p>
                </div>

                <div className="main-card glass">
                    <form onSubmit={handleSubmit} className="api-form">
                        <div className="input-group">
                            <label htmlFor="api-key">
                                Google API Key
                                <span className="required">*</span>
                            </label>
                            <input
                                id="api-key"
                                type="password"
                                className="input"
                                placeholder="Enter your Gemini API key..."
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                disabled={loading}
                            />
                            <div className="input-hint">
                                Don't have an API key?{' '}
                                <button
                                    type="button"
                                    className="link-btn"
                                    onClick={onAPIKeyHelp}
                                >
                                    Learn how to get one →
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-large"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Starting...
                                </>
                            ) : (
                                <>
                                    🚀 Start Assistant
                                </>
                            )}
                        </button>
                    </form>

                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-icon">🖥️</div>
                            <h3>Screen Capture</h3>
                            <p>Analyzes your screen content in real-time</p>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon">🎤</div>
                            <h3>Audio Processing</h3>
                            <p>Listens to interview questions</p>
                        </div>

                        <div className="feature-item">
                            <div className="feature-icon">🤖</div>
                            <h3>AI Suggestions</h3>
                            <p>Provides intelligent answers instantly</p>
                        </div>
                    </div>
                </div>

                <div className="disclaimer">
                    <p>
                        ⚠️ <strong>Disclaimer:</strong> This tool is for educational purposes.
                        Use responsibly and be aware of your organization's policies regarding interview assistance.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MainView;
