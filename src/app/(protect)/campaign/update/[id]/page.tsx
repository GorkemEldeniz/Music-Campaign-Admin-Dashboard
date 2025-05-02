"use client";

import CampaignUpdateForm from "@/components/campaign/CampaignUpdateForm";
import { trpc } from "@/lib/trpc";
import type { Campaign } from "@/types";
import { useParams } from "next/navigation";

export default function UpdateCampaignPage() {
	const params = useParams();
	const { id } = params;

	const { data: campaign } = trpc.campaign.getById.useQuery(
		{ id: Number(id) },
		{ enabled: !!id }
	);

	if (!campaign) {
		return <div>Campaign not found</div>;
	}

	return (
		<div className='container mx-auto px-4 py-8'>
			<CampaignUpdateForm campaign={campaign as Campaign} />
		</div>
	);
}
