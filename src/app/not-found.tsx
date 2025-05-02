"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className='flex flex-col items-center justify-center min-h-[70vh] px-4'>
			<div className='space-y-6 text-center'>
				<h1 className='text-6xl font-bold text-primary'>404</h1>
				<h2 className='text-3xl font-semibold tracking-tight'>
					Page not found
				</h2>
				<p className='text-muted-foreground max-w-md mx-auto'>
					Sorry, the page you are looking for doesn&apos;t exist or has been
					moved.
				</p>
				<div className='flex justify-center pt-4'>
					<Button asChild>
						<Link href='/'>Return to home</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
