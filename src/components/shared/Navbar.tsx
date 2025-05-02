"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import { trpc } from "@/lib/trpc";
import { LogOut, Moon, Music2, Settings, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
	const router = useRouter();
	const { setTheme } = useTheme();

	const { data: user } = trpc.user.getCurrentUser.useQuery();

	const handleLogout = async () => {
		try {
			const supabase = createClient();
			await supabase.auth.signOut();
		} catch (error) {
			console.error("Error logging out:", error);
		} finally {
			router.refresh();
		}
	};

	return (
		<header className='sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
				{/* Logo and brand */}
				<Link
					href='/'
					className='flex items-center gap-2 transition-colors hover:opacity-80'
				>
					<div className='flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground'>
						<Music2 className='h-5 w-5' />
					</div>
					<span className='hidden font-semibold sm:inline-block'>
						Music Campaign
					</span>
				</Link>

				{/* Right side actions */}
				<div className='flex items-center gap-3'>
					{/* Theme Toggle */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='ghost'
								size='icon'
								className='h-8 w-8 rounded-md'
							>
								<Sun className='h-[1.15rem] w-[1.15rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
								<Moon className='absolute h-[1.15rem] w-[1.15rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
								<span className='sr-only'>Toggle theme</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end' className='w-36'>
							<DropdownMenuItem
								onClick={() => setTheme("light")}
								className='cursor-pointer'
							>
								<Sun className='mr-2 h-4 w-4' />
								<span>Light</span>
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setTheme("dark")}
								className='cursor-pointer'
							>
								<Moon className='mr-2 h-4 w-4' />
								<span>Dark</span>
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setTheme("system")}
								className='cursor-pointer'
							>
								<Settings className='mr-2 h-4 w-4' />
								<span>System</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					{/* Profile Menu */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='ghost'
								className='h-8 w-8 rounded-full border border-border overflow-hidden'
							>
								<Avatar className='h-8 w-8'>
									<AvatarImage src='' alt='Profile' />
									<AvatarFallback className='text-xs'>
										{user?.email?.charAt(0).toUpperCase()}
									</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-56' align='end' forceMount>
							<DropdownMenuLabel className='font-normal'>
								<div className='flex flex-col space-y-1'>
									<p className='text-xs leading-none text-muted-foreground'>
										{user?.email}
									</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem className='cursor-pointer'>
									<User className='mr-2 h-4 w-4' />
									<span>Profile</span>
								</DropdownMenuItem>
								<DropdownMenuItem className='cursor-pointer'>
									<Settings className='mr-2 h-4 w-4' />
									<span>Settings</span>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={handleLogout}
								className='text-destructive cursor-pointer'
							>
								<LogOut className='mr-2 h-4 w-4' />
								<span>Log out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
