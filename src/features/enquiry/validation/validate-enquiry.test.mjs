import test from 'node:test';
import assert from 'node:assert/strict';
import { validateEnquiry } from './validate-enquiry.ts';

const valid = { name: 'Example Person', email: 'example@example.com', message: 'A project enquiry for validation.' };

test('normalizes valid enquiry input', () => {
  const result = validateEnquiry({ ...valid, name: ' Example Person ', email: ' EXAMPLE@EXAMPLE.COM ' });
  assert.equal(result.success, true);
  assert.equal(result.data.name, 'Example Person');
  assert.equal(result.data.email, 'example@example.com');
});
test('rejects malformed payloads and missing required fields', () => {
  for (const value of [null, [], 'text', {}, { ...valid, name: 42 }, { ...valid, message: '' }]) {
    assert.equal(validateEnquiry(value).success, false);
  }
});
test('rejects invalid emails and header line breaks', () => {
  for (const override of [{ email: 'invalid' }, { name: 'Example\nBcc: other' }, { company: 'Company\rInjected' }, { phone: '123\n456' }]) {
    assert.equal(validateEnquiry({ ...valid, ...override }).success, false);
  }
});
test('enforces message and field length limits', () => {
  for (const override of [{ name: 'x'.repeat(101) }, { company: 'x'.repeat(121) }, { phone: 'x'.repeat(41) }, { message: 'x'.repeat(5001) }, { message: 'short' }]) {
    assert.equal(validateEnquiry({ ...valid, ...override }).success, false);
  }
  assert.equal(validateEnquiry({ ...valid, message: 'x'.repeat(5000) }).success, true);
});
