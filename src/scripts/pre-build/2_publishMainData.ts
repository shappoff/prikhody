import fs from 'fs';
import path from 'path';
import {prikhodyMainDataPath, prikhodyMainDataPublicPath} from '@/components/paths';

export default async function publishMainData() {
    if (!fs.existsSync(prikhodyMainDataPath)) {
        console.warn(`Skip public copy: missing ${prikhodyMainDataPath}`);
        return;
    }

    fs.mkdirSync(path.dirname(prikhodyMainDataPublicPath), {recursive: true});
    fs.copyFileSync(prikhodyMainDataPath, prikhodyMainDataPublicPath);
    console.log(`Copied parish list to ${prikhodyMainDataPublicPath}`);
}
