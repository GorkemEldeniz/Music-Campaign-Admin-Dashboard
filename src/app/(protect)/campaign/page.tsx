import CampaignTableWrapper from "@/components/campaign/CampaignTableWrapper";
import { Suspense } from "react";

export default function CampaignPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<CampaignTableWrapper />
		</Suspense>
	);
}
