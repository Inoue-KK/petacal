const PBKDF2_ITERATIONS = 100000;
const SALT = "petacal-comment-salt";

async function deriveKey(userId: string): Promise<CryptoKey> {
  const raw = new TextEncoder().encode(userId);
  const base = await crypto.subtle.importKey("raw", raw, "PBKDF2", false, [
    "deriveKey",
  ]);
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: new TextEncoder().encode(SALT),
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    base,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

export async function encryptComment(
  text: string,
  userId: string,
): Promise<string> {
  if (!text) return "";
  const key = await deriveKey(userId);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(text);
  const cipher = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoded,
  );
  const combined = new Uint8Array(iv.byteLength + cipher.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(cipher), iv.byteLength);
  return btoa(String.fromCharCode(...combined));
}

export async function decryptComment(
  encrypted: string,
  userId: string,
): Promise<string> {
  if (!encrypted) return "";
  try {
    const combined = Uint8Array.from(atob(encrypted), (c) => c.charCodeAt(0));
    const iv = combined.slice(0, 12);
    const cipher = combined.slice(12);
    const key = await deriveKey(userId);
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      cipher,
    );
    return new TextDecoder().decode(decrypted);
  } catch (error) {
    return encrypted;
  }
}
