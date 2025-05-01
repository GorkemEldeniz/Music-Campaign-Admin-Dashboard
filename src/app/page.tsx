"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Home() {
	const supabase = createClient();
	const router = useRouter();

	async function signOut() {
		try {
			await supabase.auth.signOut();
			router.push("/sign-in");
		} catch (error) {
			console.error(error);
		} finally {
			router.refresh();
		}
	}

	return (
		<div>
			<h1>Hello World</h1>
			<Button onClick={signOut}>Sign Out</Button>
		</div>
	);
}
