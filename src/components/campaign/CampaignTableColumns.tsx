"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import {
	ArrowUpDown,
	BadgeDollarSign,
	Building2,
	Calendar,
	Hash,
	Image,
} from "lucide-react";
import CampaignTableActions from "./CampaignTableActions";

export const columns = [
	{
		accessorKey: "id",
		header: ({ column }) => (
			<div className='flex items-center space-x-1'>
				<Hash className='h-4 w-4 text-muted-foreground' />
				<span>ID</span>
			</div>
		),
		cell: ({ row }) => (
			<div className='text-xs font-medium'>{row.getValue("id")}</div>
		),
	},
	{
		accessorKey: "imageUrl",
		header: ({ column }) => (
			<div className='flex items-center space-x-1'>
				<Image className='h-4 w-4 text-muted-foreground' />
				<span>Image</span>
			</div>
		),
		cell: ({ row }) => {
			const imageUrl = row.getValue("imageUrl");
			return imageUrl ? (
				<Avatar className='h-10 w-10 rounded-md border'>
					<img
						src={imageUrl as string}
						alt={row.getValue("title")}
						className='object-cover aspect-square'
					/>
				</Avatar>
			) : (
				<div className='h-10 w-10 rounded-md bg-muted flex items-center justify-center'>
					<Image className='h-4 w-4 text-muted-foreground' />
				</div>
			);
		},
	},
	{
		accessorKey: "title",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className='pl-0 flex items-center space-x-1'
				>
					<span>Title</span>
					<ArrowUpDown className='ml-1 h-3.5 w-3.5' />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className='font-medium max-w-[180px] truncate'>
				{row.getValue("title")}
			</div>
		),
	},
	{
		accessorKey: "brand",
		header: ({ column }) => (
			<div className='flex items-center space-x-1'>
				<Building2 className='h-4 w-4 text-muted-foreground' />
				<span>Brand</span>
			</div>
		),
		cell: ({ row }) => (
			<div className='font-medium'>{row.getValue("brand")}</div>
		),
	},
	{
		accessorKey: "startDate",
		header: ({ column }) => (
			<div className='flex items-center space-x-1'>
				<Calendar className='h-4 w-4 text-muted-foreground' />
				<span>Start Date</span>
			</div>
		),
		cell: ({ row }) => (
			<div className='text-sm'>{formatDate(row.getValue("startDate"))}</div>
		),
	},
	{
		accessorKey: "endDate",
		header: "End Date",
		cell: ({ row }) => <div>{formatDate(row.getValue("endDate"))}</div>,
	},
	{
		accessorKey: "budget",
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className='pl-0 flex items-center space-x-1'
				>
					<BadgeDollarSign className='h-4 w-4 text-muted-foreground' />
					<span>Budget</span>
					<ArrowUpDown className='ml-1 h-3.5 w-3.5' />
				</Button>
			);
		},
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("budget"));
			return <div className='font-medium'>${amount.toLocaleString()}</div>;
		},
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => {
			const campaign = row.original;
			return <CampaignTableActions campaign={campaign} />;
		},
	},
];
