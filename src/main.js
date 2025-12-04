const { app, BrowserWindow, shell, ipcMain } = require('electron');
const path = require('path');

// Check for squirrel startup
if (require('electron-squirrel-startup')) {
    process.exit(0);
}

let mainWindow = null;
const geminiSessionRef = { current: null };

// Import utilities (with error handling for missing modules)
let setupGeminiIpcHandlers, stopMacOSAudioCapture, sendToRenderer;
try {
    const geminiUtils = require('./utils/gemini.js');
    setupGeminiIpcHandlers = geminiUtils.setupGeminiIpcHandlers;
    stopMacOSAudioCapture = geminiUtils.stopMacOSAudioCapture;
    sendToRenderer = geminiUtils.sendToRenderer;
} catch (error) {
    console.warn('Gemini utils not found, some features will be disabled:', error.message);
    // Provide fallback functions
    setupGeminiIpcHandlers = () => console.log('Gemini IPC handlers not available');
    stopMacOSAudioCapture = () => { };
    sendToRenderer = () => { };
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 600,
        frame: true,
        transparent: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            backgroundThrottling: false,
        },
        backgroundColor: '#1e1e1e',
    });

    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    mainWindow.webContents.openDevTools();

    return mainWindow;
}

app.whenReady().then(() => {
    createWindow();

    // Set up IPC handlers
    if (setupGeminiIpcHandlers) {
        setupGeminiIpcHandlers(geminiSessionRef);
    }
    setupGeneralIpcHandlers();
});

app.on('window-all-closed', () => {
    if (stopMacOSAudioCapture) {
        stopMacOSAudioCapture();
    }
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('before-quit', () => {
    if (stopMacOSAudioCapture) {
        stopMacOSAudioCapture();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

function setupGeneralIpcHandlers() {
    // Application control handlers
    ipcMain.handle('quit-application', async () => {
        try {
            if (stopMacOSAudioCapture) {
                stopMacOSAudioCapture();
            }
            app.quit();
            return { success: true };
        } catch (error) {
            console.error('Error quitting application:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('open-external', async (event, url) => {
        try {
            await shell.openExternal(url);
            return { success: true };
        } catch (error) {
            console.error('Error opening external URL:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('toggle-window-visibility', async () => {
        try {
            if (mainWindow && !mainWindow.isDestroyed()) {
                if (mainWindow.isVisible()) {
                    mainWindow.hide();
                } else {
                    mainWindow.show();
                }
            }
            return { success: true };
        } catch (error) {
            console.error('Error toggling window visibility:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle('update-sizes', async (event) => {
        try {
            if (mainWindow && !mainWindow.isDestroyed()) {
                // Get current view and layout mode from renderer
                let viewName, layoutMode;
                try {
                    viewName = await event.sender.executeJavaScript('cheddar.getCurrentView()');
                    layoutMode = await event.sender.executeJavaScript('cheddar.getLayoutMode()');
                } catch (error) {
                    console.warn('Failed to get view/layout from renderer, using defaults:', error);
                    viewName = 'main';
                    layoutMode = 'normal';
                }

                console.log('Size update requested for view:', viewName, 'layout:', layoutMode);

                // Determine base size from layout mode
                const baseWidth = layoutMode === 'compact' ? 700 : 900;
                const baseHeight = layoutMode === 'compact' ? 500 : 600;

                let targetWidth = baseWidth;
                let targetHeight = baseHeight;

                // Adjust height based on view
                switch (viewName) {
                    case 'customize':
                    case 'settings':
                        targetHeight = layoutMode === 'compact' ? 700 : 800;
                        break;
                    case 'help':
                    case 'history':
                        targetHeight = layoutMode === 'compact' ? 650 : 750;
                        break;
                    case 'advanced':
                        targetHeight = layoutMode === 'compact' ? 600 : 700;
                        break;
                    default:
                        // main, assistant, onboarding use base height
                        break;
                }

                mainWindow.setSize(targetWidth, targetHeight, true);
                console.log(`Window resized to ${targetWidth}x${targetHeight}`);
            }
            return { success: true };
        } catch (error) {
            console.error('Error updating sizes:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.on('view-changed', (event, view) => {
        console.log('View changed to:', view);
    });

    // Error logging handlers
    ipcMain.on('renderer-error', (event, error) => {
        console.error('RENDERER ERROR:', error);
    });

    ipcMain.on('renderer-console-error', (event, args) => {
        console.error('RENDERER CONSOLE ERROR:', ...args);
    });
}

