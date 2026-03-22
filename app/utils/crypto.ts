const PBKDF2_ITERATIONS = 100000;

async function deriveKey(
  userId: string,
  salt: Uint8Array<ArrayBuffer>,
): Promise<CryptoKey> {
  const raw = new TextEncoder().encode(userId);
  const base = await crypto.subtle.importKey("raw", raw, "PBKDF2", false, [
    "deriveKey",
  ]);
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
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
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(userId, salt);
  const encoded = new TextEncoder().encode(text);
  const cipher = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoded,
  );
  const combined = new Uint8Array(
    salt.byteLength + iv.byteLength + cipher.byteLength,
  );
  combined.set(salt, 0);
  combined.set(iv, salt.byteLength);
  combined.set(new Uint8Array(cipher), salt.byteLength + iv.byteLength);
  return btoa(String.fromCharCode(...combined));
}

export async function decryptComment(
  encrypted: string,
  userId: string,
): Promise<string> {
  if (!encrypted) return "";
  try {
    const combined = Uint8Array.from(atob(encrypted), (c) => c.charCodeAt(0));
    const salt = combined.slice(0, 16);
    const iv = combined.slice(16, 28);
    const cipher = combined.slice(28);
    const key = await deriveKey(userId, salt);
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      cipher,
    );
    return new TextDecoder().decode(decrypted);
  } catch {
    return encrypted;
  }
}
