"use client";

import { trpc } from "@/lib/trpc";

export default function TestPage() {
	const helloQuery = trpc.example.hello.useQuery({ name: "Developer" });

	return (
		<div>
			<h1>tRPC + Next.js 15 App Router</h1>
			<p>{helloQuery.data?.message}</p>
		</div>
	);
}
