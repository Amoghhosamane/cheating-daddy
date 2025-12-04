const { BrowserWindow, ipcMain, screen } = require("electron");
const path = require("node:path");

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, "../preload.js"),
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    mainWindow.loadFile(path.join(__dirname, "../index.html"));
    mainWindow.webContents.openDevTools();

    return mainWindow;
}

module.exports = {
    createWindow
};
