import { headers } from "next/headers";

/** Read the per-request CSP nonce stamped by Proxy (`x-nonce`). */
export async function getCspNonce(): Promise<string | undefined> {
  const headerStore = await headers();
  return headerStore.get("x-nonce") ?? undefined;
}
