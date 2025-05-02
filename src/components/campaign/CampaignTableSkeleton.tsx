"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export default function CampaignTableSkeleton() {
	return (
		<div className='rounded-md border overflow-hidden bg-card animate-in fade-in-50'>
			<Table>
				<TableHeader className='bg-muted/30'>
					<TableRow>
						<TableHead className='w-[100px]'>
							<div className='flex items-center gap-2'>
								<Skeleton className='h-4 w-4 rounded-full' />
								<Skeleton className='h-4 w-12' />
							</div>
						</TableHead>
						<TableHead>
							<div className='flex items-center gap-2'>
								<Skeleton className='h-4 w-4 rounded-full' />
								<Skeleton className='h-4 w-12' />
							</div>
						</TableHead>
						<TableHead className='hidden md:table-cell'>
							<div className='flex items-center gap-2'>
								<Skeleton className='h-4 w-4 rounded-full' />
								<Skeleton className='h-4 w-12' />
							</div>
						</TableHead>
						<TableHead>
							<div className='flex items-center gap-2'>
								<Skeleton className='h-4 w-4 rounded-full' />
								<Skeleton className='h-4 w-12' />
							</div>
						</TableHead>
						<TableHead className='text-right'>
							<div className='flex justify-end'>
								<Skeleton className='h-4 w-20 ml-auto' />
							</div>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{Array.from({ length: 10 }).map((_, i) => (
						<TableRow key={i}>
							<TableCell>
								<Skeleton className='h-16 w-16 rounded-md' />
							</TableCell>
							<TableCell>
								<div className='space-y-2'>
									<Skeleton className='h-4 w-[180px]' />
									<Skeleton className='h-4 w-16' />
								</div>
							</TableCell>
							<TableCell className='hidden md:table-cell'>
								<Skeleton className='h-4 w-[140px]' />
							</TableCell>
							<TableCell>
								<Skeleton className='h-4 w-16' />
							</TableCell>
							<TableCell>
								<div className='flex items-center justify-end gap-1'>
									<Skeleton className='h-8 w-8 rounded-md' />
									<Skeleton className='h-8 w-8 rounded-md' />
									<Skeleton className='h-8 w-8 rounded-md' />
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
