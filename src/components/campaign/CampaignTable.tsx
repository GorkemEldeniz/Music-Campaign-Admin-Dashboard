"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { trpc } from "@/lib/trpc";
import { api } from "@/server/trpc/api";
import {
	Calendar,
	DollarSign,
	Edit,
	Image as ImageIcon,
	Loader2,
	Tag,
	Trash,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import CampaignTableSkeleton from "./CampaignTableSkeleton";

export function CampaignTable() {
	const searchParams = useSearchParams();
	const page = searchParams.get("page") || "1";

	const [deletedId, setDeletedId] = useState<number | null>(null);

	const utils = api.useUtils();

	const { data, isLoading } = trpc.campaign.listCampaignsById.useQuery({
		page: parseInt(page) - 1,
	});

	const { mutate: deleteCampaignById, isPending } =
		trpc.campaign.deleteCampaignById.useMutation({
			onSuccess: () => {
				utils.campaign.listCampaignsById.invalidate();
				toast.success("Campaign deleted successfully");
			},
			onError: () => {
				toast.error("Failed to delete campaign");
			},
		});

	// Format currency
	const formatCurrency = (amount: string) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(parseFloat(amount));
	};

	// Format date range
	const formatDateRange = (startDate: string, endDate: string) => {
		try {
			const start = new Date(startDate).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric",
			});
			const end = new Date(endDate).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric",
			});
			return `${start} - ${end}`;
		} catch (e) {
			console.error(e);
			return `${startDate} - ${endDate}`;
		}
	};

	if (isLoading) {
		return <CampaignTableSkeleton />;
	}

	const handleDelete = (id: number) => {
		setDeletedId(id);
		deleteCampaignById({ id });
	};

	return (
		<div className='rounded-md border overflow-hidden bg-card'>
			<Table>
				<TableHeader className='bg-muted/30'>
					<TableRow className='hover:bg-transparent border-b border-border/80'>
						<TableHead className='w-[100px] py-3.5'>
							<div className='flex items-center gap-2'>
								<ImageIcon className='h-4 w-4 text-muted-foreground' />
								<span>Image</span>
							</div>
						</TableHead>
						<TableHead className='py-3.5'>
							<div className='flex items-center gap-2'>
								<Tag className='h-4 w-4 text-muted-foreground' />
								<span>Title</span>
							</div>
						</TableHead>
						<TableHead className='py-3.5 hidden md:table-cell'>
							<div className='flex items-center gap-2'>
								<Calendar className='h-4 w-4 text-muted-foreground' />
								<span>Period</span>
							</div>
						</TableHead>
						<TableHead className='py-3.5'>
							<div className='flex items-center gap-2'>
								<DollarSign className='h-4 w-4 text-muted-foreground' />
								<span>Budget</span>
							</div>
						</TableHead>
						<TableHead className='text-right py-3.5'>
							<span className='sr-only'>Actions</span>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.campaigns && data.campaigns.length > 0 ? (
						data.campaigns.map((campaign) => (
							<TableRow
								key={campaign.id}
								className='group transition-colors hover:bg-muted/20'
							>
								<TableCell className='py-3'>
									<div className='relative h-16 w-16 rounded-md overflow-hidden border border-border'>
										{campaign.imageUrl ? (
											<Image
												src={campaign.imageUrl}
												alt={campaign.title}
												fill
												className='object-cover'
												sizes='64px'
											/>
										) : (
											<div className='h-full w-full flex items-center justify-center bg-muted'>
												<span className='text-xs text-muted-foreground'>
													No image
												</span>
											</div>
										)}
									</div>
								</TableCell>
								<TableCell className='font-medium'>
									<div className='space-y-1'>
										<div className='truncate max-w-[200px] md:max-w-none'>
											{campaign.title}
										</div>
										<Badge variant='outline' className='text-xs font-normal'>
											{campaign.brand}
										</Badge>
									</div>
								</TableCell>
								<TableCell className='hidden md:table-cell text-muted-foreground text-sm'>
									{formatDateRange(campaign.startDate, campaign.endDate)}
								</TableCell>
								<TableCell className='text-sm font-medium'>
									{formatCurrency(campaign.budget)}
								</TableCell>
								<TableCell className='text-right'>
									<div className='flex items-center justify-end gap-1 opacity-80 group-hover:opacity-100'>
										<TooltipProvider delayDuration={100}>
											<Tooltip>
												<TooltipTrigger asChild>
													<Link
														href={`/campaign/update/${campaign.id}`}
														passHref
													>
														<Button
															variant='ghost'
															size='icon'
															className='h-8 w-8 rounded-md hover:bg-muted/80'
														>
															<Edit className='h-4 w-4' />
															<span className='sr-only'>Edit</span>
														</Button>
													</Link>
												</TooltipTrigger>
												<TooltipContent
													side='top'
													align='center'
													className='text-xs'
												>
													Edit campaign
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>

										<TooltipProvider delayDuration={100}>
											<Tooltip>
												<TooltipTrigger asChild>
													<Button
														variant='ghost'
														size='icon'
														className='h-8 w-8 rounded-md text-destructive hover:bg-destructive/10 hover:text-destructive'
														onClick={() => handleDelete(campaign.id)}
													>
														{isPending && deletedId === campaign.id ? (
															<Loader2 className='h-4 w-4 animate-spin' />
														) : (
															<Trash className='h-4 w-4' />
														)}
														<span className='sr-only'>Delete</span>
													</Button>
												</TooltipTrigger>
												<TooltipContent
													side='top'
													align='center'
													className='text-xs'
												>
													Delete campaign
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={5} className='h-32 text-center'>
								<div className='flex flex-col items-center justify-center space-y-1 text-muted-foreground'>
									<p>No campaigns found</p>
									<p className='text-sm text-muted-foreground/60'>
										Create a new campaign to get started
									</p>
								</div>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
