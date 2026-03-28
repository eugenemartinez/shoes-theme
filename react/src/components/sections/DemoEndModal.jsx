const DemoEndModal = ({ isOpen }) => {
	if (!isOpen) return null;
	return (
		<div className="flex fixed inset-0 justify-center items-center z-[200] bg-background/95 backdrop-blur-xl">
			<div className="p-10 space-y-6 max-w-lg text-center border border-primary/30">
				<div className="flex gap-2 justify-center">
					<span className="w-2 h-2 animate-ping bg-primary" />
					<p className="font-mono text-primary text-[10px] tracking-[0.3em]">
						DIAGNOSTIC_REPORT //
					</p>
				</div>
				<h2 className="text-2xl font-bold tracking-tighter uppercase">
					Demo_Environment_Complete
				</h2>
				<p className="font-mono text-xs leading-relaxed uppercase text-white/40">
					Transaction processing is disabled in ARCHIVE_MODE. To deploy this
					system, clone the repository or download the theme folder and zip to
					upload in shopify.
				</p>
				<a
					href="https://github.com/eugenemartinez/shoes-theme/tree/main/theme"
					className="block py-4 font-mono font-black uppercase bg-primary text-background text-[10px]"
				>
					Get_Source_Code
				</a>
			</div>
		</div>
	);
};
