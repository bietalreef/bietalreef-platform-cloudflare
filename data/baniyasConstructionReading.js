import c01 from './baniyasConstructionChapters01.json';
import c02 from './baniyasConstructionChapters02.json';
import c03 from './baniyasConstructionChapters03.json';
import c04 from './baniyasConstructionChapters04.json';
import c05 from './baniyasConstructionChapters05.json';
import c06 from './baniyasConstructionChapters06.json';

export const baniyasConstructionChapters = [
  ...c01.chapters, ...c02.chapters, ...c03.chapters,
  ...c04.chapters, ...c05.chapters, ...c06.chapters,
];

const escapeHtml = value => String(value || '')
 .replaceAll('&','&amp;').replaceAll('<','&lt;')
 .replaceAll('>','&gt;').replaceAll('"','&quot;');

export function baniyasConstructionReadingHtml(locale='ar') {
 const en=locale==='en';
 const chapterTitles = baniyasConstructionChapters.map((chapter,index) =>
  `<li><a data-read-target="${chapter.id}" href="#${chapter.id}">${index+1}. ${escapeHtml(chapter[locale].title)}</a></li>`).join('');
 const articles=baniyasConstructionChapters.map((chapter,index)=>
  `<section class="reading-chapter" aria-labelledby="${chapter.id}"><h3 id="${chapter.id}" tabindex="-1">${index+1}. ${escapeHtml(chapter[locale].title)}</h3>${chapter[locale].html}</section>`).join('');
 return `<div class="reading-compendium"><p>${en?
 'These seventeen construction drafts are provided for guidance and are undergoing editorial review. Confirm project-specific requirements with the competent authority.':
 'هذه المسودات الإرشادية السبعة عشر للمقاولات في بني ياس ما زالت قيد المراجعة التحريرية. تحقق من متطلبات مشروعك لدى الجهة المختصة.'}</p>
 <nav class="reading-toc" aria-label="${en?'Chapter index':'فهرس المقالات'}">
 <h3>${en?'In this guide':'فهرس المحتوى'}</h3><ol>${chapterTitles}</ol></nav>
 ${articles}</div>`;
}
