const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    sendMessage: msg => ipcRenderer.send("message", msg),
    onStatusUpdate: cb => ipcRenderer.on("update-status", (_, status) => cb(status)),
});
