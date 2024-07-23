import React from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import TablePage from "./pages/Table";
import AddRecord from "./pages/AddRecord";
import UpdateRecord from "./pages/UpdateRecord";
import Search from "./pages/Search";

export default function Router() {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/table" element={<TablePage />} />
				<Route path="/add-record" element={<AddRecord />} />
				<Route path="/search" element={<Search />} />
				<Route path="/update-record/:id" element={<UpdateRecord />} />
				<Route path="*" element={<div>Error 404</div>} />
			</Routes>
		</HashRouter>
	);
}
