import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const STATE_DIR = process.env.STATE_DIR ?? "artifacts/state";

function stripBom(s: string) {
  return s.replace(/^\uFEFF/, "");
}

export async function saveState(name: string, data: unknown) {
  const file = path.resolve(STATE_DIR, name);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(data, undefined, 2), "utf8");
  return file;
}

export async function readState<T>(name: string): Promise<T> {
  const file = path.resolve(STATE_DIR, name);
  const raw = await readFile(file, "utf8");
  const text = stripBom(raw).trim();
  return JSON.parse(text) as T;
}

export async function tryReadState<T>(name: string): Promise<T | undefined> {
  try {
    return await readState<T>(name);
  } catch (error: unknown) {
    console.warn("Failed to read state:", error);
    throw error;
  }
}
