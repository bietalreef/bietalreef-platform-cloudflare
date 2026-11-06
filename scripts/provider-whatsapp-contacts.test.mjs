import test from 'node:test';
import assert from 'node:assert/strict';
import { buildProviderWhatsappUrl, buildCardWhatsappUrl } from '../lib/providerWhatsapp.js';

test('WhatsApp contacts use international UAE format without changing the destination', () => {
  for (const phone of ['0547761290', '547761290', '+971 54 776 1290', '00971547761290']) {
    const url = new URL(buildProviderWhatsappUrl({ phone, providerName: 'Example', profilePath: '/providers/example' }));
    assert.equal(url.hostname, 'wa.me');
    assert.equal(url.pathname, '/971547761290');
    assert.ok(url.searchParams.get('text').includes('Example'));
  }
  assert.equal(new URL(buildCardWhatsappUrl({ phone: '0556485364', title: 'Painting' })).pathname, '/971556485364');
  assert.equal(buildProviderWhatsappUrl({ phone: '123' }), null);
});
