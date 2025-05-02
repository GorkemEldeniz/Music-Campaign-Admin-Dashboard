import { campaigns as campaignsTable } from "@/db/schema";
import {
	campaignServerSchema,
	campaignUpdateServerSchema,
} from "@/lib/zod/campaign-schema";
import { TRPCError } from "@trpc/server";
import { and, count, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { authedProcedure, router } from "../trpc";

const LIMIT = 10;

export const campaignRouter = router({
	getById: authedProcedure
		.input(z.object({ id: z.number() }))
		.query(async ({ input, ctx }) => {
			const { db } = ctx;
			const campaign = await db
				.select()
				.from(campaignsTable)
				.where(eq(campaignsTable.id, input.id));

			if (!campaign) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Campaign not found",
				});
			}

			return campaign[0];
		}),
	getTotalItems: authedProcedure.query(async ({ ctx }) => {
		const { db } = ctx;
		const totalItems = await db.select({ count: count() }).from(campaignsTable);
		return totalItems[0].count;
	}),
	listCampaignsById: authedProcedure
		.input(z.object({ page: z.number() }))
		.query(async ({ input, ctx }) => {
			const { db, user } = ctx;

			const campaigns = await db
				.select()
				.from(campaignsTable)
				.where(eq(campaignsTable.userId, user.id))
				.limit(LIMIT)
				.orderBy(desc(campaignsTable.createdAt))
				.offset(input.page * LIMIT);

			if (!campaigns) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Campaigns not found",
				});
			}

			return {
				success: true,
				campaigns,
			};
		}),
	createCampaign: authedProcedure
		.input(campaignServerSchema)
		.mutation(async ({ input, ctx }) => {
			const { db, user } = ctx;

			await db.insert(campaignsTable).values({
				brand: input.brand,
				title: input.title,
				description: input.description,
				budget: input.budget.toString(),
				startDate: input.startDate.toISOString(),
				endDate: input.endDate.toISOString(),
				imageUrl: input.image,
				userId: user.id,
			});
		}),
	deleteCampaignById: authedProcedure
		.input(z.object({ id: z.number() }))
		.mutation(async ({ input, ctx }) => {
			const { db, user } = ctx;
			await db
				.delete(campaignsTable)
				.where(
					and(
						eq(campaignsTable.id, input.id),
						eq(campaignsTable.userId, user.id)
					)
				);
		}),
	updateCampaignById: authedProcedure
		.input(campaignUpdateServerSchema)
		.mutation(async ({ input, ctx }) => {
			const { db, user } = ctx;
			await db
				.update(campaignsTable)
				.set({
					brand: input.brand,
					title: input.title,
					description: input.description,
					budget: input.budget.toString(),
					startDate: input.startDate.toISOString(),
					endDate: input.endDate.toISOString(),
					imageUrl: input.image,
					userId: user.id,
				})
				.where(
					and(
						eq(campaignsTable.id, input.id),
						eq(campaignsTable.userId, user.id)
					)
				);
		}),
});
