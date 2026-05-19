import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

const ALGORITHM = 'aes-256-gcm';
const PREFIX = 'v1:';

@Injectable()
export class CredentialEncryptionService {
  private readonly key: Buffer;

  constructor() {
    const raw = process.env.SERVICE_ENCRYPTION_KEY;
    if (!raw) {
      throw new Error(
        'SERVICE_ENCRYPTION_KEY no está definido. Usa 64 caracteres hex (32 bytes).',
      );
    }
    this.key = Buffer.from(raw, 'hex');
    if (this.key.length !== 32) {
      throw new Error('SERVICE_ENCRYPTION_KEY debe ser 64 caracteres hex (32 bytes).');
    }
  }

  encrypt(plaintext: string): string {
    const iv = randomBytes(12);
    const cipher = createCipheriv(ALGORITHM, this.key, iv);
    const encrypted = Buffer.concat([
      cipher.update(plaintext, 'utf8'),
      cipher.final(),
    ]);
    const tag = cipher.getAuthTag();
    return `${PREFIX}${iv.toString('base64')}:${tag.toString('base64')}:${encrypted.toString('base64')}`;
  }

  decrypt(stored: string): string {
    if (!this.isEncrypted(stored)) {
      return stored;
    }
    const payload = stored.slice(PREFIX.length);
    const [ivB64, tagB64, dataB64] = payload.split(':');
    const iv = Buffer.from(ivB64, 'base64');
    const tag = Buffer.from(tagB64, 'base64');
    const data = Buffer.from(dataB64, 'base64');
    const decipher = createDecipheriv(ALGORITHM, this.key, iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8');
  }

  isEncrypted(value: string): boolean {
    return value.startsWith(PREFIX);
  }
}
