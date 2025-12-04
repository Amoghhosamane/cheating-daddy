import React from 'react';
import './AppHeader.css';

function AppHeader({
    currentView,
    onCustomizeClick,
    onHelpClick,
    onHistoryClick,
    onAdvancedClick,
    onClose,
    onHideToggle
}) {
    return (
        <header className="app-header">
            <div className="header-left">
                <div className="app-logo">
                    <span className="logo-text">Cheating Daddy</span>
                </div>
            </div>

            <nav className="header-nav">
                {currentView !== 'assistant' && (
                    <>
                        <button
                            className={`nav-btn ${currentView === 'customize' ? 'active' : ''}`}
                            onClick={onCustomizeClick}
                            title="Customize Settings"
                        >
                            <span className="nav-label">Settings</span>
                        </button>

                        <button
                            className={`nav-btn ${currentView === 'help' ? 'active' : ''}`}
                            onClick={onHelpClick}
                            title="Help & Support"
                        >
                            <span className="nav-label">Help</span>
                        </button>

                        <button
                            className={`nav-btn ${currentView === 'history' ? 'active' : ''}`}
                            onClick={onHistoryClick}
                            title="View History"
                        >
                            <span className="nav-label">History</span>
                        </button>

                        <button
                            className={`nav-btn ${currentView === 'advanced' ? 'active' : ''}`}
                            onClick={onAdvancedClick}
                            title="Advanced Options"
                        >
                            <span className="nav-label">Advanced</span>
                        </button>
                    </>
                )}
            </nav>

            <div className="header-actions">
                <button
                    className="action-btn hide-btn"
                    onClick={onHideToggle}
                    title="Hide/Show Window"
                >
                    <span>▼</span>
                </button>

                <button
                    className="action-btn close-btn"
                    onClick={onClose}
                    title="Close Application"
                >
                    <span>✕</span>
                </button>
            </div>
        </header>
    );
}

export default AppHeader;
