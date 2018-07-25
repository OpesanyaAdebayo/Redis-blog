import fs from "fs";
import dotenv from "dotenv";

const env = dotenv.config();

dotenv.load();

const parsed = env.parsed! || process.env;

export const SESSION_SECRET =
  parsed["SESSION_SECRET"] || process.env.SESSION_SECRET!;