import QRCode from 'qrcode';

export async function generateQRCode(text: string): Promise<string> {
    return await QRCode.toDataURL(text); // base64 para inserir direto em HTML ou PDF
};