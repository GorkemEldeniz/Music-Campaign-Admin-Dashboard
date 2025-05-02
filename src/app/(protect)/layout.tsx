import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { TrpcProvider } from "../provider";

export default function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<TrpcProvider>
			<div className='min-h-screen flex flex-col bg-background'>
				{/* Sticky header */}
				<Navbar />

				{/* Main content with refined spacing */}
				<main className='flex-1 w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8'>
					{children}
				</main>

				{/* Footer with proper spacing */}
				<Footer />
			</div>
			<Toaster />
		</TrpcProvider>
	);
}
