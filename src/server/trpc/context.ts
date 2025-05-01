import { createClient } from "@/lib/supabase/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export const createContext = async (opts: FetchCreateContextFnOptions) => {
	const supabase = await createClient();

	const req = opts.req;

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return {
		user,
		req,
	};
};
