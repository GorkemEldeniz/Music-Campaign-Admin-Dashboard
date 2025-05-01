import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const exampleRouter = router({
	hello: publicProcedure
		.input(z.object({ name: z.string().optional() }))
		.query(({ input, ctx }) => {
			const { user } = ctx;

			if (!user) {
				throw new Error("Unauthorized");
			}

			return {
				message: `Merhaba ${input.name ?? "Dünya"}!`,
			};
		}),
});
