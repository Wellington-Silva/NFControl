import crypto from 'crypto';

export const generateHash = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        hash.update(Date.now().toString());
        const generatedHash = hash.digest('hex');
        
        if (generatedHash) {
            resolve(generatedHash);
        } else {
            reject(new Error('Failed to generate hash'));
        }
    });
};