"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Chrome } from "lucide-react"
import {signIn} from "next-auth/react";
import {createUser} from "@/lib/actions/User.actions";
import {UserType} from "@/lib/types/User.type";

export default function AuthTabs() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string|null>(null)
    const pathname = usePathname()
    const router = useRouter()

    const [activeTab, setActiveTab] = useState<string>("signin")

    useEffect(() => {
        if (pathname === "/signin") {
            setActiveTab("signin")
        } else if (pathname === "/register") {
            setActiveTab("register")
        }
    }, [pathname])

    const onSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        setIsLoading(true)
        const formData = new FormData(event.target as HTMLFormElement);

        const user = await createUser({
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            confirmPassword: formData.get('confirm-password') as string
        }) as UserType | {error: {message: string}}

        if (user?.error?.message) {
            setError(user.error);
        } else {
            router.push("/signin")
        }
        setIsLoading(false)
    }

    function onGoogleAuth() {
        signIn("google", { redirectTo: "/" })
    }

    const handleLogin = (formData: FormData) => {
        setIsLoading(true);
        console.log(formData)
        signIn("credentials", {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        });
        setIsLoading(false);
    }

    const handleTabChange = (value: string) => {
        setActiveTab(value)
        router.push(value === "signin" ? "/signin" : "/register")
    }

    return (
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
                <Card>
                    <CardHeader>
                        <CardTitle>Sign In</CardTitle>
                        <CardDescription>
                            Enter your email and password to sign in to your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <form action={handleLogin} className={"space-y-3"}>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" name="email" placeholder="m@example.com" required autoComplete={"email"}/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" name="password" required autoComplete={"current-password"}/>
                            </div>
                            <Button disabled={isLoading} type="submit" className="w-full">
                                {isLoading ? "Signing in..." : "Sign In"}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <div className="relative w-full">
                            <Separator className="my-4" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="bg-background px-2 text-muted-foreground text-sm">Or continue with</span>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full" onClick={onGoogleAuth}>
                            <Chrome className="mr-2 h-4 w-4" />
                            Sign in with Google
                        </Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="register">
                <Card>
                    <CardHeader>
                        <CardTitle>Register</CardTitle>
                        <CardDescription>
                            Create a new account by filling out the form below.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <form onSubmit={onSubmit} className={"space-y-2"}>
                            <div className="space-y-1">
                                <Label htmlFor="name">Username</Label>
                                <Input id="name" placeholder="johndoe" name="name" required autoComplete={"name"}/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="m@example.com" required autoComplete={"email"}/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" type="password" required autoComplete={"new-password"}/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                <Input id="confirm-password" name="confirm-password" type="password" required autoComplete={"new-password"}/>
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <Button disabled={isLoading} type="submit" className="w-full">
                                {isLoading ? "Registering..." : "Register"}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <div className="relative w-full">
                            <Separator className="my-4" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="bg-background px-2 text-muted-foreground text-sm">Or continue with</span>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full" onClick={onGoogleAuth}>
                            <Chrome className="mr-2 h-4 w-4" />
                            Sign up with Google
                        </Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}