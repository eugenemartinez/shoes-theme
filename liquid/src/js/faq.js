export function initFAQ() {
	const faqItems = document.querySelectorAll(".faq-item");

	faqItems.forEach((item) => {
		const trigger = item.querySelector(".faq-trigger");

		trigger.addEventListener("click", () => {
			const isActive = item.classList.contains("active");

			// Close all other items (Optional: remove this if you want multiple open)
			faqItems.forEach((otherItem) => otherItem.classList.remove("active"));

			// Toggle current
			if (!isActive) {
				item.classList.add("active");
			}
		});
	});
}
