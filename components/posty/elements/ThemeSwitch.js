'use client'
import { useEffect, useState } from "react"

export default function ThemeSwitch() {
	const [toggleTheme, setToggleTheme] = useState("light");

	useEffect(() => {
		// Access localStorage and set the initial theme when the component mounts
		const savedTheme = localStorage.getItem("toggleTheme") || "light";
		setToggleTheme(savedTheme);
		document.documentElement.setAttribute("data-theme", savedTheme);
	}, []);

	useEffect(() => {
		// Update localStorage and the document attribute whenever the theme changes
		localStorage.setItem("toggleTheme", toggleTheme);
		document.documentElement.setAttribute("data-theme", toggleTheme);
	}, [toggleTheme]);

	const handleToggleTheme = () => {
		setToggleTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
	};

	return (
		<>
			<div className="toggle-switch">
				<label>
					<input
						type="checkbox"
						checked={toggleTheme === "dark"}
						onChange={handleToggleTheme}
						className={toggleTheme === "dark" ? "active" : ""}
					/>
					<span className="slider" />
				</label>
			</div>
		</>
	);
}
