import React, { useState } from 'react';
import './OnboardingView.css';

function OnboardingView({ onComplete }) {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: 'Welcome to Cheating Daddy! 🎯',
            description: 'Your AI-powered interview assistant. Get real-time help during interviews, coding challenges, and technical discussions.',
            icon: '👋'
        },
        {
            title: 'How It Works',
            description: 'Cheating Daddy captures your screen and audio, then provides intelligent suggestions using Google\'s Gemini AI.',
            icon: '🧠'
        },
        {
            title: 'Setup Required',
            description: 'You\'ll need a Google API key to use this app. Don\'t worry, we\'ll guide you through getting one for free!',
            icon: '🔑'
        },
        {
            title: 'Privacy & Ethics',
            description: 'This tool is for educational purposes. Use responsibly and be aware of your organization\'s policies.',
            icon: '⚖️'
        }
    ];

    const currentStep = steps[step];
    const isLastStep = step === steps.length - 1;

    const handleNext = () => {
        if (isLastStep) {
            onComplete();
        } else {
            setStep(step + 1);
        }
    };

    const handlePrevious = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    return (
        <div className="onboarding-view fade-in">
            <div className="onboarding-container">
                <div className="onboarding-card glass">
                    <div className="step-indicator">
                        {steps.map((_, index) => (
                            <div
                                key={index}
                                className={`step-dot ${index === step ? 'active' : ''} ${index < step ? 'completed' : ''}`}
                            />
                        ))}
                    </div>

                    <div className="onboarding-icon">{currentStep.icon}</div>

                    <h1 className="onboarding-title">{currentStep.title}</h1>

                    <p className="onboarding-description">{currentStep.description}</p>

                    {step === 2 && (
                        <div className="info-box">
                            <h3>Getting Your API Key:</h3>
                            <ol>
                                <li>Visit <a href="#" onClick={(e) => { e.preventDefault(); window.require('electron').ipcRenderer.invoke('open-external', 'https://aistudio.google.com/app/apikey'); }}>Google AI Studio</a></li>
                                <li>Sign in with your Google account</li>
                                <li>Click "Get API key" or "Create API key"</li>
                                <li>Copy your key and paste it in the main screen</li>
                            </ol>
                        </div>
                    )}

                    <div className="onboarding-actions">
                        {step > 0 && (
                            <button className="btn btn-secondary" onClick={handlePrevious}>
                                ← Previous
                            </button>
                        )}

                        <button className="btn btn-primary" onClick={handleNext}>
                            {isLastStep ? 'Get Started 🚀' : 'Next →'}
                        </button>
                    </div>

                    <div className="onboarding-footer">
                        <button className="skip-btn" onClick={onComplete}>
                            Skip Tutorial
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OnboardingView;
