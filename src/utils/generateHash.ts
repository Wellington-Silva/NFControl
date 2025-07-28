import crypto from 'crypto';

export const generateHash = (): string => {
    const randomData = `${Date.now()}-${crypto.randomBytes(16).toString('hex')}`;
    const hash = crypto.createHash('sha256').update(randomData).digest('hex');
    return hash;
};