import NextAuth from "next-auth/next"
import GoogleProvider from 'next-auth/providers/google'
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: "31085751958-d3lqnpi2jnhc9pt73d78011knl0dil2r.apps.googleusercontent.com",
            clientSecret: "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",
        }),
    ],
    secret: "vGeKlE5iDx7t9V41cYuPav2DOjKAD2RnlYwjg8OVzJM=",
    callbacks: {
        async signIn({credentials,profile,email,account,user}) {
        const client = await clientPromise;
        const db = client.db("users");
        const userCollection = db.collection("profiles");
        const existingUser = await userCollection.findOne({ mail: profile.email });
        if (!existingUser) {
            const newUserProfile = {
                firstName: profile.given_name,
                lastName: profile.family_name,
                mail: profile.email,
                img: profile.picture,
                survtaken: 0,
                survmade: 0,
                amtearned: 0,
                created: []
            };
            await userCollection.insertOne(newUserProfile);
        }
        return true
    }}
});