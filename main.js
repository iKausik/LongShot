const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const longShot = require("./longShot");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true, // Enable node.js features
      contextIsolation: false, // Disable context isolation
    },
    icon: "/path/to/icon.png",
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// Listen for messages from renderer process
ipcMain.on("run-script", async (event, url) => {
  // Run your backend script and get the result
  const result = await longShot(url);

  // Send back the result to the renderer process
  event.reply("script-result", result);
});
