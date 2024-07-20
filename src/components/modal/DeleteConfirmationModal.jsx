import React, {useState} from "react";
import Modal from "react-modal";
import Button from "../button/button";

Modal.setAppElement("#root"); // Uygulamanızın kök elementini ayarlayın

function DeleteConfirmationModal({isOpen, onRequestClose, onConfirm}) {
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
			contentLabel="Onay Diyalogu"
			style={customStyles}
		>
			<h2>Bu kaydı silmek istediğinize emin misiniz?</h2>
			<div
				style={{
					display: "flex",
					justifyContent: "space-around",
					marginTop: "20px",
				}}
			>
				<Button onClick={onConfirm}>Evet</Button>
				<Button onClick={onRequestClose}>Hayır</Button>
			</div>
		</Modal>
	);
}

export default DeleteConfirmationModal;
