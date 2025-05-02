import { z } from "zod";

const MIME_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB

export const campaignSchema = z
	.object({
		brand: z.string().min(1),
		title: z.string().min(1),
		description: z.string().min(1),
		budget: z.number().min(1),
		startDate: z.date(),
		endDate: z.date(),
		image: z
			.instanceof(File)
			.refine((file) => file.size > 0, {
				message: "Image is required",
			})
			.refine((file) => MIME_TYPES.includes(file.type), {
				message: "Image must be a valid image",
			})
			.refine((file) => file.size <= MAX_FILE_SIZE, {
				message: "Image must be less than 5MB",
			}),
	})
	.superRefine((data, ctx) => {
		if (data.startDate > data.endDate) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Start date cannot be after end date",
			});
		}
	});

export const campaignServerSchema = z
	.object({
		brand: z.string().min(1),
		title: z.string().min(1),
		description: z.string().min(1),
		budget: z.number().min(1),
		startDate: z.date(),
		endDate: z.date(),
		image: z.string().url().min(1),
	})
	.superRefine((data, ctx) => {
		if (data.startDate > data.endDate) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Start date cannot be after end date",
			});
		}
	});

// Schema for campaign update form that accepts both string URLs and File objects
export const campaignUpdateFormSchema = z
	.object({
		brand: z.string().min(1),
		title: z.string().min(1),
		description: z.string().min(1),
		budget: z.number().min(1),
		startDate: z.date(),
		endDate: z.date(),
		image: z.union([
			// Accept existing image URLs
			z.string(),
			// Or new image uploads
			z
				.instanceof(File)
				.refine((file) => file.size > 0, {
					message: "Image is required",
				})
				.refine((file) => MIME_TYPES.includes(file.type), {
					message: "Image must be a valid image",
				})
				.refine((file) => file.size <= MAX_FILE_SIZE, {
					message: "Image must be less than 5MB",
				}),
		]),
	})
	.superRefine((data, ctx) => {
		if (data.startDate > data.endDate) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Start date cannot be after end date",
			});
		}
	});

export const campaignUpdateSchema = z.object({
	brand: z.string().min(1),
	title: z.string().min(1),
	description: z.string().min(1),
	budget: z.number().min(1),
	image: z.string().url().min(1),
	startDate: z.date(),
	endDate: z.date(),
});

export const campaignUpdateServerSchema = z.object({
	id: z.number().min(1),
	brand: z.string().min(1),
	title: z.string().min(1),
	description: z.string().min(1),
	budget: z.number().min(1),
	image: z.string().url().min(1),
	startDate: z.date(),
	endDate: z.date(),
	userId: z.string().min(1).optional(),
});
