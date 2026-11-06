import { EMIRATE_LABELS } from '../data/emirateSectorContexts.js';

// Adapt the existing topic index without carrying unrelated city names across.
export function emirateTopicTitle(title, mode, locale) {
  const names = EMIRATE_LABELS[mode];
  if (!names) return title;
  if (locale === 'en') return title
    .replace(/Abu Dhabi City, Al Ain and Al Dhafra|Abu Dhabi, Al Ain and Al Dhafra/gi, `${names[1]} and its areas`)
    .replace(/the three emirate regions/gi, `${names[1]} and its areas`)
    .replace(/Abu Dhabi Emirate/gi, `${names[1]} Emirate`)
    .replace(/Abu Dhabi/gi, names[1]);
  return title
    .replace(/مدينة أبوظبي والعين والظفرة|أبوظبي والعين والظفرة/g, `${names[0]} ومناطقها`)
    .replace(/بأبوظبي/g, `في ${names[0]}`)
    .replace(/إمارة أبوظبي/g, `إمارة ${names[0]}`)
    .replace(/أبوظبي/g, names[0]);
}
