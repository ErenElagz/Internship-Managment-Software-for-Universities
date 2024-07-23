import React, {useState, useCallback, useEffect} from "react";
import Header from "../components/header/header";
import Button from "../components/button/button";
import InputField from "../components/inputField/inputField";
import {cities} from "../constants/cities";
import {internType} from "../constants/intern-type";
import {useParams} from "react-router-dom";
import {industries} from "../constants/industries";

export default function UpdateRecord() {
	const {id} = useParams();
	const [record, setRecord] = useState(null);

	useEffect(() => {
		window.electron.getStudent(id).then((record) => {
			setRecord(record);
			console.log("Record", record);
		});
	}, [id]);

	const handleChange = useCallback((e) => {
		const {name, value, type, checked} = e.target;
		setRecord((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		window.electron.updateIntern(record, id).then((result) => {
			window.location.href = `#/table`;
		});
	};

	return (
		<div>
			<Header />
			<form onSubmit={handleSubmit} className="my-5 m-auto w-5/6">
				<div className="mb-4">
					<h2 className="text-gray-600 text-3xl font-bold mb-3 mt-3">
						Student
					</h2>
					<div className="grid grid-cols-2 gap-4">
						<InputField
							label="Student Number"
							name="student_school_number"
							value={record?.student_school_number}
							onChange={handleChange}
						/>
						<InputField
							label="Name"
							name="student_name"
							value={record?.student_name}
							onChange={handleChange}
						/>
						<InputField
							label="Surname"
							name="student_surname"
							value={record?.student_surname}
							onChange={handleChange}
						/>
						<InputField
							label="Contact"
							name="student_contact"
							value={record?.student_contact}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="mb-4">
					<h2 className="text-gray-600 text-3xl font-bold mb-3 mt-10">
						Company
					</h2>
					<div className="grid grid-cols-2 gap-4">
						<InputField
							label="Company Name"
							name="company_name"
							value={record?.company_name}
							onChange={handleChange}
						/>
						<InputField
							label="Company Industry"
							name="company_industry"
							value={record?.company_industry}
							onChange={handleChange}
							type="select"
							options={industries}
						/>
						<InputField
							label="Contact"
							name="company_contact"
							value={record?.company_contact}
							onChange={handleChange}
						/>
						<InputField
							label="City"
							name="company_city"
							value={record?.company_city}
							onChange={handleChange}
							type="select"
							options={cities}
						/>
					</div>
				</div>
				<div className="mb-4">
					<h2 className="text-gray-600 text-3xl font-bold mb-3 mt-10">
						Internship Programme
					</h2>

					<div className="grid grid-cols-2 gap-4">
						<InputField
							label="Intern Type"
							name="intern_type"
							value={record?.intern_type}
							onChange={handleChange}
							type="select"
							options={internType}
						/>
						<InputField
							label="Day"
							name="intern_days"
							value={record?.intern_days}
							onChange={handleChange}
						/>
						<InputField
							label="Accepted Day"
							name="intern_accepted_days"
							value={record?.intern_accepted_days}
							onChange={handleChange}
						/>
						<InputField
							label="Rejected Day"
							name="intern_rejected_days"
							value={record?.intern_rejected_days}
							onChange={handleChange}
						/>
						<InputField
							label="Start Date"
							name="intern_start_date"
							type="date"
							value={record?.intern_start_date}
							onChange={handleChange}
						/>
						<InputField
							label="End Date"
							name="intern_end_date"
							type="date"
							value={record?.intern_end_date}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="mb-4">
					<h2 className="text-gray-600 text-3xl font-bold mb-3 mt-10">
						Documents
					</h2>
					<div className="grid grid-cols-4 gap-4">
						<label className="flex items-center gap-4 align-center">
							<span className="ml-3 text-xl font-semibold">
								Official Document
							</span>
							<input
								type="checkbox"
								name="intern_re"
								checked={record?.intern_re || false}
								onChange={handleChange}
							/>
						</label>
						<label className="flex items-center gap-4 align-center">
							<span className="ml-3 text-xl font-semibold">
								Engineering Certificate
							</span>
							<input
								type="checkbox"
								name="intern_mb"
								checked={record?.intern_mb || false}
								onChange={handleChange}
							/>
						</label>
						<label className="flex items-center gap-4 align-center">
							<span className="ml-3 text-xl font-semibold">
								Other Documents
							</span>
							<input
								type="checkbox"
								name="intern_dsy"
								checked={record?.intern_dsy || false}
								onChange={handleChange}
							/>
						</label>
						<label className="flex items-center gap-4 align-center">
							<span className="ml-3 text-xl font-semibold">
								Cancelled Internship
							</span>
							<input
								type="checkbox"
								name="intern_cancelled"
								checked={record?.intern_cancelled || false}
								onChange={handleChange}
							/>
						</label>
					</div>
				</div>
				<div className="flex items-center justify-between my-10">
					<Button className="w-full py-3" onClick={handleSubmit}>
						Update Intern
					</Button>
				</div>
			</form>
		</div>
	);
}
