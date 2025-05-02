"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const contentCardVariants = cva(
	"rounded-lg border bg-card text-card-foreground shadow-sm",
	{
		variants: {
			variant: {
				default: "",
				outline: "border bg-transparent shadow-none",
				ghost: "border-none bg-transparent shadow-none",
			},
			size: {
				default: "p-6",
				sm: "p-4",
				lg: "p-8",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

interface ContentCardProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof contentCardVariants> {
	title?: string;
	description?: string;
	footer?: React.ReactNode;
	actions?: React.ReactNode;
}

export function ContentCard({
	className,
	title,
	description,
	footer,
	actions,
	variant,
	size,
	children,
	...props
}: ContentCardProps) {
	return (
		<div
			className={cn(contentCardVariants({ variant, size }), className)}
			{...props}
		>
			{(title || description || actions) && (
				<div className='mb-4 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between'>
					<div>
						{title && <h3 className='text-lg font-medium'>{title}</h3>}
						{description && (
							<p className='text-sm text-muted-foreground'>{description}</p>
						)}
					</div>

					{actions && (
						<div className='flex flex-shrink-0 items-center justify-end gap-2 pt-2 sm:pt-0'>
							{actions}
						</div>
					)}
				</div>
			)}

			<div>{children}</div>

			{footer && (
				<div className='mt-6 flex items-center justify-between gap-4 pt-4 border-t'>
					{footer}
				</div>
			)}
		</div>
	);
}
