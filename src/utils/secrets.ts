import fs from "fs";
import dotenv from "dotenv";

const env = dotenv.config();

dotenv.load();

const parsed = env.parsed! || process.env;

export const SESSION_SECRET = parsed["SESSION_SECRET"] || process.env.SESSION_SECRET!;
export const MLAB_URI = parsed["MLAB_URI"] || process.env.MLAB_URI!;

if (!SESSION_SECRET) {
    console.error("No client secret. Set SESSION_SECRET environment variable.");
    process.exit(1);
}

if (!MLAB_URI) {
    console.error("No mongo connection string. Set MLAB_URI environment variable.");
    process.exit(1);
}