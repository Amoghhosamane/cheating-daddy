import React from 'react';
import './CustomizeView.css';

function CustomizeView({
    config,
    onProfileChange,
    onLanguageChange,
    onScreenshotIntervalChange,
    onImageQualityChange,
    onAdvancedModeChange,
    onBack
}) {
    return (
        <div className="customize-view fade-in">
            <div className="view-header">
                <button className="back-btn" onClick={onBack}>
                    ← Back
                </button>
                <h1>⚙️ Customize Settings</h1>
            </div>

            <div className="settings-grid">
                <div className="setting-card card">
                    <h3>🎭 Response Profile</h3>
                    <p>Adjust the AI's personality and response style</p>
                    <select
                        className="select"
                        value={config.profile}
                        onChange={(e) => onProfileChange(e.target.value)}
                    >
                        <option value="concise">Concise - Short and direct answers</option>
                        <option value="balanced">Balanced - Mix of detail and brevity</option>
                        <option value="detailed">Detailed - Comprehensive explanations</option>
                        <option value="creative">Creative - Innovative solutions</option>
                    </select>
                </div>

                <div className="setting-card card">
                    <h3>🌍 Response Language</h3>
                    <p>Choose the language for AI responses</p>
                    <select
                        className="select"
                        value={config.language}
                        onChange={(e) => onLanguageChange(e.target.value)}
                    >
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                        <option value="hindi">Hindi</option>
                        <option value="chinese">Chinese</option>
                    </select>
                </div>

                <div className="setting-card card">
                    <h3>📸 Screenshot Interval</h3>
                    <p>How often to capture and analyze screen content</p>
                    <div className="slider-container">
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={config.screenshotInterval}
                            onChange={(e) => onScreenshotIntervalChange(parseInt(e.target.value))}
                            className="slider"
                        />
                        <span className="slider-value">{config.screenshotInterval} seconds</span>
                    </div>
                </div>

                <div className="setting-card card">
                    <h3>🖼️ Image Quality</h3>
                    <p>Balance between quality and upload speed</p>
                    <select
                        className="select"
                        value={config.imageQuality}
                        onChange={(e) => onImageQualityChange(e.target.value)}
                    >
                        <option value="low">Low - Faster processing</option>
                        <option value="medium">Medium - Balanced</option>
                        <option value="high">High - Best accuracy</option>
                    </select>
                </div>

                <div className="setting-card card">
                    <h3>🔬 Advanced Mode</h3>
                    <p>Enable advanced features and detailed logs</p>
                    <div className="toggle-container">
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={config.advancedMode}
                                onChange={(e) => onAdvancedModeChange(e.target.checked)}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                        <span className="toggle-label">
                            {config.advancedMode ? 'Enabled' : 'Disabled'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomizeView;
