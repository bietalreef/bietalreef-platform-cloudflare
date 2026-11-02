/**
 * Public, non-persistent domain validators for Weyaak review cards.
 * These are NOT RPC tools. They neither submit nor read user accounts.
 * Labels are user-facing and should be localized before English rollout.
 */
const common = [
 {key:'emirate',label:'الإمارة',kind:'location'},
 {key:'city',label:'المدينة',kind:'location'},
 {key:'scope',label:'وصف المطلوب',kind:'text'},
 {key:'timeline',label:'الموعد المطلوب',kind:'text'}
];
export const RFQ_TEMPLATES = Object.freeze({
 water_leakage: {
  label:'كشف تسربات المياه',
  fields:[...common,{key:'symptoms',label:'ما الأعراض ومتى تظهر؟',kind:'text'},{key:'wet_area',label:'موضع الرطوبة أو التسرب',kind:'text'},{key:'usage_dependency',label:'هل تظهر عند استخدام الماء؟',kind:'text'},{key:'inspection_required',label:'هل توجد نتيجة فحص سابقة؟',kind:'text'}],
  optional:['photos','property_type','previous_repairs','electrical_risk','access_notes']
 },
 custom_kitchen:{
  label:'مطبخ حسب المقاس',
  fields:[...common,{key:'wall_dimensions',label:'أطوال الجدران وارتفاع السقف (تقريبية)',kind:'dimensions'},{key:'layout',label:'التوزيع المطلوب',kind:'text'},{key:'board_material',label:'الخامة المطلوبة أو المفضلة',kind:'text'},{key:'supply_install',label:'توريد وتركيب أم توريد فقط؟',kind:'choice'}],
  optional:['product_id','merchant_id','design_attachment','appliances','hardware','countertop','final_site_measurement']
 },
 ac_service:{
  label:'صيانة مكيف',
  fields:[...common,{key:'ac_type',label:'نوع المكيف',kind:'text'},{key:'issue',label:'العطل الملحوظ',kind:'text'},{key:'unit_count',label:'عدد الوحدات',kind:'integer'}],
  optional:['capacity','model','symptom_started_at','photos','drainage']
 },
 painting:{
  label:'أعمال الدهانات',
  fields:[...common,{key:'surfaces',label:'نوع الأسطح',kind:'text'},{key:'area_estimate',label:'المساحة التقديرية',kind:'dimensions'},{key:'surface_condition',label:'حالة السطح والرطوبة',kind:'text'}],
  optional:['primer','paint_brand','layers','protection','scaffolding','photos']
 },
 construction:{
  label:'مقاولات إنشاء أو ترميم',
  fields:[...common,{key:'building_type',label:'نوع المبنى',kind:'text'},{key:'project_stage',label:'مرحلة المشروع',kind:'text'},{key:'drawings_status',label:'حالة المخططات والتصاريح',kind:'text'}],
  optional:['BOQ','drawings','permissions','consultant','budget','site_visit']
 },
 materials:{
  label:'توريد مواد بناء',
  fields:[...common,{key:'material_specification',label:'المادة والمواصفة',kind:'text'},{key:'quantity',label:'الكمية ووحدة القياس',kind:'text'},{key:'supply_install',label:'توريد فقط أم مع تركيب؟',kind:'choice'}],
  optional:['delivery_address','unloading','certificates','return_policy','brand','lead_time']
 }
});

const meaning = x => typeof x==='string'?x.trim():x;
export function reviewQuoteDraft(category,draft={}){
 const t=RFQ_TEMPLATES[category]; if(!t)return {ready:false,reason:'UNKNOWN_CATEGORY',missing:[],draft:{}};
 const missing=t.fields.filter(f=>!meaning(draft[f.key]) && meaning(draft[f.key])!==0)
  .map(f=>({key:f.key,label:f.label}));
 const hasProductLink=Boolean(draft.product_id);
 return {ready:missing.length===0,reason:missing.length?'MISSING_FIELDS':'READY_FOR_USER_CONFIRMATION',missing,
  category,hasProductLink,writePerformed:false,
  note:missing.length?'أكمل البيانات الضرورية فقط.':'تجهيز للمراجعة فقط؛ التسجيل يحتاج موافقة واستجابة RPC صحيحة.'};
}

/** Compare published bidder proposals only after upstream ACL verifies request ownership. */
export function compareBidsForOwner(bids,expectedItems=[]){
 if(!Array.isArray(bids)||!Array.isArray(expectedItems))throw Error('INVALID_INPUT');
 const ids=new Set(expectedItems.map(x=>x.code));
 return bids.map(b=>{
   const lines=Array.isArray(b.lines)?b.lines:[];
   const provided=new Set(lines.map(x=>x.code));
   const missing=[...ids].filter(id=>!provided.has(id));
   const exclusions=Array.isArray(b.exclusions)?b.exclusions:[];
   const mismatched=lines.filter(x=>ids.has(x.code) && x.specification_matched===false).map(x=>x.code);
   const total=(typeof b.total_amount==='number'&&Number.isFinite(b.total_amount))?b.total_amount:null;
   return {bidRef:b.id||null,total,missingItems:missing,mismatchedItems:mismatched,exclusions,
     comparable:missing.length===0&&mismatched.length===0&&total!==null,
     flags:[...(missing.length?['بنود غير مسعّرة']:[]),...(mismatched.length?['مواصفات غير مطابقة']:[]),...(exclusions.length?['استثناءات تحتاج مراجعة']:[]),...(total===null?['السعر غير مؤكد']:[])]};
 });
}
