import React from "react";
import Header from "../components/header/header";
import PieComponent from "../components/dashboard/pie";
import MapComponent from "../components/dashboard/map";
import BarComponent from "../components/dashboard/bar";
import TableComponent from "../components/dashboard/table";

export default function Home() {
	return (
		<div>
			<Header />
			<div className="flex flex-wrap pt-5 w-5/6 m-auto">
				<div className="w-1/3  lg:width-1/3 p-2">
					<PieComponent title={`Cities Chart`} />
				</div>
				<div className="w-2/3 lg:width-2/3 p-2">
					<MapComponent title={`Records on the Map`} />
				</div>
			</div>
			<div className="flex flex-wrap w-5/6 m-auto mb-10">
				<div className="w-2/3  lg:width-2/3 p-2">
					<BarComponent title={`Company Industries`} />
				</div>
				<div className="w-1/3  lg:width-1/3 p-2">
					<TableComponent title={`Companies`} />
				</div>
			</div>
		</div>
	);
}
