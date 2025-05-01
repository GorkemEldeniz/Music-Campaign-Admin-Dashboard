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
import { AlertCircleIcon, LoaderIcon, LockIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type SignInFormSchema = z.infer<typeof authSchema>;

export default function SignInPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const router = useRouter();

	const form = useForm<SignInFormSchema>({
		resolver: zodResolver(authSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: SignInFormSchema) {
		setIsLoading(true);
		setErrorMessage(null);

		try {
			const supabase = createClient();
			const { data, error } = await supabase.auth.signInWithPassword({
				email: values.email,
				password: values.password,
			});

			if (error) {
				console.error(error);
				setErrorMessage(
					error.message || "Failed to sign in. Please check your credentials."
				);
			}

			if (data) {
				console.log(data);
				// Successful sign-in is handled by Supabase auth redirect
			}
		} catch (error) {
			console.error(error);
			setErrorMessage("An unexpected error occurred. Please try again.");
		} finally {
			setIsLoading(false);
			router.refresh();
		}
	}

	return (
		<div className='space-y-6'>
			<div className='space-y-2 text-center'>
				<h1 className='text-3xl font-semibold tracking-tight'>Welcome back</h1>
				<p className='text-sm text-slate-500'>
					Sign in to your account to continue
				</p>
			</div>

			{errorMessage && (
				<div className='flex items-center gap-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive'>
					<AlertCircleIcon className='h-4 w-4' />
					<p>{errorMessage}</p>
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
								<div className='flex items-center justify-between'>
									<FormLabel>Password</FormLabel>
									<Link
										href='/auth/forgot-password'
										className='text-xs text-primary hover:underline'
									>
										Forgot password?
									</Link>
								</div>
								<FormControl>
									<div className='relative'>
										<LockIcon className='absolute left-3 top-2.5 h-5 w-5 text-slate-400' />
										<Input
											type='password'
											placeholder='••••••••'
											className='pl-10'
											{...field}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type='submit' className='w-full' disabled={isLoading}>
						{isLoading ? (
							<>
								<LoaderIcon className='mr-2 h-4 w-4 animate-spin' />
								Signing in...
							</>
						) : (
							"Sign in"
						)}
					</Button>
				</form>
			</Form>

			<div className='mt-6 text-center text-sm'>
				Don&apos;t have an account?{" "}
				<Link
					href='/sign-up'
					className='font-medium text-primary hover:underline'
				>
					Sign up
				</Link>
			</div>
		</div>
	);
}
