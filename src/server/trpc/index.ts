import { campaignRouter } from "./routers/campaign";
import { userRouter } from "./routers/user";
import { router } from "./trpc";

export const appRouter = router({
	campaign: campaignRouter,
	user: userRouter,
});

export type AppRouter = typeof appRouter;
