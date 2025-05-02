"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Controller, UseFormReturn } from "react-hook-form";

interface DatePickerProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	form: UseFormReturn<any>;
	type: "startDate" | "endDate";
}

export function DatePicker({ form, type }: DatePickerProps) {
	const labels = {
		startDate: "Start Date",
		endDate: "End Date",
	};

	return (
		<div className='space-y-2'>
			<div className='text-sm font-medium'>{labels[type]}</div>
			<Controller
				control={form.control}
				name={type}
				render={({ field }) => (
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={"outline"}
								className={cn(
									"w-full justify-start text-left font-normal",
									!field.value && "text-muted-foreground"
								)}
							>
								<CalendarIcon className='mr-2 h-4 w-4 text-muted-foreground' />
								{field.value ? (
									format(new Date(field.value), "PPP")
								) : (
									<span>Select {labels[type].toLowerCase()}</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className='w-auto p-0' align='start'>
							<Calendar
								mode='single'
								selected={field.value ? new Date(field.value) : undefined}
								onSelect={field.onChange}
								disabled={(date) => {
									// For end date, disable dates before start date
									if (type === "endDate") {
										const startDate = form.getValues("startDate");
										if (startDate) {
											return date < new Date(startDate);
										}
									}
									// For start date, disable dates after end date
									if (type === "startDate") {
										const endDate = form.getValues("endDate");
										if (endDate) {
											return date > new Date(endDate);
										}
									}
									return false;
								}}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
				)}
			/>
		</div>
	);
}
