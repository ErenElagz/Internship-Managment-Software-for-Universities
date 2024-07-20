const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");
const fs = require("fs");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const sqlite3 = require("sqlite3").verbose();

const {
	initDatabase,
	getRecords,
	deleteRecord,
	addInternship,
	getStudent,
	updateIntern,
	getCities,
	getCitiesForMap,
	getCompaniesForChart,
	getIndustriesForChart
} = require("./database");

function createWindow() {
	const win = new BrowserWindow({
		width: 1920,
		height: 1080,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			contextIsolation: true,
			enableRemoteModule: false,
			nodeIntegration: false,
		},
        icon: path.join(__dirname, "src", "assets", "logo.jpg") 

	});

	win.loadFile(path.join(__dirname, "index.html"));

	ipcMain.handle("get-records", () => {
		return getRecords();
	});

	ipcMain.handle("delete-record", (event, id) => {
		return deleteRecord(id);
	});

	ipcMain.handle("add-internship", (event, formData) => {
		return addInternship(formData);
	});

	ipcMain.handle("get-student", (event, id) => {
		return getStudent(id);
	});

	ipcMain.handle("update-intern", (event, record, id) => {
		return updateIntern(record, id);
	});

	ipcMain.handle("get-cities", () => {
		return getCities();
	});

	ipcMain.handle("get-cities-for-map", () => {
		return getCitiesForMap();
	});

	ipcMain.handle("get-companies-for-chart", () => {
		return getCompaniesForChart();
	});

	ipcMain.handle("get-industries-for-chart", () => {
		return getIndustriesForChart();
	});
}

app.whenReady().then(() => {
	initDatabase();
	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

let isBackupCompleted = false;
app.on("before-quit", (event) => {
	if (!isBackupCompleted) {
		event.preventDefault();
		backupDatabase()
			.then(() => {
				isBackupCompleted = true;
				app.quit();
			})
			.catch((err) => {
				console.error("Database backup failed: ", err);
				isBackupCompleted = true;
				app.quit();
			});
	}
});

ipcMain.handle("backup-database", async (event) => {
	try {
		await backupDatabase();
		await exportDatabaseToCSV();
		return {success: true};
	} catch (err) {
		console.error("Backup failed: ", err);
		return {success: false, error: err.message};
	}
});

async function exportDatabaseToCSV() {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, "0");
	const day = String(now.getDate()).padStart(2, "0");
	const hours = String(now.getHours()).padStart(2, "0");
	const minutes = String(now.getMinutes()).padStart(2, "0");
	let time = `${year}-${month}-${day}_${hours}-${minutes}`;

	const dbPath = path.join(__dirname, "database.db");
	const db = new sqlite3.Database(dbPath);
	const userDocumentsPath = app.getPath("documents");
	const destinationDir = path.join(userDocumentsPath, "hitit-internship");

	// Ensure the export directory exists
	if (!fs.existsSync(destinationDir)) {
		fs.mkdirSync(destinationDir, {recursive: true});
	}

	const csvPath = path.join(
		destinationDir,
		`database_backup_${time}.csv`,
	);

	return new Promise((resolve, reject) => {
		db.serialize(() => {
			db.all("SELECT * FROM interns", (err, rows) => {
				// replace 'your_table_name' with your actual table name
				if (err) {
					reject(err);
				} else {
					const csvWriter = createCsvWriter({
						path: csvPath,
						header: Object.keys(rows[0]).map((column) => ({
							id: column,
							title: column,
						})),
					});

					csvWriter
						.writeRecords(rows)
						.then(() => {
							console.log("CSV file was written successfully");
							resolve();
						})
						.catch((error) => {
							reject(error);
						});
				}
			});
		});
	});
}

async function backupDatabase() {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, "0");
	const day = String(now.getDate()).padStart(2, "0");
	const hours = String(now.getHours()).padStart(2, "0");
	const minutes = String(now.getMinutes()).padStart(2, "0");
	let time = `${year}-${month}-${day}_${hours}-${minutes}`;

	const source = path.join(__dirname, "database.db");
	const userDocumentsPath = app.getPath("documents");
	const destinationDir = path.join(userDocumentsPath, "hitit-internship");

	if (!fs.existsSync(destinationDir)) {
		fs.mkdirSync(destinationDir, {recursive: true});
	}

	const destination = path.join(
		destinationDir,
		`internship_database_backup_${time}.db`,
	);

	return new Promise((resolve, reject) => {
		fs.copyFile(source, destination, (err) => {
			if (err) reject(err);
			else resolve();
		});
	});
}
