// Existing platform_services taxonomy supplies service names; these are practical scope questions, not claims about suppliers.
const tips = {
 'general-contracting': {
  ar:['أرفق المخططات والأبعاد وحدد الأعمال الإنشائية والتشطيبات والتغييرات في المبنى القائم إن وجدت.','اطلب جدول كميات ومواصفات ومدة تنفيذ ودفعات مرتبطة بمراحل واضحة، وراجع التصاريح المطلوبة مع الاستشاري.'],
  en:['Provide drawings, dimensions, structural scope and any work to an existing building.','Ask for measurable quantities, specifications, programme, milestone payments and applicable permits checked with your consultant.']
 },
 'interior-design': {
  ar:['حدد مساحة المشروع والاستخدام وأسلوب التصميم والميزانية والمخرجات المطلوبة من المصمم.','اتفق على عدد التعديلات والمقاسات والرسومات التنفيذية وتنسيق الإضاءة والتكييف والخامات والإشراف إن وجد.'],
  en:['Define the space, intended use, design style, budget and expected design deliverables.','Agree the revisions, measured drawings, lighting and AC coordination, materials and any supervision.']
 },
 'general-maintenance': {
  ar:['اشرح العطل ومكانه وتاريخه وأرفق صورًا آمنة، واطلب تحديد السبب قبل إعادة التشطيب.','افصل تكلفة الفحص والعمل والمواد وقطع الغيار، واتفق على اختبارات التشغيل والضمان والاستثناءات.'],
  en:['Describe the fault, its location and history, and provide photographs if safe. Diagnose the cause before cosmetic reinstatement.','Separate inspection, labour, parts and materials and agree testing, warranty and exclusions.']
 },
 'building-materials': {
  ar:['حدد المنتج والمواصفة والكمية ووحدة القياس وهل المطلوب توريدًا أم توريدًا وتركيبًا.','قارن توافق الخامة مع المخططات ورسوم النقل والتفريغ والمدة والاسترجاع، وليس ثمن الوحدة وحده.'],
  en:['Specify the product grade, quantity and unit, and whether you need supply only or installation too.','Compare material suitability, delivery, unloading, timing and returns as well as unit price.']
 },
 'aluminium-glass': {
  ar:['أرسل صور الفتحات والمقاسات المبدئية وحدد نوع الخامات والزجاج والإكسسوارات واتجاه الفتح.','اتفق على القياس النهائي والرسم والعينة ونظام التثبيت والتشطيب وموعد التركيب والضمان.'],
  en:['Provide photographs, preliminary dimensions, materials, glass specification, hardware and opening direction.','Agree final measuring responsibility, shop drawings, fixings, samples, installation and warranty.']
 },
 'furniture-decor': {
  ar:['حدد عدد القطع ومقاسات الغرفة ومسار الدخول والقماش أو الخشب والتشطيب المناسب للاستخدام.','راجع عينات الخامات والتوصيل والتركيب ومدة التصنيع والتعديل والضمان قبل طلب التفصيل.'],
  en:['Specify quantities, room and access measurements, fabric or timber and practical finish requirements.','Review samples, delivery, installation, fabrication time, alterations and warranty before ordering.']
 },
 'equipment-rental': {
  ar:['حدد المهمة وقدرة المعدة والحمولة والارتفاع ومدة الاستخدام وإمكانية الوصول إلى الموقع.','افصل الإيجار عن النقل والمشغل والوقود والتأمين والصيانة وإجراءات السلامة والتسليم.'],
  en:['Describe the task, rated capacity, height, hire duration and site access.','Separate equipment hire, transport, operator, fuel, insurance and servicing and agree safe handover.']
 },
 'cleaning-services': {
  ar:['وضح مساحة العقار أو عدد القطع ونوع الخامة والحالة والموعد المناسب للدخول.','اسأل عن المواد والمعدات وحماية الأسطح والتجفيف والاستثناءات وتأكد من تغطية موقعك قبل الحجز.'],
  en:['State property area or item count, materials, condition and access times.','Check products, equipment, surface protection, drying, exclusions and district coverage before booking.']
 }
};
const intent = {
 'general-contracting':['شركة','construction companies'],
 'interior-design':['شركات','design and consultancy companies'],
 'general-maintenance':['شركة','maintenance companies'],
 'building-materials':['شركات','material suppliers'],
 'aluminium-glass':['ورش','specialist workshops'],
 'furniture-decor':['شركات','furnishing companies'],
 'equipment-rental':['شركات','equipment and industrial suppliers'],
 'cleaning-services':['شركة','cleaning companies']
};
export function directoryServiceTitle(sector,name,place,locale='ar'){
 return locale==='en' ? name+' in '+place+' | '+(intent[sector]?.[1]||'service providers') : (intent[sector]?.[0]||'شركات')+' '+name+' في '+place;
}
export function directoryServiceCopy({sector,name,place,locale='ar',guide,description}){
 const lead=(guide||description||'').trim();
 const prompt=locale==='en' ? 'For '+name.toLowerCase()+' in '+place+', prepare the project details before requesting quotations.' : 'عند طلب '+name+' في '+place+'، جهز تفاصيل الموقع ونطاق العمل للمقارنة بين عروض الأسعار.';
 return [lead,prompt,...(tips[sector]?.[locale]||[])].filter(Boolean).join(' ');
}