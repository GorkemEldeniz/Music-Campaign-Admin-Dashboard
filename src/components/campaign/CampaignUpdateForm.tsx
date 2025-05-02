"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { trpc } from "@/lib/trpc";
import { campaignUpdateFormSchema } from "@/lib/zod/campaign-schema";
import type { Campaign } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { BadgeIcon, DollarSign, FileTextIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { DatePicker } from "../ui/date-picker";
import Dropzone from "../ui/dropzone";

type CampaignFormSchema = z.infer<typeof campaignUpdateFormSchema>;

interface CampaignUpdateFormProps {
	campaign: Campaign;
}

export default function CampaignUpdateForm({
	campaign,
}: CampaignUpdateFormProps) {
	const router = useRouter();
	const [isFormDirty, setIsFormDirty] = useState(false);
	const [originalValues, setOriginalValues] = useState<CampaignFormSchema>();

	const { mutate: updateCampaign, isPending } =
		trpc.campaign.updateCampaignById.useMutation({
			onSuccess: () => {
				toast.success("Campaign updated successfully");
				router.push("/campaign");
				router.refresh();
			},
			onError: (error) => {
				console.error(error || "Failed to update campaign");
				toast.error("Failed to update campaign");
			},
		});

	const form = useForm<CampaignFormSchema>({
		resolver: zodResolver(campaignUpdateFormSchema),
		defaultValues: {
			title: campaign.title,
			brand: campaign.brand,
			budget: Number(campaign.budget),
			description: campaign.description || "",
			startDate: new Date(campaign.startDate),
			endDate: new Date(campaign.endDate),
			image: campaign.imageUrl || "",
		},
		mode: "onChange",
	});

	// Store original values for comparison
	useEffect(() => {
		setOriginalValues(form.getValues());
	}, [form]);

	// Check if form has changed
	useEffect(() => {
		const subscription = form.watch((value) => {
			if (!originalValues) return;

			// Check if any field is different from original
			const isDirty = Object.keys(value).some((key) => {
				const fieldKey = key as keyof CampaignFormSchema;
				const originalValue = originalValues[fieldKey];
				const currentValue = value[fieldKey];

				if (fieldKey === "image") {
					// Handle File objects
					if (typeof currentValue === "object" && currentValue !== null)
						return true;
					if (
						typeof currentValue === "string" &&
						typeof originalValue === "string"
					) {
						return currentValue !== originalValue;
					}
					return false;
				}

				return JSON.stringify(originalValue) !== JSON.stringify(currentValue);
			});

			setIsFormDirty(isDirty);
		});

		return () => subscription.unsubscribe();
	}, [form, originalValues]);

	async function onSubmit(values: CampaignFormSchema) {
		if (!isFormDirty) {
			toast.info("No changes to update");
			return;
		}

		try {
			// Handle image upload if it's a File
			if (typeof values.image === "object" && values.image !== null) {
				const file = values.image as File;
				const imageName = `update-${Date.now()}-${file.name}`;
				const supabase = createClient();
				const { error } = await supabase.storage
					.from("campaign-banner")
					.upload(imageName, file, {
						cacheControl: "3600",
						upsert: false,
					});

				if (error) {
					toast.error("Failed to upload image");
					return;
				}

				// Get public URL
				const { data: urlData } = supabase.storage
					.from("campaign-banner")
					.getPublicUrl(imageName);

				if (!urlData) {
					toast.error("Failed to get image URL");
					return;
				}

				// Update with new image URL - userId will be set by the server
				updateCampaign({
					id: campaign.id,
					brand: values.brand,
					title: values.title,
					description: values.description,
					budget: values.budget,
					startDate: values.startDate,
					endDate: values.endDate,
					image: urlData.publicUrl,
				});
			} else {
				// Use existing image URL (which should be a string at this point)
				updateCampaign({
					id: campaign.id,
					brand: values.brand,
					title: values.title,
					description: values.description,
					budget: values.budget,
					startDate: values.startDate,
					endDate: values.endDate,
					image: values.image as string,
				});
			}
		} catch (error) {
			console.error("Error updating campaign:", error);
			toast.error("Failed to update campaign");
		}
	}

	return (
		<div className='space-y-6'>
			<div className='space-y-2'>
				<h1 className='text-3xl font-semibold tracking-tight'>
					Update Campaign
				</h1>
				<p className='text-sm text-muted-foreground'>
					Make changes to your campaign details below
				</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<div className='grid gap-6 md:grid-cols-2'>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Campaign Title</FormLabel>
									<FormControl>
										<div className='relative'>
											<FileTextIcon className='absolute left-3 top-2.5 h-5 w-5 text-muted-foreground' />
											<Input
												placeholder='Summer Music Festival'
												className='pl-10'
												{...field}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='brand'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Brand</FormLabel>
									<FormControl>
										<div className='relative'>
											<BadgeIcon className='absolute left-3 top-2.5 h-5 w-5 text-muted-foreground' />
											<Input
												placeholder='ACME Music'
												className='pl-10'
												{...field}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Input
										placeholder='Describe your campaign in detail...'
										className='min-h-24'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='budget'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Budget</FormLabel>
								<FormControl>
									<div className='relative'>
										<DollarSign className='absolute left-3 top-2.5 h-5 w-5 text-muted-foreground' />
										<Input
											placeholder='1000'
											className='pl-10'
											{...field}
											onChange={(e) => {
												const value = e.target.value;
												const numericValue = value.replace(/[^0-9]/g, "");
												field.onChange(Number(numericValue));
											}}
										/>
									</div>
								</FormControl>
								<p className='text-xs text-muted-foreground'>
									Campaign budget in USD
								</p>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
						<DatePicker form={form} type='startDate' />
						<DatePicker form={form} type='endDate' />
					</div>

					<FormField
						control={form.control}
						name='image'
						render={() => (
							<FormItem>
								<FormLabel>Campaign Image</FormLabel>
								<FormControl>
									<Dropzone form={form} />
								</FormControl>
								<p className='text-xs text-muted-foreground mt-1'>
									Current image will be used unless you upload a new one
								</p>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='flex gap-4 pt-4'>
						<Button
							type='button'
							variant='outline'
							className='flex-1'
							onClick={() => router.back()}
						>
							Cancel
						</Button>
						<Button
							type='submit'
							className='flex-1'
							disabled={isPending || !isFormDirty}
						>
							{isPending ? "Updating..." : "Update Campaign"}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
