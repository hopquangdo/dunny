"use client"

import { createContext, useContext, useEffect, useState } from "react"

const UserContext = createContext<any>(null)

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/auth/me")
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
                setUser(data?.user || null)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext)
}
