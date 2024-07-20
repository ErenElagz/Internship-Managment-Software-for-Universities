import React from "react";
import "./button.css";

const Button = ({
	onClick,
	children,
	type = "button",
	className = "Login",
}) => {
	return (
		<button type={type} onClick={onClick} className={`button ${className}`}>
			{children}
		</button>
	);
};

export default Button;
