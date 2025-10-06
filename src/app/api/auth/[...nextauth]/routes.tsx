import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID)
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET)
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL)
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    debug: true,
    callbacks: {
        async session({ session, token, user }: { session: any; token: any; user: any }) {
            return session
        },
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
