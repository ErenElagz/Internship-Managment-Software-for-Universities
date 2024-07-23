import React, {useState, useCallback} from "react";
import Header from "../components/header/header";
import Button from "../components/button/button";
import InputField from "../components/inputField/inputField";
import {cities} from "../constants/cities";
import {internType} from "../constants/intern-type";
import {industries} from "../constants/industries";
import ErrorModal from "../components/modal/ErrorModal";

export default function AddRecord() {
	const [formData, setFormData] = useState({
		studentNumber: "",
		studentName: "",
		studentSurname: "",
		studentContact: "",
		companyName: "",
		companyIndustry: "computer-engineering",
		companyCity: "Adana",
		companyContact: "",
		internType: "intern1",
		internStartDate: "",
		internEndDate: "",
		internDays: "40",
		internAcceptedDays: "0",
		internRejectedDays: "0",
		intern_mb: false,
		intern_re: false,
		intern_dsy: false,
		intern_cancelled: false,
	});

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMessage, setModalMessage] = useState("");

	const handleChange = useCallback((e) => {
		const {name, value, type, checked} = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		await window.electron.addInternship(formData);
		window.location.href = `#/table`;
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
							name="studentNumber"
							value={formData.studentNumber}
							onChange={handleChange}
						/>
						<InputField
							label="Name"
							name="studentName"
							value={formData.studentName}
							onChange={handleChange}
						/>
						<InputField
							label="Surname"
							name="studentSurname"
							value={formData.studentSurname}
							onChange={handleChange}
						/>
						<InputField
							label="Contact"
							name="studentContact"
							value={formData.studentContact}
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
							name="companyName"
							value={formData.companyName}
							onChange={handleChange}
							
						/>
						<InputField
							label="Company Industry"
							name="companyIndustry"
							value={formData.companyIndustry}
							onChange={handleChange}
							type="select"
							options={industries}
						/>
						<InputField
							label="Contact"
							name="companyContact"
							value={formData.companyContact}
							onChange={handleChange}
						/>
						<InputField
							label="City"
							name="companyCity"
							value={formData.companyCity}
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
							name="internType"
							value={formData.internType}
							onChange={handleChange}
							type="select"
							options={internType}
						/>
						<InputField
							label="Day"
							name="internDays"
							value={formData.internDays}
							onChange={handleChange}
						/>
						<InputField
							label="Accepted Day"
							name="internAcceptedDays"
							value={formData.internAcceptedDays}
							onChange={handleChange}
						/>
						<InputField
							label="Rejected Day"
							name="internRejectedDays"
							value={formData.internRejectedDays}
							onChange={handleChange}
						/>
						<InputField
							label="Start Date"
							name="internStartDate"
							type="date"
							value={formData.internStartDate}
							onChange={handleChange}
						/>
						<InputField
							label="End Date"
							name="internEndDate"
							type="date"
							value={formData.internEndDate}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="mb-4">
					<h2 className="text-gray-600 text-3xl font-bold mb-3 mt-10">
						Validation
					</h2>
					<div className="grid grid-cols-4 gap-4">
						<label className="flex items-center gap-4 align-center">
							<span className="ml-3 text-xl font-semibold">
								Offical Document
							</span>
							<input
								type="checkbox"
								name="intern_re"
								checked={formData.intern_re}
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
								checked={formData.intern_mb}
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
								checked={formData.intern_dsy}
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
								checked={formData.intern_cancelled}
								onChange={handleChange}
							/>
						</label>
					</div>
				</div>
				<div className="flex items-center justify-between my-10">
					<Button className="w-full py-3" onClick={handleSubmit}>
						Add Intern
					</Button>
				</div>
			</form>
			<ErrorModal
				isOpen={isModalOpen}
				onRequestClose={() => setIsModalOpen(false)}
				message={modalMessage}
			/>
		</div>
	);
}
