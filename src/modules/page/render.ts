import { readFile } from 'fs/promises';
export const render = async () => {
    const htmlStr = await readFile('./build/index.html', { encoding: 'utf-8' });
    return htmlStr;
}