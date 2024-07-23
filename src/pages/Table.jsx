import React, {useEffect, useState} from "react";
import Header from "../components/header/header";
import DeleteConfirmationModal from "../components/modal/DeleteConfirmationModal";

export default function TablePage() {
	const [interns, setInterns] = useState([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [selectedId, setSelectedId] = useState(null);

	const handleDelete = (id) => {
		setSelectedId(id);
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	useEffect(() => {
		window.electron.getRecords().then(setInterns);
	}, []);

	const confirmDelete = () => {
		window.electron.deleteRecord(selectedId).then(() => {
			setInterns(interns.filter((intern) => intern.id !== selectedId));
			closeModal();
		});
	};

	const handleUpdate = (id) => {
		window.location.href = `#/update-record/${id}`;
	};
	let increment = 1;
	return (
		<div>
			<Header />
			<table className="leading-normal w-11/12 m-auto mt-3">
				<thead>
					<tr className="bg-gray-100 border-b-2 border-gray-100 ">
						<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
							ID
						</th>
						<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
							School Number
						</th>
						<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
							Name Surname
						</th>
						<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
							Company
						</th>
						<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
							City
						</th>
						<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
							Industry
						</th>
						<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
							Intern
						</th>
						<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
							Days
						</th>
						<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
							Start Day - End Date
						</th>
						<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
							Documents
						</th>
						<th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{interns &&
						interns.map((intern, index) => (
							<tr key={index} className="hover:bg-gray-100 ">
								<td className="px-5 py-5 border-b  text-sm">
									{increment++}
								</td>
								<td className="px-5 py-5 border-b  text-sm">
									{intern.student_school_number}
								</td>
								<td className="px-5 py-5 border-b  text-sm font-semibold">
									{intern.student_name +
										` ` +
										intern.student_surname}
								</td>
								<td className="px-5 py-5 border-b  text-sm">
									{intern.company_name}
								</td>
								<td className="px-5 py-5 border-b  text-sm">
									{intern.company_city}
								</td>
								<td className="px-5 py-5 border-b  text-sm">
									{intern.company_industry}
								</td>
								<td className="px-5 py-5 border-b  text-sm">
									{intern.intern_type}
								</td>
								<td className="px-5 py-5 border-b text-sm flex items-center justify-start space-x-2">
									<span className="inline-flex bg-blue-100 text-blue-800 text-s font-semibold px-2.5 py-0.5 rounded">
										Total: {intern.intern_days}
									</span>
									<span className="inline-flex bg-green-100 text-green-800 text-s font-semibold px-2.5 py-0.5 rounded">
										Accepted: {intern.intern_accepted_days}
									</span>
									<span className="inline-flex bg-red-100 text-red-800 text-s font-semibold px-2.5 py-0.5 rounded">
										Rejected: {intern.intern_rejected_days}
									</span>
								</td>
								<td className="px-5 py-5 border-b  text-sm">
									<span className="inline-flex bg-purple-100 text-purple-800 text-s font-semibold px-2.5 py-0.5 rounded">
										{intern.intern_start_date}
									</span>
									<span className="inline-flex bg-orange-100 text-orange-800 text-s font-semibold px-2.5 py-0.5 rounded">
										{intern.intern_end_date}
									</span>
								</td>
								<td className="px-5 py-5 border-b  text-sm">
									<span className="inline-flex bg-green-100 text-green-800 text-s font-semibold px-2.5 py-0.5 rounded">
										{intern.intern_re ? "RE " : null}
									</span>
									<span className="inline-flex bg-orange-100 text-red-800 text-s font-semibold px-2.5 py-0.5 rounded">
										{intern.intern_mb ? "MB " : null}
									</span>
									<span className="inline-flex bg-blue-100 text-blue-800 text-s font-semibold px-2.5 py-0.5 rounded">
										{intern.intern_dsy ? "DSY " : null}
									</span>
									<span className="inline-flex bg-red-100 text-red-800 text-s font-semibold px-2.5 py-0.5 rounded">
										{intern.intern_cancelled ? "Cancelled " : null}
									</span>
								</td>
								<td className="px-5 py-5 border-b border-gray-200  text-sm flex items-center space-x-3">
									<button
										className="text-white bg-blue-500 hover:bg-blue-700 px-3 py-1 text-sm font-medium rounded"
										onClick={() => handleUpdate(intern.id)}
									>
										Update
									</button>
									<button
										className="text-white bg-red-500 hover:bg-red-700 px-3 py-1 text-sm font-medium rounded"
										onClick={(event) =>
											handleDelete(intern.id)
										}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
			<DeleteConfirmationModal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				onConfirm={confirmDelete}
			/>
		</div>
	);
}
