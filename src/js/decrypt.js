// AES-256-GCM decryption using Web Crypto API
// Matches the Node.js encryption in eleventy.config.js

const SALTS = {
  commercial: 'e3b0c44298fc1c149afbf4c8996fb924',
  personal:   'a665a45920422f9d417e4867efdc4fb8'
};

const ITERATIONS = 600000;

function hexToBuffer(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}

async function deriveKey(password, saltHex) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']
  );
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: hexToBuffer(saltHex), iterations: ITERATIONS, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );
}

async function decryptContent(password, encryptedData) {
  const { tier, iv, ciphertext } = encryptedData;
  const salt = SALTS[tier];
  if (!salt) throw new Error('Unknown tier: ' + tier);

  const key = await deriveKey(password, salt);
  const ivBuf = hexToBuffer(iv);
  const ctBuf = hexToBuffer(ciphertext);

  const plainBuf = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: ivBuf },
    key,
    ctBuf
  );

  return new TextDecoder().decode(plainBuf);
}

window.decryptContent = decryptContent;
