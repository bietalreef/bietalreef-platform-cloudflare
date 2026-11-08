// Read offer terms already stored on an approved platform card; never invent them.
function publishedOffer(content={}, expiresAt=null) {
  const percent=Number(content.discount_percent);
  const rawCode=content.offer_code ?? content.coupon_code ?? content.details?.offer_code;
  const code=typeof rawCode==='string'&&rawCode.trim()&&rawCode.trim().length<=40?rawCode.trim():null;
  const expiry=typeof expiresAt==='string'&&!Number.isNaN(Date.parse(expiresAt))?expiresAt:null;
  return {discountPercent:Number.isFinite(percent)&&percent>0&&percent<=100?percent:null,code,expiresAt:expiry};
}
module.exports={publishedOffer};
