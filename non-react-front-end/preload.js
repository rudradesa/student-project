
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("habitAPI", {
  addHabit: (habit) => ipcRenderer.invoke("habits:add", habit),
  getHabits: () => ipcRenderer.invoke("habits:get"),
  markHabitComplete: (id) => ipcRenderer.invoke("habits:markComplete", id),
});
