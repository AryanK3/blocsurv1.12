import NextAuth from "next-auth/next"
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: "31085751958-d3lqnpi2jnhc9pt73d78011knl0dil2r.apps.googleusercontent.com",
            clientSecret: "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",
        }),
    ],
    secret: "vGeKlE5iDx7t9V41cYuPav2DOjKAD2RnlYwjg8OVzJM="
});