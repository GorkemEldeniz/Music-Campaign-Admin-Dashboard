import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { createContext } from "./context";

const t = initTRPC.context<typeof createContext>().create({
	transformer: superjson,
});

export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;

// Auth middleware - moved here to avoid circular dependency
export const isAuthed = middleware(async ({ ctx, next }) => {
	if (!ctx.user) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	}

	return next({
		ctx: {
			user: ctx.user,
		},
	});
});

export const authedProcedure = t.procedure.use(isAuthed);
