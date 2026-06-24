import "dotenv/config";



export const ENV = {
    PORT: process.env.PORT || 5001,
    MONOG_URI: process.env.MONOG_URI,
    NODE_ENV: process.env.NODE_ENV || "development",
}