// A keyword guide suggests a sector; it does not diagnose problems or rank providers.
const rules = [
  ['general-maintenance', ['تنظيف المكيف', 'تنظيف تكييف', 'clean ac', 'clean air conditioner']],
  ['hourly-cleaning', ['بالساعه', 'عاملات', 'عامله', 'hourly', 'maid']],
  ['cleaning-services', ['تنظيف', 'كنب', 'سجاد', 'مجالس', 'clean', 'sofa', 'carpet']],
  ['general-maintenance', ['صيانه', 'مكيف', 'تكييف', 'سباكه', 'كهرباء', 'تسرب', 'عزل', 'دهان', 'بويا', 'maintenance', 'plumb', 'electric', 'leak', 'waterproof', 'paint', 'air condition']],
  ['aluminium-glass', ['المنيوم', 'زجاج', 'aluminium', 'aluminum', 'glass']],
  ['building-materials', ['مواد بناء', 'اسمنت', 'حديد', 'توريد', 'مورد', 'building material', 'cement', 'supplier']],
  ['furniture-decor', ['اثاث', 'مفروشات', 'ستائر', 'furniture', 'curtain']],
  ['interior-design', ['تصميم', 'ديكور', 'design', 'interior']],
  ['general-contracting', ['مقاول', 'بناء', 'تشطيب', 'ترميم', 'contract', 'construct', 'renovat', 'fit out']],
];
function normalize(value) {
  return String(value || '').toLowerCase().normalize('NFKD').replace(/[\u064b-\u065f\u0670]/g, '')
    .replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}
export function suggestDirectorySector(input) {
  const text = normalize(input);
  if (!text) return null;
  return rules.find(([, phrases]) => phrases.some((phrase) => text.includes(normalize(phrase))))?.[0] || null;
}
