import React, { createContext, useContext, useState } from "react";

// Add 'export' here so Header.jsx can find it
export const SectionContext = createContext();

export const SectionProvider = ({ children }) => {
	const [currentSectionId, setCurrentSectionId] = useState("SYSTEM_ROOT");

	const updateSection = (id) => {
		let displayName = id.replace("-", "_").toUpperCase();
		if (id === "product-showcase") displayName = "ARCHIVE_001";
		if (id === "faq-technical") displayName = "SYSTEM_FAQ";

		setCurrentSectionId(displayName);
	};

	return (
		<SectionContext.Provider value={{ currentSectionId, updateSection }}>
			{children}
		</SectionContext.Provider>
	);
};

export const useSection = () => useContext(SectionContext);
