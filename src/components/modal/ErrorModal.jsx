import React, { useState } from "react";
import Modal from "react-modal";
import Button from "../button/button";

Modal.setAppElement("#root"); // Uygulamanızın kök elementini ayarlayın

function ErrorModal({ isOpen, onRequestClose, message }) {
	const customStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
			border: "1px solid #ccc",
			background: "#fff",
			overflow: "auto",
			WebkitOverflowScrolling: "touch",
			borderRadius: "4px",
			outline: "none",
			padding: "20px",
		},
		overlay: {
			backgroundColor: "rgba(0, 0, 0, 0.75)",
		},
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel="Hata Mesajı"
			style={customStyles}
		>
			<h2>{message}</h2>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					marginTop: "20px",
				}}
			>
				<Button onClick={onRequestClose}>Tamam</Button>
			</div>
		</Modal>
	);
}

export default ErrorModal;
