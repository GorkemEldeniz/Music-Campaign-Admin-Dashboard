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
import { campaignSchema } from "@/lib/zod/campaign-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BadgeIcon, DollarSign, FileTextIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { DatePicker } from "../ui/date-picker";
import Dropzone from "../ui/dropzone";

type CampaignFormSchema = z.infer<typeof campaignSchema>;

export default function CampaignForm() {
	const form = useForm<CampaignFormSchema>({
		resolver: zodResolver(campaignSchema),
		defaultValues: {
			title: "",
			brand: "",
			budget: 0,
			description: "",
			startDate: undefined,
			endDate: undefined,
		},
		mode: "onChange",
	});

	const { mutate: createCampaign, isPending } =
		trpc.campaign.createCampaign.useMutation({
			onSuccess: () => {
				toast.success("Campaign created successfully");
				form.reset();
			},
			onError: (error) => {
				console.error(error || "Failed to create campaign");
				toast.error("Failed to create campaign");
			},
		});

	async function onSubmit(values: CampaignFormSchema) {
		// Upload image to supabase
		const imageName = `${Date.now()}-${values.image.name}`;
		const supabase = createClient();
		const { error } = await supabase.storage
			.from("campaign-banner") // Bucket adı
			.upload(imageName, values.image, {
				cacheControl: "3600",
				upsert: false,
				contentType: values.image.type,
			});

		if (error) {
			console.error(error || "Failed to upload image");
			toast.error("Failed to upload image");
			return;
		}

		// get public url
		const { data: url } = supabase.storage
			.from("campaign-banner")
			.getPublicUrl(imageName);

		if (!url) {
			console.error("Failed to get public url");
			toast.error("Failed to get public url");
			return;
		}

		createCampaign({ ...values, image: url.publicUrl });
	}

	return (
		<div className='space-y-6'>
			<div className='space-y-2'>
				<h1 className='text-3xl font-semibold tracking-tight'>
					Create a new campaign
				</h1>
				<p className='text-sm text-muted-foreground'>
					Fill in the details below to create a new music campaign
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
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='flex gap-4 pt-4'>
						<Button
							type='button'
							variant='outline'
							className='flex-1'
							disabled={isPending}
						>
							Cancel
						</Button>
						<Button type='submit' className='flex-1' disabled={isPending}>
							{isPending ? "Creating..." : "Create Campaign"}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
