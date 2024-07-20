import React, {useState, useEffect} from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

export default function BarComponent({title}) {
	const [data, setData] = useState([]);
	useEffect(() => {
		window.electron.getIndustriesForChart().then((data) => {
			setData(data);
		});
	}, []);
	return (
		<div className="w-full p-4 rounded-3xl bg-gray-100 m-auto">
			<h2 className="text-2xl font-bold text-left mb-4">{title}</h2>

			<ResponsiveContainer width="100%" aspect={4.0 / 2.0}>
				<BarChart width={500} height={500} data={data && data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis dataKey="value" />
					<Tooltip />
					<Legend />
					<Bar dataKey="value" fill="#8884d8" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
