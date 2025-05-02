import { Github, Heart, Music2 } from "lucide-react";
import Link from "next/link";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='w-full border-t bg-background/95 py-6'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
					{/* Logo and brand */}
					<div className='flex items-center gap-2'>
						<div className='flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary'>
							<Music2 className='h-4 w-4' />
						</div>
						<span className='text-sm font-medium'>Music Campaign</span>
					</div>

					{/* Copyright text */}
					<div className='text-xs text-muted-foreground'>
						© {currentYear} Music Campaign. All rights reserved.
					</div>

					{/* Social and credit */}
					<div className='flex items-center gap-4'>
						<Link
							href='https://github.com'
							target='_blank'
							rel='noreferrer'
							className='rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground'
							aria-label='GitHub'
						>
							<Github className='h-4 w-4' />
						</Link>

						<span className='text-xs text-muted-foreground'>
							Made with{" "}
							<Heart
								className='mx-0.5 inline h-3 w-3 text-red-500'
								fill='currentColor'
							/>{" "}
							by Your Name
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
