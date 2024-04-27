import * as crypto from 'crypto';
import base64url from 'base64url';

const ALGORITHM = 'aes-128-ecb';
const LP_AES_KEY = '****************'; // 企微提供

function aesEncode(content: string, key: string) {
  if (!key || key.length !== 16) {
    return null;
  }
  const cipher = crypto.createCipheriv(ALGORITHM, key, '');
  let encrypted = cipher.update(content, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

export function aesEncodeUrlSafe(content: string, key = LP_AES_KEY) {
  if (!key || key.length !== 16) {
    return null;
  }
  const cipher = crypto.createCipheriv(ALGORITHM, key, '');
  let encrypted = cipher.update(content, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return base64url.fromBase64(encrypted);
}

function aesDecode(content: string, key: string) {
  if (!key || key.length !== 16) {
    return null;
  }
  const decipher = crypto.createDecipheriv(ALGORITHM, key, '');
  let decrypted = decipher.update(content, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// 示例
const content = 'Hello, world!';
const key = 'abcdefghijklmnop';

const encrypted = aesEncode(content, key);
console.log('加密后的内容:', encrypted);

const decrypted = aesDecode(encrypted, key);
console.log('解密后的内容:', decrypted);

const encryptedUrlSafe = aesEncodeUrlSafe(content, key);
console.log('加密后的 URL 安全内容:', encryptedUrlSafe);