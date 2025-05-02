"use client";

import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
	ChevronFirst,
	ChevronLast,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";

interface CampaignPaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	isLoading?: boolean;
}

export default function CampaignPagination({
	currentPage,
	totalPages,
	onPageChange,
	isLoading = false,
}: CampaignPaginationProps) {
	// Create page items array
	const getPageItems = () => {
		const items: (number | "ellipsis")[] = [];

		// No pagination needed for small page counts
		if (totalPages <= 5) {
			// Show all pages
			for (let i = 1; i <= totalPages; i++) {
				items.push(i);
			}
			return items;
		}

		// Always show first page
		items.push(1);

		// If current page is near the beginning
		if (currentPage <= 3) {
			items.push(2, 3);
			items.push("ellipsis");
		} else {
			items.push("ellipsis");
			items.push(currentPage - 1);
		}

		// Current page (if not already included and not at end)
		if (currentPage > 3 && currentPage < totalPages - 1) {
			items.push(currentPage);
		}

		// If we're at any of the last 3 pages
		if (currentPage >= totalPages - 2) {
			// Ensure we include the last 3 pages
			const lastThreePages = [totalPages - 2, totalPages - 1, totalPages];
			// Filter out pages that are already included or less than 2
			lastThreePages
				.filter((page) => page > 1 && !items.includes(page))
				.forEach((page) => items.push(page));
		} else {
			// Not near the end, show next page and ellipsis
			if (currentPage < totalPages - 2) {
				items.push(currentPage + 1);
			}
			items.push("ellipsis");
			items.push(totalPages);
		}

		// Deduplicate (just in case)
		return [...new Set(items.filter((item) => item !== "ellipsis"))]
			.sort((a, b) => Number(a) - Number(b))
			.reduce((acc: (number | "ellipsis")[], curr, i, arr) => {
				// Add ellipsis between non-consecutive numbers
				if (
					i > 0 &&
					typeof curr === "number" &&
					typeof arr[i - 1] === "number" &&
					(curr as number) - (arr[i - 1] as number) > 1
				) {
					acc.push("ellipsis");
				}
				acc.push(curr);
				return acc;
			}, []);
	};

	// Display page numbers with ellipsis where appropriate
	const pageItems = getPageItems();

	// No need to render if only one page
	if (totalPages <= 1) return null;

	return (
		<div className='mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t pt-4 border-border/40'>
			{/* Page info */}
			<div className='order-2 sm:order-1 text-sm text-muted-foreground'>
				<p>
					Page{" "}
					<span className='font-medium text-foreground'>{currentPage}</span> of{" "}
					<span className='font-medium text-foreground'>{totalPages}</span>
				</p>
			</div>

			{/* Pagination controls */}
			<nav aria-label='Pagination' className='order-1 sm:order-2'>
				<ul className='flex items-center gap-1'>
					{/* First page button */}
					<TooltipProvider delayDuration={100}>
						<Tooltip>
							<TooltipTrigger asChild>
								<li>
									<Button
										variant='ghost'
										size='icon'
										className={cn(
											"h-8 w-8 rounded-md transition-colors",
											currentPage === 1 && "opacity-50 pointer-events-none"
										)}
										disabled={currentPage === 1 || isLoading}
										onClick={() => onPageChange(1)}
										aria-label='Go to first page'
									>
										<ChevronFirst className='h-4 w-4' />
									</Button>
								</li>
							</TooltipTrigger>
							<TooltipContent side='bottom' align='center' className='text-xs'>
								First page
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					{/* Previous page button */}
					<TooltipProvider delayDuration={100}>
						<Tooltip>
							<TooltipTrigger asChild>
								<li>
									<Button
										variant='ghost'
										size='icon'
										className={cn(
											"h-8 w-8 rounded-md transition-colors",
											currentPage === 1 && "opacity-50 pointer-events-none"
										)}
										disabled={currentPage === 1 || isLoading}
										onClick={() => onPageChange(currentPage - 1)}
										aria-label='Go to previous page'
									>
										<ChevronLeft className='h-4 w-4' />
									</Button>
								</li>
							</TooltipTrigger>
							<TooltipContent side='bottom' align='center' className='text-xs'>
								Previous page
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					{/* Page number buttons */}
					<div className='hidden sm:flex items-center'>
						{pageItems.map((item, index) =>
							item === "ellipsis" ? (
								<li key={`ellipsis-${index}`} className='mx-1'>
									<span className='text-muted-foreground text-sm'>
										&hellip;
									</span>
								</li>
							) : (
								<li key={item}>
									<Button
										variant={currentPage === item ? "default" : "outline"}
										size='sm'
										className={cn(
											"h-8 w-8 rounded-md font-medium text-sm",
											currentPage === item
												? "bg-primary text-primary-foreground hover:bg-primary/90"
												: "hover:bg-muted border-border/50",
											"transition-all duration-200"
										)}
										disabled={isLoading}
										onClick={() => onPageChange(item)}
										aria-label={`Go to page ${item}`}
										aria-current={currentPage === item ? "page" : undefined}
									>
										{item}
									</Button>
								</li>
							)
						)}
					</div>

					{/* Mobile indicator */}
					<div className='sm:hidden px-2'>
						<span className='text-sm font-medium'>{currentPage}</span>
					</div>

					{/* Next page button */}
					<TooltipProvider delayDuration={100}>
						<Tooltip>
							<TooltipTrigger asChild>
								<li>
									<Button
										variant='ghost'
										size='icon'
										className={cn(
											"h-8 w-8 rounded-md transition-colors",
											currentPage === totalPages &&
												"opacity-50 pointer-events-none"
										)}
										disabled={currentPage === totalPages || isLoading}
										onClick={() => onPageChange(currentPage + 1)}
										aria-label='Go to next page'
									>
										<ChevronRight className='h-4 w-4' />
									</Button>
								</li>
							</TooltipTrigger>
							<TooltipContent side='bottom' align='center' className='text-xs'>
								Next page
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					{/* Last page button */}
					<TooltipProvider delayDuration={100}>
						<Tooltip>
							<TooltipTrigger asChild>
								<li>
									<Button
										variant='ghost'
										size='icon'
										className={cn(
											"h-8 w-8 rounded-md transition-colors",
											currentPage === totalPages &&
												"opacity-50 pointer-events-none"
										)}
										disabled={currentPage === totalPages || isLoading}
										onClick={() => onPageChange(totalPages)}
										aria-label='Go to last page'
									>
										<ChevronLast className='h-4 w-4' />
									</Button>
								</li>
							</TooltipTrigger>
							<TooltipContent side='bottom' align='center' className='text-xs'>
								Last page
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</ul>
			</nav>
		</div>
	);
}
