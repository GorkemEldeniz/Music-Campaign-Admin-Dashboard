export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex min-h-screen w-full bg-slate-50'>
			{/* Left side - Illustration/Branding */}
			<div className='hidden w-1/2 flex-col justify-between bg-primary p-10 text-white lg:flex'>
				<div>
					<h1 className='text-2xl font-bold'>Music Campaign Admin</h1>
					<p className='mt-2 text-sm opacity-80'>
						Manage your music campaigns with ease
					</p>
				</div>

				<div className='flex flex-col items-center justify-center py-8'>
					<div className='relative h-64 w-64'>
						{/* Replace with your actual logo or illustration */}
						<div className='absolute inset-0 flex items-center justify-center rounded-full bg-white/10 text-4xl font-bold'>
							MCA
						</div>
					</div>
					<h2 className='mt-8 text-center text-3xl font-bold'>
						Take control of your music campaigns
					</h2>
					<p className='mt-4 max-w-md text-center text-sm opacity-90'>
						Our dashboard provides you with powerful tools to manage, track, and
						optimize your music campaigns in one place.
					</p>
				</div>

				<div className='text-xs opacity-70'>
					© {new Date().getFullYear()} Music Campaign Admin. All rights
					reserved.
				</div>
			</div>

			{/* Right side - Auth Form */}
			<div className='flex w-full flex-col items-center justify-center p-6 lg:w-1/2'>
				<div className='w-full max-w-md space-y-8'>{children}</div>
			</div>
		</div>
	);
}
