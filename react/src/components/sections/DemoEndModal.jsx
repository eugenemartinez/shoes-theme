const DemoEndModal = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className="flex fixed inset-0 justify-center items-center p-6 z-[200]">
			{/* 1. Backdrop (Handles Click Outside) */}
			<div
				className="absolute inset-0 bg-background/95 backdrop-blur-xl cursor-crosshair"
				onClick={onClose}
			/>

			{/* 2. Modal Container */}
			<div className="relative p-10 space-y-6 max-w-lg text-center border bg-background border-primary/30 shadow-[0_0_50px_-12px_rgba(var(--primary),0.2)]">
				{/* 3. Close Button (X) */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 font-mono tracking-widest uppercase transition-colors cursor-pointer text-foreground/50 text-[10px] hover:text-destructive"
				>
					[Close_X]
				</button>

				<div className="flex gap-2 justify-center">
					<span className="w-2 h-2 animate-ping bg-primary" />
					<p className="font-mono text-primary text-[10px] tracking-[0.3em]">
						DIAGNOSTIC_REPORT //
					</p>
				</div>

				<h2 className="text-2xl font-bold tracking-tighter uppercase">
					Demo_Environment_Complete
				</h2>

				<p className="font-mono leading-relaxed uppercase text-[10px] text-white/40">
					Transaction processing is disabled in ARCHIVE_MODE. To deploy this
					system, clone the repository or download the theme folder and zip to
					upload in shopify.
				</p>

				{/* 4. GitHub Link (Opens in New Tab) */}
				<a
					href="https://github.com/eugenemartinez/shoes-theme/tree/main/theme"
					target="_blank"
					rel="noopener noreferrer"
					className="block py-4 font-mono font-black uppercase transition-all bg-primary text-background text-[10px] hover:brightness-110 active:scale-[0.98]"
				>
					Get_Source_Code
				</a>
			</div>
		</div>
	);
};

export default DemoEndModal;
