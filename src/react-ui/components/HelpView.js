import React from 'react';
import './HelpView.css';

function HelpView({ onBack, onExternalLinkClick }) {
    const handleLinkClick = (e, url) => {
        e.preventDefault();
        onExternalLinkClick(url);
    };

    return (
        <div className="help-view fade-in">
            <div className="view-header">
                <button className="back-btn" onClick={onBack}>
                    ← Back
                </button>
                <h1>❓ Help & Support</h1>
            </div>

            <div className="help-grid">
                <div className="help-card card">
                    <div className="card-icon">🔑</div>
                    <h3>Getting Your API Key</h3>
                    <p>You'll need a Google Gemini API key to use this application:</p>
                    <ol>
                        <li>Visit <a href="#" onClick={(e) => handleLinkClick(e, 'https://aistudio.google.com/app/apikey')}>Google AI Studio</a></li>
                        <li>Sign in with your Google account</li>
                        <li>Click "Create API key" or "Get API key"</li>
                        <li>Copy your key and paste it in the main screen</li>
                        <li>The free tier includes generous usage limits</li>
                    </ol>
                </div>

                <div className="help-card card">
                    <div className="card-icon">🎯</div>
                    <h3>How to Use</h3>
                    <p>Follow these steps to get started:</p>
                    <ol>
                        <li>Enter your API key on the main screen</li>
                        <li>Click "Start Assistant" to begin</li>
                        <li>The app will start capturing your screen and audio</li>
                        <li>AI suggestions appear in real-time</li>
                        <li>Use the chat panel for quick questions</li>
                    </ol>
                </div>

                <div className="help-card card">
                    <div className="card-icon">⚙️</div>
                    <h3>Customization</h3>
                    <p>Personalize your experience:</p>
                    <ul>
                        <li><strong>Profile:</strong> Choose response style (concise/detailed)</li>
                        <li><strong>Language:</strong> Get responses in your preferred language</li>
                        <li><strong>Screenshot Interval:</strong> Adjust capture frequency</li>
                        <li><strong>Image Quality:</strong> Balance quality vs. speed</li>
                        <li><strong>Advanced Mode:</strong> Enable detailed logging</li>
                    </ul>
                </div>

                <div className="help-card card">
                    <div className="card-icon">🔧</div>
                    <h3>Troubleshooting</h3>
                    <p>Common issues and solutions:</p>
                    <ul>
                        <li><strong>API Key Error:</strong> Verify your key is correct and has quota remaining</li>
                        <li><strong>No Suggestions:</strong> Check that screen capture permissions are granted</li>
                        <li><strong>Audio Issues:</strong> Ensure microphone permissions are enabled</li>
                        <li><strong>Slow Performance:</strong> Reduce image quality or increase screenshot interval</li>
                    </ul>
                </div>

                <div className="help-card card">
                    <div className="card-icon">📚</div>
                    <h3>Resources</h3>
                    <p>Learn more:</p>
                    <ul>
                        <li><a href="#" onClick={(e) => handleLinkClick(e, 'https://github.com/sohzm/cheating-daddy')}>GitHub Repository</a></li>
                        <li><a href="#" onClick={(e) => handleLinkClick(e, 'https://ai.google.dev/gemini-api/docs')}>Gemini API Documentation</a></li>
                        <li><a href="#" onClick={(e) => handleLinkClick(e, 'https://www.electronjs.org/')}>Electron Documentation</a></li>
                        <li><a href="#" onClick={(e) => handleLinkClick(e, 'https://react.dev/')}>React Documentation</a></li>
                    </ul>
                </div>

                <div className="help-card card disclaimer-card">
                    <div className="card-icon">⚠️</div>
                    <h3>Important Disclaimer</h3>
                    <p>
                        This tool is designed for <strong>educational purposes only</strong>.
                        Always be aware of and comply with:
                    </p>
                    <ul>
                        <li>Your organization's code of conduct</li>
                        <li>Interview and assessment policies</li>
                        <li>Academic integrity guidelines</li>
                        <li>Legal and ethical standards</li>
                    </ul>
                    <p className="warning-text">
                        Misuse of this tool may have serious consequences. Use responsibly!
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HelpView;
