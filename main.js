const { app, BrowserWindow, ipcMain, protocol } = require("electron");
const path = require("path");
const { spawn } = require("child_process");
const { initDB, addHabit, getHabits, markHabitComplete } = require("./non-react-front-end/habitDB.js");
let frontendProcess;
let db; // sqlite db instance

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "non-react-front-end/preload.js"), // ✅ preload bridge
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // React frontend
  win.loadURL("http://localhost:3000");

  // 👉 You could also load habit tracker HTML (test separately)
  // win.loadFile(path.join(__dirname, "habit-tracker/index.html"));
}

app.whenReady().then(async () => {
 
  db = await initDB();
protocol.registerFileProtocol("habit", (request, callback) => {
  try {
    const filePath = path.join(__dirname, "non-react-front-end", "index.html");
    callback({ path: filePath });
  } catch (err) {
    console.error("Protocol error:", err);
  }
});

  frontendProcess = spawn("npm", ["start"], {
    cwd: path.join(__dirname, "final-project"), 
    shell: true,
    stdio: "inherit"
  });

  // Give React time to boot before opening window
  setTimeout(() => {
    createWindow();
  }, 3000);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
    win.webContents.openDevTools();
  });
});

// ✅ IPC handlers for Habit Tracker
ipcMain.handle("habits:add", async (_event, habit) => {
  return await addHabit(db, habit);
});

ipcMain.handle("habits:get", async () => {
  return await getHabits(db);
});

ipcMain.handle("habits:markComplete", async (_event, id) => {
  return await markHabitComplete(db, id);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    if (frontendProcess) frontendProcess.kill();
    app.quit();
  }
});
