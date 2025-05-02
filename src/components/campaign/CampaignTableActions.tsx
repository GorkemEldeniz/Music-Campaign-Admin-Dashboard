"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Campaign } from "@/types";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

interface CampaignTableActionsProps {
	campaign: Campaign;
}

export default function CampaignTableActions({
	campaign,
}: CampaignTableActionsProps) {
	// Placeholder functions for CRUD operations
	const handleView = () => {
		console.log("View campaign:", campaign.id);
	};

	const handleEdit = () => {
		console.log("Edit campaign:", campaign.id);
	};

	const handleDelete = () => {
		console.log("Delete campaign:", campaign.id);
	};

	// Desktop view with individual buttons
	const DesktopActions = (
		<div className='hidden md:flex items-center gap-1'>
			<TooltipProvider delayDuration={100}>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant='ghost'
							size='icon'
							className='h-8 w-8 transition-all opacity-70 hover:opacity-100 rounded-full'
							onClick={handleView}
						>
							<Eye className='h-4 w-4' />
							<span className='sr-only'>View</span>
						</Button>
					</TooltipTrigger>
					<TooltipContent side='bottom'>
						<p className='text-xs'>View Campaign</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<TooltipProvider delayDuration={100}>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant='ghost'
							size='icon'
							className='h-8 w-8 transition-all opacity-70 hover:opacity-100 rounded-full'
							onClick={handleEdit}
						>
							<Pencil className='h-4 w-4' />
							<span className='sr-only'>Edit</span>
						</Button>
					</TooltipTrigger>
					<TooltipContent side='bottom'>
						<p className='text-xs'>Edit Campaign</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<TooltipProvider delayDuration={100}>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant='ghost'
							size='icon'
							className='h-8 w-8 text-destructive/70 hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors'
							onClick={handleDelete}
						>
							<Trash2 className='h-4 w-4' />
							<span className='sr-only'>Delete</span>
						</Button>
					</TooltipTrigger>
					<TooltipContent side='bottom'>
						<p className='text-xs'>Delete Campaign</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);

	// Mobile view with dropdown
	const MobileActions = (
		<div className='md:hidden'>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' size='icon' className='h-8 w-8 rounded-full'>
						<MoreHorizontal className='h-4 w-4' />
						<span className='sr-only'>Open menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end' className='w-40'>
					<DropdownMenuLabel className='text-xs font-normal text-muted-foreground'>
						Campaign Actions
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={handleView}
						className='gap-2 cursor-pointer'
					>
						<Eye className='h-4 w-4' />
						<span>View</span>
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={handleEdit}
						className='gap-2 cursor-pointer'
					>
						<Pencil className='h-4 w-4' />
						<span>Edit</span>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={handleDelete}
						className='gap-2 text-destructive focus:text-destructive cursor-pointer'
					>
						<Trash2 className='h-4 w-4' />
						<span>Delete</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);

	return (
		<div className='flex items-center justify-end'>
			{DesktopActions}
			{MobileActions}
		</div>
	);
}
