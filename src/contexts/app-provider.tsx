"use client"

import { UserProvider } from "./user-context"

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    )
}
