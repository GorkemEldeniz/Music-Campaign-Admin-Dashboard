"use client";

import { ContentCard } from "@/components/shared/ContentCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CampaignPagination from "./CampaignPagination";
import { CampaignTable } from "./CampaignTable";

export default function CampaignTableWrapper() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	// Get current pagination state
	const currentPage = Number(searchParams.get("page") || "1");
	const currentLimit = searchParams.get("limit") || "10";

	const { data: totalItems } = trpc.campaign.getTotalItems.useQuery();
	const totalPages = Math.ceil((totalItems as number) / Number(currentLimit));

	// Handle page navigation
	const navigateToPage = (page: number) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", page.toString());
		router.push(`${pathname}?${params.toString()}`);
	};

	return (
		<div className='space-y-8'>
			<PageHeader
				title='Campaigns'
				description='Manage and track your marketing campaigns'
				actions={
					<Button
						asChild
						size='sm'
						className='gap-1.5 font-medium shadow-sm transition-all hover:shadow'
					>
						<Link href='/campaign/create'>
							<Plus className='h-4 w-4' />
							New Campaign
						</Link>
					</Button>
				}
			/>

			<ContentCard className='border-muted/60 space-y-6'>
				{/* Table */}
				<CampaignTable />

				{/* Pagination */}
				<CampaignPagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={navigateToPage}
				/>
			</ContentCard>
		</div>
	);
}
