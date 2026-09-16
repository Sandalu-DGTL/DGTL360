import test from 'node:test';
import assert from 'node:assert/strict';
import { readLimitedJson } from './read-json.ts';

function request(chunks, onCancel = () => {}) {
  return new Request('https://example.com', {
    method: 'POST', duplex: 'half',
    body: new ReadableStream({
      start(controller) { chunks.forEach(chunk => controller.enqueue(chunk)); controller.close(); },
      cancel: onCancel,
    }),
  });
}
const encode = text => new TextEncoder().encode(text);

test('reads chunked JSON including split multibyte characters', async () => {
  const bytes = encode('{"name":"é"}');
  assert.deepEqual(await readLimitedJson(request([bytes.slice(0, 10), bytes.slice(10)]), bytes.length), { name: 'é' });
});
test('rejects oversized bodies without a content-length header and cancels reading', async () => {
  let cancelled = false;
  await assert.rejects(readLimitedJson(request([encode('12345'), encode('67890')], () => { cancelled = true; }), 4), RangeError);
  assert.equal(cancelled, true);
});
test('rejects invalid JSON and malformed UTF-8', async () => {
  await assert.rejects(readLimitedJson(request([encode('{')]), 20), SyntaxError);
  await assert.rejects(readLimitedJson(request([new Uint8Array([255])]), 20), TypeError);
});
