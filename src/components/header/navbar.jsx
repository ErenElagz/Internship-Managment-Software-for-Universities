import React from "react";
import "./navbar.css";
import {Link, useLocation} from "react-router-dom";

export default function Navbar() {
	const location = useLocation();
	return (
		<nav className="navbar">
			<ul className="navbar-links">
				<li>
					<Link
						to="/"
						className={location.pathname === "/" ? "active" : ""}
					>
						Dashboard
					</Link>
				</li>
				<li>
					<Link
						to="/add-record"
						className={
							location.pathname === "/add-record" ? "active" : ""
						}
					>
						Add Record
					</Link>
				</li>
				<li>
					<Link
						to="/search"
						className={
							location.pathname === "/search" ? "active" : ""
						}
					>
						Search
					</Link>
				</li>
				<li>
					<Link
						to="/table"
						className={
							location.pathname === "/table" ? "active" : ""
						}
					>
						Database
					</Link>
				</li>
			</ul>
		</nav>
	);
}
