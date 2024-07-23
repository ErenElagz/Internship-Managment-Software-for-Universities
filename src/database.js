const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.join(__dirname, "database.db");
const db = new sqlite3.Database(dbPath);

function initDatabase() {
	db.serialize(() => {
		db.run(
			`CREATE TABLE IF NOT EXISTS interns (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			student_school_number TEXT,
			student_name TEXT,
			student_surname TEXT,
			student_contact TEXT,
			company_name TEXT,
			company_industry TEXT,
			company_city TEXT,
			company_contact TEXT,
			intern_type TEXT,
			intern_start_date TEXT,
			intern_end_date TEXT,
			intern_days INTEGER,
			intern_accepted_days INTEGER,
			intern_rejected_days INTEGER,
			intern_mb BOOLEAN DEFAULT 1,
			intern_re BOOLEAN DEFAULT 1,
			intern_dsy BOOLEAN DEFAULT 1,
			intern_cancelled BOOLEAN DEFAULT 0
			)`,
		);
	});
}

function getRecords() {
	return new Promise((resolve, reject) => {
		db.all(`SELECT * FROM interns ORDER BY student_name`, (err, rows) => {
			if (err) {
				reject(err);
			} else {
				resolve(rows);
			}
		});
	});
}

function deleteRecord(id) {
	return new Promise((resolve, reject) => {
		db.run(`DELETE FROM interns WHERE id = ?`, id, function (err) {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}

function addInternship(formData) {
	return new Promise((resolve, reject) => {
		const stmt = db.prepare(
			`INSERT INTO interns (
			student_school_number,
			student_name,
			student_surname,
			student_contact,
			company_name,
			company_industry,
			company_city,
			company_contact,
			intern_type,
			intern_start_date,
			intern_end_date,
			intern_days,
			intern_accepted_days,
			intern_rejected_days,
			intern_mb,
			intern_re,
			intern_dsy,
			intern_cancelled
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		);

		stmt.run(
			formData.studentNumber,
			formData.studentName,
			formData.studentSurname,
			formData.studentContact,
			formData.companyName,
			formData.companyIndustry,
			formData.companyCity,
			formData.companyContact,
			formData.internType,
			formData.internStartDate,
			formData.internEndDate,
			formData.internDays,
			formData.internAcceptedDays,
			formData.internRejectedDays,
			formData.intern_mb,
			formData.intern_re,
			formData.intern_dsy,
			formData.intern_cancelled,
			function (err) {
				if (err) {
					reject(err);
				} else {
					resolve({exists: false, lastID: this.lastID});
				}
			},
		);

		stmt.finalize();
	});
}

function getStudent(id) {
	return new Promise((resolve, reject) => {
		db.get(`SELECT * FROM interns WHERE id = ?`, id, (err, row) => {
			if (err) {
				reject(err);
			} else {
				resolve(row);
			}
		});
	});
}

function updateIntern(record, id) {
	return new Promise((resolve, reject) => {
		const stmt = db.prepare(
			`UPDATE interns SET
			student_school_number = ?,
			student_name = ?,
			student_surname = ?,
			student_contact = ?,
			company_name = ?,
			company_industry = ?,
			company_city = ?,
			company_contact = ?,
			intern_type = ?,
			intern_start_date = ?,
			intern_end_date = ?,
			intern_days = ?,
			intern_accepted_days = ?,
			intern_rejected_days = ?,
			intern_mb = ?,
			intern_re = ?,
			intern_dsy = ?,
			intern_cancelled = ?
			WHERE id = ?`,
		);

		stmt.run(
			record.student_school_number,
			record.student_name,
			record.student_surname,
			record.student_contact,
			record.company_name,
			record.company_industry,
			record.company_city,
			record.company_contact,
			record.intern_type,
			record.intern_start_date,
			record.intern_end_date,
			record.intern_days,
			record.intern_accepted_days,
			record.intern_rejected_days,
			record.intern_mb,
			record.intern_re,
			record.intern_dsy,
			record.intern_cancelled,
			id,
			function (err) {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			},
		);

		stmt.finalize();
	});
}

function getCities() {
	return new Promise((resolve, reject) => {
		const query = `
            SELECT company_city, COUNT(*) as count 
            FROM interns 
            GROUP BY company_city 
            ORDER BY count DESC 
            LIMIT 10`;

		db.all(query, (err, rows) => {
			if (err) {
				reject(err);
			} else {
				resolve(
					rows.map((row) => ({
						name: row.company_city,
						value: row.count,
					})),
				);
			}
		});
	});
}

function getCitiesForMap() {
	return new Promise((resolve, reject) => {
		const query = `
            SELECT company_city, COUNT(*) as count 
            FROM interns 
            GROUP BY company_city 
            ORDER BY count ASC`;

		db.all(query, (err, rows) => {
			if (err) {
				reject(err);
			} else {
				resolve(
					rows.map((row) => ({
						name: row.company_city,
						value: row.count,
					})),
				);
			}
		});
	});
}

function getCompaniesForChart() {
	return new Promise((resolve, reject) => {
		const query = `
            SELECT company_name, COUNT(*) as count 
            FROM interns 
            GROUP BY company_name
            ORDER BY count DESC LIMIT 10`;

		db.all(query, (err, rows) => {
			if (err) {
				reject(err);
			} else {
				resolve(
					rows.map((row) => ({
						name: row.company_name,
						value: row.count,
					})),
				);
			}
		});
	});
}

function getIndustriesForChart() {
	return new Promise((resolve, reject) => {
		const query = `
            SELECT company_industry, COUNT(*) as count 
            FROM interns 
            GROUP BY company_industry
            ORDER BY count DESC LIMIT 10`;

		db.all(query, (err, rows) => {
			if (err) {
				reject(err);
			} else {
				resolve(
					rows.map((row) => ({
						name: row.company_industry,
						value: row.count,
					})),
				);
			}
		});
	});
}

module.exports = {
	initDatabase,
	getRecords,
	deleteRecord,
	addInternship,
	getStudent,
	updateIntern,
	getCities,
	getCitiesForMap,
	getCompaniesForChart,
	getIndustriesForChart,
};
