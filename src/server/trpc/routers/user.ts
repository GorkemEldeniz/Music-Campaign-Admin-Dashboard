import { authedProcedure, router } from "../trpc";

export const userRouter = router({
	getCurrentUser: authedProcedure.query(async ({ ctx }) => {
		const { user } = ctx;
		return user;
	}),
});
