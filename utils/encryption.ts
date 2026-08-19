// utils/encryption.ts

// Generate or retrieve a consistent local encryption key for the browser session
async function getEncryptionKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode("Healthcare-EHR-Secure-Local-Key-2026"), // In production, this can be derived from user session parameters
    { name: "PBKDF2" },
    false,
    ["deriveKey"],
  );

  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode("healthcare-static-salt-value"),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

export async function encryptData(plainText: string): Promise<string> {
  try {
    const key = await getEncryptionKey();
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Initialization vector
    const encoded = new TextEncoder().encode(plainText);

    const encrypted = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      encoded,
    );

    // Combine IV and Ciphertext into a single storable string
    const buffer = new Uint8Array(iv.byteLength + encrypted.byteLength);
    buffer.set(iv, 0);
    buffer.set(new Uint8Array(encrypted), iv.byteLength);

    return btoa(String.fromCharCode(...buffer));
  } catch (error) {
    console.error("Encryption failed:", error);
    return plainText;
  }
}

export async function decryptData(cipherTextBase64: string): Promise<string> {
  try {
    const key = await getEncryptionKey();
    const binaryString = atob(cipherTextBase64);
    const buffer = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      buffer[i] = binaryString.charCodeAt(i);
    }

    const iv = buffer.slice(0, 12);
    const data = buffer.slice(12);

    const decrypted = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      data,
    );

    return new TextDecoder().decode(decrypted);
  } catch (error) {
    console.error("Decryption failed:", error);
    return "";
  }
}
