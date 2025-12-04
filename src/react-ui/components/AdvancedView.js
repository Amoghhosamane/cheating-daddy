import React from 'react';
import './AdvancedView.css';

function AdvancedView({ config, onLayoutModeChange, onBack }) {
    return (
        <div className="advanced-view fade-in">
            <div className="view-header">
                <button className="back-btn" onClick={onBack}>
                    ← Back
                </button>
                <h1>🔧 Advanced Options</h1>
            </div>

            <div className="advanced-grid">
                <div className="advanced-card card">
                    <h3>📐 Layout Mode</h3>
                    <p>Choose your preferred window layout</p>
                    <div className="layout-options">
                        <button
                            className={`layout-btn ${config.layoutMode === 'compact' ? 'active' : ''}`}
                            onClick={() => onLayoutModeChange('compact')}
                        >
                            <div className="layout-preview compact-preview">
                                <div className="preview-bar"></div>
                                <div className="preview-content"></div>
                            </div>
                            <span>Compact</span>
                        </button>

                        <button
                            className={`layout-btn ${config.layoutMode === 'normal' ? 'active' : ''}`}
                            onClick={() => onLayoutModeChange('normal')}
                        >
                            <div className="layout-preview normal-preview">
                                <div className="preview-bar"></div>
                                <div className="preview-content"></div>
                            </div>
                            <span>Normal</span>
                        </button>
                    </div>
                </div>

                <div className="advanced-card card">
                    <h3>🔐 Privacy</h3>
                    <p>Your data and privacy controls</p>
                    <div className="info-list">
                        <div className="info-item">
                            <span className="info-icon">✓</span>
                            <span>API key stored locally</span>
                        </div>
                        <div className="info-item">
                            <span className="info-icon">✓</span>
                            <span>No data sent to third parties</span>
                        </div>
                        <div className="info-item">
                            <span className="info-icon">✓</span>
                            <span>Screen captures are temporary</span>
                        </div>
                        <div className="info-item">
                            <span className="info-icon">✓</span>
                            <span>History stored in memory only</span>
                        </div>
                    </div>
                </div>

                <div className="advanced-card card">
                    <h3>⚡ Performance</h3>
                    <p>System resource usage</p>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-label">CPU</div>
                            <div className="stat-value">~5%</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-label">Memory</div>
                            <div className="stat-value">~80MB</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-label">Network</div>
                            <div className="stat-value">Variable</div>
                        </div>
                    </div>
                </div>

                <div className="advanced-card card">
                    <h3>ℹ️ About</h3>
                    <p>Application information</p>
                    <div className="about-info">
                        <div className="about-row">
                            <strong>Version:</strong>
                            <span>0.4.0</span>
                        </div>
                        <div className="about-row">
                            <strong>Framework:</strong>
                            <span>Electron + React</span>
                        </div>
                        <div className="about-row">
                            <strong>AI Model:</strong>
                            <span>Google Gemini</span>
                        </div>
                        <div className="about-row">
                            <strong>License:</strong>
                            <span>GPL-3.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdvancedView;
