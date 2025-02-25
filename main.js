const { app, BrowserWindow } = require("electron");

let mainWindow;

app.whenReady().then(() => {
  app.commandLine.appendSwitch("high-dpi-support", "1");
  app.commandLine.appendSwitch("force-device-scale-factor", "1");

  mainWindow = new BrowserWindow({
    width: 400,
    height: 500,
    frame: false,  // Removes the default header bar
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile("index.html");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});



