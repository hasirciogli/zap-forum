"use client"
import { IAccount } from "@/interfaces/IAccount";
import { ISession } from "@/interfaces/ISession";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export interface AuthContextType {
    session: ISession | null;
    state: "authenticated" | "unauthenticated" | "loading" | "error";
    login: (email: string, password: string) => Promise<void>;
    logout: () => boolean;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
    const [session, setSession] = useState<ISession | null>(null);
    const [state, setState] = useState<"authenticated" | "unauthenticated" | "loading" | "error">("loading");

    const fetchSession = async () => {
        const res = await fetch("/api/auth");

        if (res.ok) {
            const data = await res.json();
            if (data.status) {
                setSession(data.session as ISession);
                setState("authenticated");
            } else {
                setSession(null);
                setState("unauthenticated");
            }
        } else {
            setSession(null);
            setState("unauthenticated");
        }
    }

    useEffect(() => {
        fetchSession();

        var intervalId = setInterval(fetchSession, 1000 * 15);

        return () => {
            setSession(null);
            setState("unauthenticated");
            clearInterval(intervalId);
        }
    }, []);

    const login = async (email: string, password: string) => {
        var sonnerId = toast.loading("Logging in ...")
        const res = await fetch("/api/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
            body: JSON.stringify({
                email,
                password
            }),
        })

        if (res.ok) {
            const data = await res.json();
            if (data.status) {
                toast.success("Logged in successfully.", { id: sonnerId });
                setSession(data.session as ISession);
                setState("authenticated");
            } else {
                toast.error(data.message, { id: sonnerId });
                setSession(null);
                setState("unauthenticated");
            }
        } else {
            toast.error("An error occurred while logging in.", { id: sonnerId });
            setSession(null);
            setState("unauthenticated");
        }
    }

    const logout = () => {
        setSession(null);
        setState("unauthenticated");
        // TODO: Fetch ile delete request kullanarak sunucudan da boş session verisini sil.
        return true;
    }

    return (
        <AuthContext.Provider value={{ state, session, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}