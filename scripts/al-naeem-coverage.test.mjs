import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  AL_NAEEM_EDITORIAL_DATA,
  getAlNaeemProps,
} from '../lib/alNaeemPresence.js';
import { alNaeemCoverageFor, AL_NAEEM_EAST_COAST_DETAILS } from '../lib/alNaeemLocalSeo.js';

const expected = ['fujairah', 'kalba', 'khorfakkan'];

test('East Coast coverage reuses existing directory URLs without publishing new company area routes', () => {
  const { areas, coverageAreas } = AL_NAEEM_EDITORIAL_DATA;
  assert.equal(new Set(coverageAreas.map(area => area.slug)).size, coverageAreas.length);

  for (const slug of expected) {
    const area = coverageAreas.find(item => item.slug === slug);
    assert.ok(area, `${slug} is covered`);
    assert.ok(!areas.some(item => item.slug === slug), `${slug} does not create a new company URL`);
    for (const locale of ['ar', 'en']) {
      assert.ok(area[`name_${locale}`]);
      assert.ok(area[`description_${locale}`]?.length > 70);
      assert.ok(area[`details_${locale}`]?.length > 120);
      assert.equal(area[`highlights_${locale}`]?.length, 3);
    }
  }
});

test('new coverage does not automatically create provider pages', async () => {
  for (const locale of ['ar', 'en']) {
    for (const slug of expected) {
      const result = await getAlNaeemProps({res:{setHeader(){}}},locale,['service-areas',slug]);
      assert.deepEqual(result,{notFound:true});
    }
  }
  assert.deepEqual(
    await getAlNaeemProps({res:{setHeader(){}}},'ar',['service-areas','unknown-city']),
    {notFound:true},
  );
});

test('existing directory hierarchy matches east-coast coverage exactly', () => {
  assert.equal(alNaeemCoverageFor('fujairah'), 'fujairah');
  assert.equal(alNaeemCoverageFor('fujairah', 'fujairah-city'), 'fujairah');
  assert.equal(alNaeemCoverageFor('fujairah', 'dibba-al-fujairah'), null);
  assert.equal(alNaeemCoverageFor('sharjah', 'kalba'), 'kalba');
  assert.equal(alNaeemCoverageFor('sharjah', 'khorfakkan'), 'khorfakkan');
  assert.equal(alNaeemCoverageFor('abu-dhabi', 'abu-dhabi-city'), null);
  assert.equal(alNaeemCoverageFor('abu-dhabi', 'al-ain'), 'al-ain');
  for (const slug of expected) {
    assert.ok(AL_NAEEM_EAST_COAST_DETAILS[slug].ar.intro.length > 90);
    assert.ok(AL_NAEEM_EAST_COAST_DETAILS[slug].en.intro.length > 90);
  }
});

test('additional requests are visible content, not new service URLs or discounts', () => {
  const { services, offers, additionalRequests } = AL_NAEEM_EDITORIAL_DATA;
  assert.deepEqual(additionalRequests.map(item => item.slug), [
    'facade-cleaning', 'courtyard-garden-cleaning', 'parking-area-cleaning',
  ]);
  for (const request of additionalRequests) {
    assert.ok(request.name_ar && request.name_en && request.description_ar && request.description_en);
    assert.ok(!services.some(service => service.slug === request.slug));
    assert.ok(!offers.some(offer => offer.service_slug === request.slug));
  }
});

test('all additional coverage areas lead to existing directory routes', () => {
  const {coverageAreas}=AL_NAEEM_EDITORIAL_DATA;
  const urls = {
    fujairah:'/uae/fujairah/fujairah-city/cleaning-services',
    kalba:'/uae/sharjah/kalba/cleaning-services',
    khorfakkan:'/uae/sharjah/khorfakkan/cleaning-services',
  };
  for (const [slug, url] of Object.entries(urls)) {
    const coverage=coverageAreas.find(item=>item.slug===slug);
    assert.equal(coverage?.directoryPath,url);
  }
});

test('the supplied branded still images exist in the correct website asset paths', () => {
  const {gallery}=AL_NAEEM_EDITORIAL_DATA;
  assert.equal(gallery.length,3);
  const projectRoot=path.dirname(fileURLToPath(import.meta.url))+'/..';
  for (const photo of gallery) {
    assert.match(photo.image,/^\/images\/providers\/al-naeem\/[a-z-]+\.webp$/);
    assert.ok(existsSync(path.resolve(projectRoot,'public'+photo.image)),photo.image);
    assert.ok(photo.name_ar && photo.name_en && photo.description_ar && photo.description_en);
  }
});
