import React, {useEffect, useState} from "react";
import {PieChart, Pie, Cell, Tooltip, Legend} from "recharts";

const COLORS = [
	"#0088FE", // Vivid Blue
	"#00C49F", // Soft Teal
	"#FFBB28", // Vibrant Yellow
	"#FF8042", // Bright Orange
	"#A28DFC", // Light Purple
	"#50C878", // Emerald
	"#FF6666", // Soft Red
	"#AF4035", // Pale Brown
	"#4B0082", // Indigo
	"#F08080", // Light Coral
	"#DE3163", // Cerise
	"#9FE2BF", // Sea Green
	"#CCCCFF", // Lavender Blue
	"#8A2BE2", // Blue Violet
	"#DE6FA1", // Light Crimson
	"#B0E0E6", // Powder Blue
	"#FC6C85", // Salmon Pink
	"#48D1CC", // Medium Turquoise
	"#C71585", // Medium Violet Red
	"#7B68EE", // Medium Slate Blue
	"#6A5ACD", // Slate Blue
	"#708090", // Slate Gray
	"#FFD700", // Gold
	"#F88379", // Coral Pink
	"#FF7F50", // Coral
	"#C0C0C0", // Silver
	"#FF6347", // Tomato
	"#800080", // Purple
	"#FF4500", // Orange Red
	"#DA70D6", // Orchid
	"#DB7093", // Pale Violet Red
	"#CD853F", // Peru
	"#FFC0CB", // Pink
	"#DDA0DD", // Plum
	"#B0C4DE", // Light Steel Blue
	"#BC8F8F", // Rosy Brown
	"#4169E1", // Royal Blue
	"#8B4513", // Saddle Brown
];

export default function PieComponent({title}) {
	const [cities, setCities] = useState([]);

	useEffect(() => {
		window.electron.getCities().then((fetchedCities) => {
			setCities(fetchedCities);
		});
	}, []);

	return (
		<div className="w-full p-4 rounded-3xl bg-gray-100 m-auto">
			<h2 className="text-2xl font-bold text-left mb-4">{title}</h2>
			<PieChart width={500} height={500}>
				<Pie
					data={cities}
					cx="50%"
					cy="50%"
					outerRadius={200}
					innerRadius={100}
					fill="#8884d8"
					dataKey="value"
					label
				>
					{cities.map((entry, index) => (
						<Cell
							className="font-bold"
							key={`cell-${index}`}
							fill={COLORS[index % COLORS.length]}
						/>
					))}
				</Pie>
				<Tooltip />
				<Legend />
			</PieChart>
		</div>
	);
}
