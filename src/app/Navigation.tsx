"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"


import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import {useSession} from "next-auth/react";
import {signOut} from "next-auth/react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const menuItems = [
    { title: "Home", href: "/" },
    { title: "Polls", href: "/polls" },
    { title: "Contact", href: "/contact" },
]

export function Navigation() {
    const [isOpen, setIsOpen] = React.useState(false)
    const { data: session } = useSession();
    return (
        <nav className="bg-white border-b border-gray-200 fixed w-full z-20 top-0 left-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap">POLL.io</span>
                </Link>
                <div className="flex md:order-2">
                    {session?.user ? (
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <Link href={"#"}>
                                    <DropdownMenuItem className={"cursor-pointer"}>
                                        My Account
                                    </DropdownMenuItem>
                                </Link>
                                <Link href={"/dashboard/polls"}>
                                    <DropdownMenuItem className={"cursor-pointer"}>
                                        My polls
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuSeparator />
                                    <Button variant='destructive' onClick={() => signOut()} className={"w-full"}>Sign out</Button>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href={"/signin"}>
                            <Button variant="default">
                                Sign in
                            </Button>
                        </Link>
                    )}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" className="px-2 md:hidden">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <div className="flex flex-col space-y-4 mt-4">
                                {menuItems.map((item) => (
                                    <React.Fragment key={item.title}>
                                        <Link href={item.href} onClick={() => setIsOpen(false)}>
                                            <Button variant="ghost" className="w-full justify-start">
                                                {item.title}
                                            </Button>
                                        </Link>
                                    </React.Fragment>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
                        {menuItems.map((item) => (
                            <li key={item.title}>
                                <Link href={item.href} className={cn(
                                    "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 transition"
                                )}>
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}