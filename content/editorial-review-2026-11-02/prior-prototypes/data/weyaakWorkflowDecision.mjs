/** Pure workflow selection, no writes or private data reads. */
export function suggestWeyaakWorkflow({intent='',multiBid=false,scopeDocumented=false,productId=null,service=null}={}) {
 const requested=String(intent).trim().toLowerCase();
 if(requested==='tender'||(multiBid&&scopeDocumented)) return {kind:'tender_draft',requiresAuthentication:true,writesData:false,next:'verify_owner_permissions_and_get_existing_tender_form',entityId:null};
 if(requested==='rfi') return {kind:'technical_clarification',requiresAuthentication:true,writesData:false,next:'verify_tender_membership_before_read_or_reply',entityId:null};
 if(requested==='product_purchase'&&productId) return {kind:'product_detail',requiresAuthentication:false,writesData:false,next:'load_published_product_by_id',entityId:productId};
 if(requested==='quote_request'||requested==='custom_product'||Boolean(service)||Boolean(productId))return {kind:'quote_intake',requiresAuthentication:false,writesData:false,next:'gather_only_missing_service_specific_requirements',entityId:productId};
 return {kind:'knowledge_and_discovery',requiresAuthentication:false,writesData:false,next:'read_verified_editorial_and_live_published_entities',entityId:null};
}
