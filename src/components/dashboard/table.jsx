import React, { useState, useEffect } from "react";

export default function TableComponent({ title }) {
    const [data, setData] = useState([]);  // Ensure useState is directly inside the component

    useEffect(() => {
        // Example fetching logic
        window.electron.getCompaniesForChart()
            .then(data => setData(data))
            .catch(error => console.error("Failed to fetch data:", error));
    }, []); // Empty dependency array to ensure it runs only once on mount

    return (
        <div className="w-25% p-4 rounded-3xl bg-gray-100 m-auto">
            <h2 className="text-2xl font-bold text-left mb-4">{title}</h2>
            <table className="min-w-full bg-white border-collapse">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Company</th>
                        <th className="py-2 px-4 border-b">Value</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b text-xl text-center">{item.name}</td>
                            <td className="py-2 px-4 border-b text-xl text-center">{item.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
