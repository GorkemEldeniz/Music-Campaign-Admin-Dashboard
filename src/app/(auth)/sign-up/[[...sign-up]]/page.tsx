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
import { authSchema } from "@/lib/zod/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	AlertCircleIcon,
	CheckCircleIcon,
	LoaderIcon,
	LockIcon,
	MailIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type SignUpFormSchema = z.infer<typeof authSchema>;

export default function SignUpPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isSuccess, setIsSuccess] = useState(false);

	const form = useForm<SignUpFormSchema>({
		resolver: zodResolver(authSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: SignUpFormSchema) {
		setIsLoading(true);
		setErrorMessage(null);
		setIsSuccess(false);

		try {
			const supabase = createClient();
			const { data, error } = await supabase.auth.signUp({
				email: values.email,
				password: values.password,
			});

			if (error) {
				console.error(error);
				setErrorMessage(
					error.message || "Failed to sign up. Please try again."
				);
			}

			if (data) {
				console.log(data);
				setIsSuccess(true);
				form.reset();
			}
		} catch (error) {
			console.error(error);
			setErrorMessage("An unexpected error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className='space-y-6'>
			<div className='space-y-2 text-center'>
				<h1 className='text-3xl font-semibold tracking-tight'>
					Create an account
				</h1>
				<p className='text-sm text-slate-500'>
					Enter your details below to get started
				</p>
			</div>

			{errorMessage && (
				<div className='flex items-center gap-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive'>
					<AlertCircleIcon className='h-4 w-4' />
					<p>{errorMessage}</p>
				</div>
			)}

			{isSuccess && (
				<div className='flex items-center gap-2 rounded-md bg-green-50 p-3 text-sm text-green-600'>
					<CheckCircleIcon className='h-4 w-4' />
					<p>
						Your account has been created. Please check your email for
						verification.
					</p>
				</div>
			)}

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<div className='relative'>
										<MailIcon className='absolute left-3 top-2.5 h-5 w-5 text-slate-400' />
										<Input
											placeholder='you@example.com'
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
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<div className='relative'>
										<LockIcon className='absolute left-3 top-2.5 h-5 w-5 text-slate-400' />
										<Input
											type='password'
											placeholder='Create a secure password'
											className='pl-10'
											{...field}
										/>
									</div>
								</FormControl>
								<p className='text-xs text-slate-500'>
									Must be at least 8 characters
								</p>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type='submit' className='w-full' disabled={isLoading}>
						{isLoading ? (
							<>
								<LoaderIcon className='mr-2 h-4 w-4 animate-spin' />
								Creating account...
							</>
						) : (
							"Create account"
						)}
					</Button>
				</form>
			</Form>

			<div className='mt-6 text-center text-sm'>
				Already have an account?{" "}
				<Link
					href='/sign-in'
					className='font-medium text-primary hover:underline'
				>
					Sign in
				</Link>
			</div>
		</div>
	);
}
