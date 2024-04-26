"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SigninPage() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const router = useRouter()
    const { logout, state, login, session } = useAuth()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);

        await login(email, password);
        setLoading(false);
    }

    useEffect(() => {
        if (state === 'authenticated') {
            router.push("/")
        }
    }, [session, state]);

    if (state === 'loading' || state === "authenticated") {
        return (
            <div className="flex w-full h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="flex w-full h-screen flex-col items-center justify-center">
            <Card className="w-full md:w-96">
                <CardHeader>
                    <CardTitle>Giriş Yap</CardTitle>
                    <CardDescription>Lütfen hesap bilgilerinizi aşağıya giriniz</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col space-y-4">
                            <label>
                                Email
                            </label>
                            <Input disabled={loading} value={email} onChange={(e) => setEmail(e.currentTarget.value)} type="email" className="input" />
                            <label>
                                Password
                            </label>
                            <Input disabled={loading} value={password} onChange={(e) => setPassword(e.currentTarget.value)} type="password" className="input" />
                            <Button disabled={loading} type="submit" className="btn">
                                Sign in
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}