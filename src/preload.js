const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  getRecords: () => ipcRenderer.invoke('get-records'),
  deleteRecord: (id) => ipcRenderer.invoke('delete-record', id),
  addInternship: (formData) => ipcRenderer.invoke('add-internship', formData),
  getStudent: (id) => ipcRenderer.invoke('get-student', id),
  updateIntern: (record, id) => ipcRenderer.invoke('update-intern', record, id),
  getCities: () => ipcRenderer.invoke('get-cities'),
  getCitiesForMap: () => ipcRenderer.invoke('get-cities-for-map'),
  getCompaniesForChart: () => ipcRenderer.invoke('get-companies-for-chart'),
  getIndustriesForChart: () => ipcRenderer.invoke('get-industries-for-chart'),
  backupDatabase: () => ipcRenderer.invoke('backup-database')

});
