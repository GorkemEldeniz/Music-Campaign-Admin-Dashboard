"use client";

import { cn } from "@/lib/utils";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
	label: string;
	href: string;
	isActive?: boolean;
}

/**
 * Generates breadcrumbs from current pathname
 */
function useBreadcrumbs(): BreadcrumbItem[] {
	const pathname = usePathname();
	if (!pathname) return [];

	const segments = pathname.split("/").filter(Boolean);
	let currentPath = "";

	// Home is always first
	const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

	// Generate nested paths
	segments.forEach((segment, index) => {
		currentPath += `/${segment}`;
		const isLast = index === segments.length - 1;

		// Format the label (capitalize and replace hyphens with spaces)
		const label = segment
			.replace(/-/g, " ")
			.replace(/\b\w/g, (c) => c.toUpperCase());

		breadcrumbs.push({
			label,
			href: currentPath,
			isActive: isLast,
		});
	});

	return breadcrumbs;
}

interface PageHeaderProps {
	title?: string;
	description?: string;
	children?: React.ReactNode;
	actions?: React.ReactNode;
	className?: string;
}

export function PageHeader({
	title,
	description,
	children,
	actions,
	className,
}: PageHeaderProps) {
	const breadcrumbs = useBreadcrumbs();

	return (
		<div className={cn("mb-8 space-y-4", className)}>
			{/* Breadcrumbs */}
			{breadcrumbs.length > 0 && (
				<nav
					aria-label='Breadcrumbs'
					className='flex flex-wrap items-center text-sm text-muted-foreground'
				>
					<ol className='flex flex-wrap items-center gap-1.5'>
						{breadcrumbs.map((crumb, i) => (
							<li key={i} className='flex items-center'>
								{i > 0 && <ChevronRight className='mx-1 h-3.5 w-3.5' />}

								{crumb.isActive ? (
									<span className='font-medium text-foreground truncate'>
										{crumb.label}
									</span>
								) : (
									<Link
										href={crumb.href}
										className='transition-colors hover:text-foreground flex items-center'
									>
										{i === 0 ? (
											<span className='flex items-center'>
												<Home className='mr-1 h-3.5 w-3.5' />
												<span className='sr-only sm:not-sr-only'>
													{crumb.label}
												</span>
											</span>
										) : (
											<span className='truncate max-w-[10rem]'>
												{crumb.label}
											</span>
										)}
									</Link>
								)}
							</li>
						))}
					</ol>
				</nav>
			)}

			{/* Header with title and actions */}
			<div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
				<div className='space-y-1'>
					{title && (
						<h1 className='text-2xl font-semibold tracking-tight'>{title}</h1>
					)}
					{description && (
						<p className='text-sm text-muted-foreground'>{description}</p>
					)}
					{children}
				</div>

				{actions && (
					<div className='flex flex-shrink-0 items-center gap-2'>{actions}</div>
				)}
			</div>
		</div>
	);
}
