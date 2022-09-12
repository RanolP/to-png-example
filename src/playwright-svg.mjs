import fs from 'node:fs';
import { firefox } from 'playwright';

const html = fs.readFileSync('./template/shiftpsh.svg', { encoding: 'utf-8' });

const begin = new Date();

const browser = await firefox.launch();
const page = await browser.newPage();

await page.setContent(html);
await page.locator('svg').screenshot({ path: 'screenshot/playwright-svg.png' });

const end = new Date();

console.log(`${end - begin} ms`);

await page.close();
await browser.close();
