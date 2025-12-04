// Renderer initialization script for the browser process
// This sets up the global cheddar API for the UI components

const { ipcRenderer } = require('electron');

// Create the global cheddar API
window.cheddar = {
    // Session management
    async initializeGemini(profile, language) {
        try {
            const result = await ipcRenderer.invoke('initialize-gemini', { profile, language });
            if (!result.success) {
                throw new Error(result.error);
            }
            return result;
        } catch (error) {
            console.error('Failed to initialize Gemini:', error);
            throw error;
        }
    },

    startCapture(screenshotInterval, imageQuality) {
        ipcRenderer.send('start-capture', { screenshotInterval, imageQuality });
    },

    stopCapture() {
        ipcRenderer.send('stop-capture');
    },

    async sendTextMessage(message) {
        try {
            const result = await ipcRenderer.invoke('send-text-message', message);
            return result;
        } catch (error) {
            console.error('Failed to send text message:', error);
            return { success: false, error: error.message };
        }
    },

    // Utility functions
    getCurrentView() {
        const app = document.querySelector('#cheddar');
        return app ? app.currentView : 'main';
    },

    getLayoutMode() {
        return localStorage.getItem('layoutMode') || 'normal';
    },

    getContentProtection() {
        return localStorage.getItem('contentProtection') === 'true';
    },

    // Keyboard shortcut handler
    handleShortcut(key) {
        const app = document.querySelector('#cheddar');
        if (!app) return;

        const view = app.currentView;

        if (key === 'cmd+enter' || key === 'ctrl+enter') {
            if (view === 'main') {
                // Start session
                app.handleStart();
            } else if (view === 'assistant') {
                // Take screenshot or process current step
                ipcRenderer.send('take-screenshot');
            }
        }
    }
};

// Set up IPC listeners for updates from main process
ipcRenderer.on('update-status', (event, status) => {
    const app = document.querySelector('#cheddar');
    if (app && app.setStatus) {
        app.setStatus(status);
    }
});

ipcRenderer.on('update-response', (event, response) => {
    const app = document.querySelector('#cheddar');
    if (app && app.setResponse) {
        app.setResponse(response);
    }
});

console.log('Renderer initialized - cheddar API ready');
