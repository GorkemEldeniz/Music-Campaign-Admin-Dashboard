/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

export default function Dropzone({ form }: { form: UseFormReturn<any> }) {
	const [isDragging, setIsDragging] = useState(false);
	const [previewUrl, setPreviewUrl] = useState<string | null>(() => {
		// Initialize preview URL from form if image is a string
		const formImage = form.getValues("image");
		if (typeof formImage === "string") {
			return formImage;
		}
		return null;
	});

	// if form.image is a string, set the previewUrl to the string
	useEffect(() => {
		console.log(form.getValues("image"));
		if (typeof form.getValues("image") === "string") {
			setPreviewUrl(form.getValues("image"));
		}
	}, [form]);

	// Clean up preview URL when component unmounts
	useEffect(() => {
		return () => {
			// Only revoke ObjectURLs (not remote URLs)
			if (previewUrl && previewUrl.startsWith("blob:")) {
				URL.revokeObjectURL(previewUrl);
			}
		};
	}, [previewUrl]);

	const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(true);
	}, []);

	const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
	}, []);

	const onDrop = useCallback(
		(e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			setIsDragging(false);

			const file = e.dataTransfer.files?.[0];
			if (
				file &&
				(file.type === "image/jpeg" ||
					file.type === "image/png" ||
					file.type === "image/jpg" ||
					file.type === "image/webp")
			) {
				handleFileSelect(file);
			} else {
				// Show error that only image files are accepted
				form.setError("image", {
					type: "manual",
					message: "Please upload a valid image file (PNG, JPG, JPEG, WEBP)",
				});
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[form]
	);

	const handleFileSelect = (file: File) => {
		// Ensure file is a valid File object
		if (!(file instanceof File)) {
			console.error("Selected item is not a File object");
			return;
		}

		// Set the file directly without modifications
		form.setValue("image", file);
		form.clearErrors("image");

		// Create preview URL
		const url = URL.createObjectURL(file);
		setPreviewUrl(url);
	};

	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			handleFileSelect(file);
		}
	};

	const removeImage = (e?: React.MouseEvent) => {
		if (e) {
			e.stopPropagation();
		}

		form.setValue("image", undefined as any);
		form.clearErrors("image");

		// Only revoke ObjectURLs (not remote URLs)
		if (previewUrl && previewUrl.startsWith("blob:")) {
			URL.revokeObjectURL(previewUrl);
		}
		setPreviewUrl(null);
	};

	return (
		<div
			className={cn(
				"border-2 border-dashed rounded-lg p-6 transition-colors",
				isDragging ? "border-primary bg-primary/5" : "border-border",
				"hover:border-primary/50 cursor-pointer"
			)}
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
			onDrop={onDrop}
			onClick={() => {
				const fileInput = document.getElementById("file-input");
				if (fileInput) fileInput.click();
			}}
		>
			<input
				id='file-input'
				type='file'
				className='hidden'
				accept='image/png,image/jpeg,image/jpg,image/webp'
				onChange={handleFileInputChange}
			/>

			<div className='flex flex-col items-center justify-center space-y-4'>
				{previewUrl ? (
					<div className='relative w-full aspect-video max-h-[240px] overflow-hidden rounded-md'>
						<Image
							src={previewUrl}
							alt='Preview'
							fill
							className='object-cover'
						/>
						<button
							type='button'
							onClick={(e) => removeImage(e)}
							className='absolute top-2 right-2 bg-background/80 hover:bg-background rounded-full p-1.5 backdrop-blur-sm'
						>
							<X className='h-4 w-4' />
							<span className='sr-only'>Remove image</span>
						</button>
					</div>
				) : (
					<>
						<div className='bg-muted/50 rounded-full p-3'>
							<UploadCloud className='h-6 w-6 text-muted-foreground' />
						</div>
						<div className='text-center space-y-1'>
							<p className='text-sm font-medium'>
								Drag and drop or click to upload
							</p>
							<p className='text-xs text-muted-foreground'>
								PNG, JPG or JPEG, WEBP (max 5MB)
							</p>
						</div>
					</>
				)}
			</div>

			{form.formState.errors.image && (
				<p className='text-destructive text-xs mt-2'>
					{String(form.formState.errors.image.message || "Invalid image")}
				</p>
			)}
		</div>
	);
}
