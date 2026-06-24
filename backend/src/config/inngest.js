import { Inngest } from "inngest";
import { conncetDB } from "../config/db.js";

export const inngest = new Inngest({ id: "slack-clone" });

const syncUser = inngest.createFunction(
    { id: "sync-user" },
    { event: "clerk/user.created" },
    async ({ event }) => {
        await conncetDB()

        const { id, email, first_name, last_name, iamge_url } = event.data;

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
    { id: "deleteUserFromDb" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {

        const { id } = event.data;

        await User.deleteOne({ clerkId: id });
        await deleteStreamUser(id.toString());


    }
)



export const functions = [syncUser, deleteUserFromDb];