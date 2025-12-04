import React, { useState, useEffect } from 'react';
import './App.css';
import OnboardingView from './components/OnboardingView';
import MainView from './components/MainView';
import AssistantView from './components/AssistantView';
import CustomizeView from './components/CustomizeView';
import HelpView from './components/HelpView';
import HistoryView from './components/HistoryView';
import AdvancedView from './components/AdvancedView';
import AppHeader from './components/AppHeader';

const { ipcRenderer } = window.require('electron');

function App() {
    const [currentView, setCurrentView] = useState('onboarding');
    const [showOnboarding, setShowOnboarding] = useState(true);
    const [config, setConfig] = useState({
        profile: 'balanced',
        language: 'english',
        screenshotInterval: 3,
        imageQuality: 'medium',
        advancedMode: false,
        layoutMode: 'normal'
    });
    const [responses, setResponses] = useState([]);
    const [currentResponseIndex, setCurrentResponseIndex] = useState(0);
    const [status, setStatus] = useState('');

    // Load saved config on mount
    useEffect(() => {
        const savedConfig = localStorage.getItem('cheating-daddy-config');
        if (savedConfig) {
            try {
                const parsed = JSON.parse(savedConfig);
                setConfig(prevConfig => ({ ...prevConfig, ...parsed }));
            } catch (e) {
                console.error('Failed to parse saved config:', e);
            }
        }

        const hasCompletedOnboarding = localStorage.getItem('cheating-daddy-onboarding-complete');
        if (hasCompletedOnboarding === 'true') {
            setShowOnboarding(false);
            setCurrentView('main');
        }
    }, []);

    // Save config whenever it changes
    useEffect(() => {
        localStorage.setItem('cheating-daddy-config', JSON.stringify(config));
    }, [config]);

    // Listen for status updates from main process
    useEffect(() => {
        const handleStatusUpdate = (event, newStatus) => {
            setStatus(newStatus);
        };

        ipcRenderer.on('status-update', handleStatusUpdate);
        return () => {
            ipcRenderer.removeListener('status-update', handleStatusUpdate);
        };
    }, []);

    const handleOnboardingComplete = () => {
        localStorage.setItem('cheating-daddy-onboarding-complete', 'true');
        setShowOnboarding(false);
        setCurrentView('main');
    };

    const handleStart = async () => {
        setCurrentView('assistant');
        setStatus('Starting assistant...');

        try {
            const result = await ipcRenderer.invoke('start-gemini-session');
            if (result.success) {
                setStatus('Assistant started successfully');
            } else {
                setStatus(`Error: ${result.error}`);
            }
        } catch (error) {
            setStatus(`Error starting assistant: ${error.message}`);
        }
    };

    const handleSendText = async (message) => {
        setStatus('Sending message...');

        try {
            const result = await ipcRenderer.invoke('send-text-to-gemini', message);
            if (result.success) {
                setStatus('Message sent');
            } else {
                setStatus(`Error: ${result.error}`);
            }
        } catch (error) {
            setStatus(`Error sending message: ${error.message}`);
        }
    };

    const handleProfileChange = (profile) => {
        setConfig(prev => ({ ...prev, profile }));
    };

    const handleLanguageChange = (language) => {
        setConfig(prev => ({ ...prev, language }));
    };

    const handleScreenshotIntervalChange = (interval) => {
        setConfig(prev => ({ ...prev, screenshotInterval: interval }));
    };

    const handleImageQualityChange = (quality) => {
        setConfig(prev => ({ ...prev, imageQuality: quality }));
    };

    const handleAdvancedModeChange = (advancedMode) => {
        setConfig(prev => ({ ...prev, advancedMode }));
    };

    const handleLayoutModeChange = (layoutMode) => {
        setConfig(prev => ({ ...prev, layoutMode }));
        // Notify main process to update window size
        ipcRenderer.invoke('update-sizes');
    };

    const handleClose = async () => {
        await ipcRenderer.invoke('quit-application');
    };

    const handleHideToggle = async () => {
        await ipcRenderer.invoke('toggle-window-visibility');
    };

    const handleExternalLinkClick = async (url) => {
        await ipcRenderer.invoke('open-external', url);
    };

    const renderCurrentView = () => {
        if (showOnboarding) {
            return (
                <OnboardingView
                    onComplete={handleOnboardingComplete}
                />
            );
        }

        switch (currentView) {
            case 'main':
                return (
                    <MainView
                        onStart={handleStart}
                        onAPIKeyHelp={() => setCurrentView('help')}
                    />
                );
            case 'assistant':
                return (
                    <AssistantView
                        responses={responses}
                        currentResponseIndex={currentResponseIndex}
                        status={status}
                        onSendText={handleSendText}
                        onResponseIndexChange={setCurrentResponseIndex}
                    />
                );
            case 'customize':
                return (
                    <CustomizeView
                        config={config}
                        onProfileChange={handleProfileChange}
                        onLanguageChange={handleLanguageChange}
                        onScreenshotIntervalChange={handleScreenshotIntervalChange}
                        onImageQualityChange={handleImageQualityChange}
                        onAdvancedModeChange={handleAdvancedModeChange}
                        onBack={() => setCurrentView('main')}
                    />
                );
            case 'help':
                return (
                    <HelpView
                        onBack={() => setCurrentView('main')}
                        onExternalLinkClick={handleExternalLinkClick}
                    />
                );
            case 'history':
                return (
                    <HistoryView
                        responses={responses}
                        onBack={() => setCurrentView('main')}
                    />
                );
            case 'advanced':
                return (
                    <AdvancedView
                        config={config}
                        onLayoutModeChange={handleLayoutModeChange}
                        onBack={() => setCurrentView('main')}
                    />
                );
            default:
                return <MainView onStart={handleStart} />;
        }
    };

    return (
        <div className="app">
            {!showOnboarding && (
                <AppHeader
                    currentView={currentView}
                    onCustomizeClick={() => setCurrentView('customize')}
                    onHelpClick={() => setCurrentView('help')}
                    onHistoryClick={() => setCurrentView('history')}
                    onAdvancedClick={() => setCurrentView('advanced')}
                    onClose={handleClose}
                    onHideToggle={handleHideToggle}
                />
            )}
            <div className="app-content">
                {renderCurrentView()}
            </div>
        </div>
    );
}

export default App;
