import Link from 'next/link';
import styles from './DirectoryKnowledge.module.css';
import DirectoryReadingDialog from './DirectoryReadingDialog';
import DirectoryResponsiveImage from './DirectoryResponsiveImage';
import { UAE_KNOWLEDGE_ASSETS } from '../data/uaeDirectoryVisuals';

// National guidance belongs here; emirate-specific requirements and technical
// diagnoses belong on their existing local and service pages.
const topics = [
  {
    id: 'project-journey',
    ar: {
      title: 'كيف تبدأ مشروع بناء وتتجنب المفاجآت؟',
      paragraphs: [
        'ابدأ بتحديد موقع المشروع واحتياجاتك والميزانية، ثم اتفق مع مكتب مؤهل على التصميم والتخصصات المطلوبة قبل مقارنة عروض المقاولين.',
        'احتفظ بالمخططات المعتمدة والمواصفات وجدول الكميات في ملف واحد. تأكد من التصاريح لدى الجهة المختصة بالإمارة، وحدد مسؤولية الاستشاري والمقاول عن الموافقات والفحص.',
        'قبل التسليم، راجع الأعمال مع المختص، وسجّل الملاحظات ومواعيد معالجتها، واستلم وثائق الإنجاز والاختبارات والضمانات التي تنطبق على مشروعك.'
      ],
      action: 'استكشف شركات المقاولات', href: '/providers/specialty/general-contracting'
    },
    en: {
      title: 'How do you start a construction project with fewer surprises?',
      paragraphs: [
        'Define the site, your needs and a realistic budget, then agree the design and required disciplines with a qualified consultant before comparing contractors.',
        'Keep approved drawings, specifications and the bill of quantities together. Check permits with the authority responsible for the emirate and agree who will handle approvals and inspections.',
        'Before handover, inspect the work with the appropriate professional, record outstanding items and dates, and collect applicable completion, test and warranty documents.'
      ],
      action: 'Explore construction companies', href: '/en/providers/specialty/general-contracting'
    }
  },
  {
    id: 'digital-construction',
    ar: {
      title: 'ما فائدة BIM والتصميم الرقمي؟',
      paragraphs: [
        'يساعد نموذج معلومات البناء BIM على تنسيق المخططات واكتشاف التعارضات بين التخصصات قبل التنفيذ، بينما يوضح التصميم ثنائي وثلاثي الأبعاد توزيع الفراغات والمقاسات.',
        'يمكن استخدام الواقع الافتراضي أو المعزز لمراجعة التصور، والذكاء الاصطناعي لمساعدة المختص في تنظيم المعلومات. تظل مراجعة التصميم واعتماد التصريح مسؤولية الجهات والأشخاص المخولين.',
        'أطلقت دائرة البلديات والنقل في أبوظبي منصة «بناء» لتطوير إجراءات تصاريح البناء. ارجع إلى الجهة الرسمية لمعرفة الخدمات المتاحة للمشروع ونطاق تطبيقها.'
      ],
      action: 'اكتشف دليل أبوظبي', href: '/uae/abu-dhabi',
      sourceLabel: 'دائرة البلديات والنقل: منصة بناء', source: 'https://www.dmt.gov.ae/Media-Centre/News/Binaa-Construction-Permits-Platform-Launched'
    },
    en: {
      title: 'How can BIM and digital design help?',
      paragraphs: [
        'Building information modelling helps coordinate disciplines and identify design conflicts before construction. Two- and three-dimensional views make spaces and dimensions easier to understand.',
        'Virtual or augmented reality can support design review, while AI can help professionals organise information. Qualified parties and the relevant authorities remain responsible for review and approval.',
        'Abu Dhabi’s Department of Municipalities and Transport launched Binaa to develop building permit procedures. Check the official service for the scope and steps applicable to your project.'
      ],
      action: 'Explore the Abu Dhabi directory', href: '/en/uae/abu-dhabi',
      sourceLabel: 'Department of Municipalities and Transport: Binaa', source: 'https://www.dmt.gov.ae/Media-Centre/News/Binaa-Construction-Permits-Platform-Launched'
    }
  },
  {
    id: 'municipal-digital-services',
    ar: {
      title: 'كيف تتصل رحلة المشروع بالخدمات البلدية الرقمية؟',
      paragraphs: [
        'يبدأ الملف الرقمي ببيانات الأرض واحتياجات المالك، ثم تنتقل نسخ المخططات والمواصفات وقرارات المشروع بين صاحب العمل والاستشاري والمقاول وفق الصلاحيات. رقم الإصدار وتاريخ الاعتماد يساعدان على معرفة الرسم الصحيح قبل التسعير والتنفيذ.',
        'في أبوظبي، تعرض دائرة البلديات والنقل منصة «بناء» لتطوير تقديم ومراجعة تصاريح البناء وتنسيق الجهات المعنية. راجع نوع المشروع ومرحلة تطبيق الخدمة لدى الدائرة قبل الاعتماد على إجراء معين.',
        'في دبي، يتيح تطبيق تصاريح البناء للمالك متابعة معلومات الأرض والبحث عن الاستشاريين والمقاولين المسجلين، إلى جانب خدمات مرتبطة بالتصاريح. يُتحقق من حالة المكتب ونطاق المشروع لدى بلدية دبي.',
        'بعد التصريح، تفيد السجلات الرقمية في توثيق طلبات الفحص وأوامر التغيير ومحاضر الاستلام والضمانات. لا يحل النموذج ثلاثي الأبعاد أو الذكاء الاصطناعي محل اعتماد الجهة أو فحص المختص.'
      ],
      action: 'دليل أبوظبي وخدماتها', href: '/uae/abu-dhabi',
      sourceLabel: 'دائرة البلديات والنقل: بناء', source: 'https://www.dmt.gov.ae/Media-Centre/News/Binaa-Construction-Permits-Platform-Launched',
      extraSourceLabel: 'بلدية دبي: تطبيق تصاريح البناء', extraSource: 'https://www.dm.gov.ae/new-improved-building-permits-app-launched-for-streamlined-services/'
    },
    en: {
      title: 'How do digital municipal services fit the project journey?',
      paragraphs: [
        'A digital project file begins with land information and the owner’s requirements. Drawings, specifications and decisions then move between the owner, consultant and contractor according to their permissions. Version numbers and approval dates identify the right drawing for pricing and construction.',
        'In Abu Dhabi, the Department of Municipalities and Transport presents Binaa as a way to develop building permit submission and review and coordinate the relevant authorities. Check the applicable project type and rollout stage with the department.',
        'In Dubai, the building permits app lets owners review plot information and find registered consultants and contractors, alongside permit-related services. Check the professional’s status and project scope with Dubai Municipality.',
        'After the permit, digital records can organise inspection requests, change orders, handover reports and warranties. A 3D model or AI does not replace approval by the authority or inspection by a qualified professional.'
      ],
      action: 'Explore Abu Dhabi services', href: '/en/uae/abu-dhabi',
      sourceLabel: 'DMT: Binaa', source: 'https://www.dmt.gov.ae/Media-Centre/News/Binaa-Construction-Permits-Platform-Launched',
      extraSourceLabel: 'Dubai Municipality: building permits app', extraSource: 'https://www.dm.gov.ae/new-improved-building-permits-app-launched-for-streamlined-services/'
    }
  },
  {
    id: 'choose-professional',
    ar: {
      title: 'كيف تختار المكتب الهندسي والمقاول؟',
      paragraphs: [
        'اختر التخصص الذي يحتاجه المشروع: التصميم المعماري أو الإنشائي أو الخدمات الميكانيكية والكهربائية أو الإشراف أو حصر الكميات، وقد يتطلب المشروع أكثر من مختص.',
        'تحقق من سريان الرخصة والنشاط والتصنيف لدى الجهة المختصة، واطلب نماذج أعمال مناسبة ومخرجات واضحة وجدولًا للمراجعة. ظهور الشركة في المنصة أو تقييم العملاء لا يعني وحده اعتمادًا حكوميًا.',
        'قارن نطاق الخدمة والمسؤوليات والمواعيد، وليس السعر الإجمالي فقط. تختلف متطلبات التصنيف والموافقات باختلاف الإمارة والمشروع.'
      ],
      action: 'تصفح المكاتب الهندسية', href: '/providers/specialty/interior-design',
      sourceLabel: 'الشركات الهندسية ذات التصنيف الساري في أبوظبي', source: 'https://pages.dmt.gov.ae/en/Engineering-Firms'
    },
    en: {
      title: 'How should you choose a consultant and contractor?',
      paragraphs: [
        'Start with the disciplines your project needs: architecture, structures, mechanical and electrical systems, supervision or cost planning. A project may need several specialists.',
        'Check the licence, permitted activity and classification with the responsible authority. Request relevant examples, defined deliverables and a review timetable. A platform listing or customer rating is not itself government accreditation.',
        'Compare scope, responsibilities and dates as well as price. Classification and approval requirements vary by emirate and project.'
      ],
      action: 'Explore engineering consultancies', href: '/en/providers/specialty/interior-design',
      sourceLabel: 'Abu Dhabi: engineering firms with valid classification', source: 'https://pages.dmt.gov.ae/en/Engineering-Firms'
    }
  },
  {
    id: 'tenders',
    ar: {
      title: 'متى تحتاج طلب سعر أو مناقصة؟',
      paragraphs: [
        'يصلح طلب عرض السعر RFQ عندما يكون العمل والكميات معروفين. أما طلب المعلومات RFI فيساعد على توضيح بند غير واضح، ويستخدم طلب المقترح RFP عندما تحتاج حلًا فنيًا وخطة تنفيذ.',
        'قد يسبق المنافسة إبداء اهتمام EOI للتأهيل، ثم دعوة للعطاء ITT بشروط ومواعيد محددة. جهّز رسومات موحدة وجدول كميات BOQ، وافحص الاستثناءات والعرض الفني قبل المقارنة المالية.',
        'للفرص الحكومية راجع بوابة الجهة المشترية ومتطلبات تسجيل الموردين. المناقصات الخاصة في بيت الريف تختلف عن المنافسات الحكومية، وقرار الترسية لصاحب الصلاحية.'
      ],
      action: 'جهّز طلب عرض سعر', href: '/request-quote',
      sourceLabel: 'وزارة المالية: منصة المشتريات الرقمية', source: 'https://mof.gov.ae/en/public-finance/government-procurement/digital-procurement-platform/'
    },
    en: {
      title: 'When is a quotation request or a tender appropriate?',
      paragraphs: [
        'An RFQ suits a defined scope and quantities. An RFI clarifies missing information, while an RFP asks for a proposed technical solution and delivery plan.',
        'An expression of interest may precede qualification; an invitation to tender sets the documents, conditions and deadlines. Share consistent drawings and a bill of quantities, then check technical proposals and exclusions before comparing prices.',
        'For government opportunities, consult the buyer’s procurement portal and supplier requirements. Private Biet Al Reef enquiries are separate from government tenders, and the authorised owner makes the award decision.'
      ],
      action: 'Prepare a quotation request', href: '/en/request-quote',
      sourceLabel: 'Ministry of Finance: Digital Procurement Platform', source: 'https://mof.gov.ae/en/public-finance/government-procurement/digital-procurement-platform/'
    }
  },
  {
    id: 'quotes',
    ar: {
      title: 'كيف تحصل على عروض أسعار قابلة للمقارنة؟',
      paragraphs: [
        'اشرح الموقع ونوع العمل وحالة المكان، وأضف المقاسات أو الكميات والصور المتاحة والمواد والموعد المناسب. للمطابخ والخزائن حدّد الأبعاد ومواضع الأبواب والأجهزة قبل اعتماد التصنيع.',
        'اطلب من كل جهة توضيح البنود المشمولة والمستثناة، والتوريد والتركيب والنقل والضريبة إن انطبقت، ومدة التنفيذ والدفعات والضمان. قد يحتاج السعر النهائي إلى معاينة فعلية.',
        'يساعدك وياك في ترتيب احتياجك والمعلومات الناقصة؛ لا يعتبر الطلب مرسلًا أو محفوظًا إلا بعد تأكيد النظام للعملية.'
      ],
      action: 'تعرف على وياك', href: '/weyaak-ai'
    },
    en: {
      title: 'How do you obtain comparable quotations?',
      paragraphs: [
        'Describe the site, work and current condition. Add available dimensions or quantities, photographs, preferred materials and timing. For a fitted kitchen or wardrobe, document dimensions, doors and appliances before approving manufacture.',
        'Ask each provider to state inclusions and exclusions, supply and installation, transport, applicable tax, delivery time, payments and warranty. A final quote may require a site visit.',
        'Weyaak can help organise your requirements and identify missing details. A request is sent or saved only when the system confirms that action.'
      ],
      action: 'Discover Weyaak', href: '/en/weyaak-ai'
    }
  },
  {
    id: 'maintenance',
    ar: {
      title: 'كيف تبدأ عند ظهور عطل في المنزل؟',
      paragraphs: [
        'صف الأعراض ومكانها ووقت ظهورها، والتقط صورًا آمنة إن أمكن. قد يكون أثر الرطوبة ناتجًا عن أكثر من سبب؛ يبدأ العلاج بفحص المختص للمصدر قبل إعادة الدهان أو التكسير.',
        'لا تلمس أسلاكًا مكشوفة أو معدات كهربائية مبللة، وأبعد الأشخاص عن موضع الخطر واتصل بالمختص. اطلب توضيح طريقة الفحص والمواد والأعمال المشمولة والاستلام والضمان.',
        'تختلف خدمات السباكة والتكييف والكهرباء والعزل والتنظيف في نطاقها؛ اختر التخصص الأقرب لاحتياجك وراجع التغطية قبل التواصل.'
      ],
      action: 'استكشف خدمات الصيانة', href: '/services/general-maintenance'
    },
    en: {
      title: 'Where should you start when something goes wrong at home?',
      paragraphs: [
        'Describe the symptoms, location and when they appeared; take photographs only if safe. Damp marks can have several causes, so a qualified professional should locate the source before repainting or opening a surface.',
        'Do not touch exposed wiring or wet electrical equipment. Keep people away from danger and contact a professional. Ask about the inspection, materials, scope, acceptance and warranty.',
        'Plumbing, air conditioning, electrical work, waterproofing and cleaning have different scopes. Choose the closest specialty and confirm coverage before contacting a provider.'
      ],
      action: 'Explore maintenance services', href: '/en/categories/general-maintenance'
    }
  },
  {
    id: 'rights-and-materials',
    ar: {
      title: 'ما الذي يحمي الطرفين عند التعاقد والتسليم؟',
      paragraphs: [
        'اتفق كتابةً على النطاق والمقاسات والمواصفات والمواد والدفعات والمدة، ووثّق أي تغيير وسعره قبل التنفيذ. حدّد حماية الموقع وإزالة المخلفات وكيفية معالجة الملاحظات.',
        'عند شراء مادة أو منتج مفصل، راجع المقاس والخامة والتوافر والنقل والتركيب وشروط الضمان والاسترجاع التي يعلنها التاجر. احتفظ بالفواتير ومحاضر الاستلام والضمانات ذات الصلة.',
        'تختلف الالتزامات باختلاف العقد وطبيعة العمل والجهة المختصة؛ راجع المختص عند وجود نزاع أو شرط يحتاج تفسيرًا قانونيًا.'
      ],
      action: 'تصفح سوق بيت الريف', href: 'https://app.bietalreef.ae/'
    },
    en: {
      title: 'What protects both parties at contract and handover?',
      paragraphs: [
        'Agree the scope, dimensions, materials, payments and schedule in writing. Document changes and their price before work, including site protection, waste removal and correction of outstanding items.',
        'When buying materials or a made-to-measure product, check dimensions, material, availability, transport, installation, and the seller’s actual warranty and return terms. Keep invoices, handover records and relevant warranties.',
        'Obligations depend on the agreement, type of work and competent authority. Seek qualified advice if a dispute or clause requires legal interpretation.'
      ],
      action: 'Explore Biet Al Reef Market', href: 'https://app.bietalreef.ae/en'
    }
  }
];

function KnowledgeTopic({ topic, locale }) {
  const item = topic[locale];
  const external = item.href.startsWith('https://');
  return <article className={styles.topic}>
    <div className={styles.image}><DirectoryResponsiveImage asset={UAE_KNOWLEDGE_ASSETS[topic.id]} locale={locale} kind="knowledge" /></div>
    <div className={styles.body}>
      <h3>{item.title}</h3>
      <p className={styles.summary}>{item.paragraphs[0]}</p>
      <div className={styles.actions}>
        <DirectoryReadingDialog title={item.title} locale={locale}>
          {item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <p>{external ? <a href={item.href}>{item.action}</a> : <Link href={item.href}>{item.action}</Link>}</p>
          {item.source && <p><a href={item.source} target="_blank" rel="noopener noreferrer">{item.sourceLabel}</a></p>}
          {item.extraSource && <p><a href={item.extraSource} target="_blank" rel="noopener noreferrer">{item.extraSourceLabel}</a></p>}
        </DirectoryReadingDialog>
        {external ? <a href={item.href}>{item.action}</a> : <Link href={item.href}>{item.action}</Link>}
      </div>
    </div>
  </article>;
}

export default function DirectoryKnowledge({ locale = 'ar' }) {
  return <section id="guide" className={styles.guide} aria-label={locale === 'en' ? 'Construction and service guide' : 'دليل البناء والخدمات'}>
    <div className={styles.heading}><span>{locale === 'en' ? 'KNOW BEFORE YOU CHOOSE' : 'اعرف قبل أن تختار'}</span><h2>{locale === 'en' ? 'A clearer path from question to action' : 'من السؤال إلى خطوة واضحة'}</h2><p>{locale === 'en' ? 'Practical guidance for your project, with a path to the right service or official source.' : 'معلومات عملية لمشروعك، وروابط توصلك للتخصص أو المصدر الرسمي المناسب.'}</p></div>
    <div className={styles.grid}>{topics.map((topic) => <KnowledgeTopic key={topic.id} topic={topic} locale={locale} />)}</div>
    <p className={styles.reviewed}>{locale === 'en' ? 'Official links reviewed: 3 November 2026.' : 'مراجعة الروابط الرسمية: 3 نوفمبر 2026.'}</p>
  </section>;
}
