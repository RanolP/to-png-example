import fs from 'node:fs';
import { Resvg } from '@resvg/resvg-js';
import { fetch } from '@whatwg-node/fetch';

const svg = fs.readFileSync('./template/shiftpsh.svg', { encoding: 'utf-8' });

const begin = new Date();

const resvg = new Resvg(svg, {
  font: {
    loadSystemFonts: true,
    defaultFontFamily: 'Noto Sans',
  },
});
const resolved = await Promise.all(
  resvg.imagesToResolve().map(async (url) => {
    const response = await fetch(url);
    let buffer;
    if (response.headers.get('content-type') === 'image/svg+xml') {
      const resvg = new Resvg(await response.text(), {
        font: {
          loadSystemFonts: false,
        },
      });
      buffer = resvg.render().asPng();
    } else {
      buffer = Buffer.from(await response.arrayBuffer());
    }
    return {
      url,
      buffer,
    };
  }),
);
if (resolved.length > 0) {
  for (const result of resolved) {
    const { url, buffer } = result;
    resvg.resolveImage(url, buffer);
  }
}
fs.writeFileSync('./screenshot/resvg.png', resvg.render().asPng());

const end = new Date();

console.log(`${end - begin} ms`);
