import express from "express";
import { ENV } from "./config/env.js"
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express"


const app = express();
app.use(express.json());
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use(clerkMiddleware());
app.get("/", (req, res) => {
    res.send("hello world");
})

app.listen(ENV.PORT, () => {
    console.log(`server started on this port ${ENV.PORT}`)
    connectDB();
});