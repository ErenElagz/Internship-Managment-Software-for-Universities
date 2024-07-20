import React from "react";
import Navbar from "./navbar";
import Button from "../button/button";
export default function Header() {
	return (
		<header className="flex justify-between items-center w-full	p-4 ">
			<a href="#/">
				<img
					src="https://www.hitit.edu.tr/images/HititLogoYeni.svg"
					alt="Logo"
					width="200"
					height="100"
				/>
			</a>
			<Navbar />
			<Button onClick={() => window.electron.backupDatabase()}>
				Backup Database
			</Button>
		</header>
	);
}
