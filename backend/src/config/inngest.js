import { Inngest } from "inngest";
import { connectDB } from "../config/db.js";
import { User } from "../models/user.model.js";
import { ENV } from "./env.js";

export const inngest = new Inngest({
    id: "slack-clone",
    signingKey: ENV.INNGEST_SIGNING_KEY
});

const syncUser = inngest.createFunction(
    {
        id: "sync-user",
        triggers: { event: "clerk/user.created" }
    },
    async ({ event }) => {
        await connectDB();

        const { id, email_addresses, first_name, last_name, image_url } = event.data;

        const newUser = {
            clerkId: id,
            email: email_addresses[0]?.email_address,
            name: `${first_name} ${last_name}`,
            image: image_url,

        }

        await User.create(newUser)
    }
)

const deleteUserFromDb = inngest.createFunction(
    {
        id: "deleteUserFromDb",
        triggers: { event: "clerk/user.deleted" }
    },
    async ({ event }) => {
        await connectDB();
        const { id } = event.data;

        await User.deleteOne({ clerkId: id });
    }
)



export const functions = [syncUser, deleteUserFromDb];