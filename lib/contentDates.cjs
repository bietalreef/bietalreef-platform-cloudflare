// Use stored modification times only. Never invent a new date at request time.
function latestContentDate(...values) {
  const dates=values.flat(Infinity).filter(value=>typeof value==='string'&&Number.isFinite(Date.parse(value))).map(value=>new Date(value).toISOString());
  return dates.length ? dates.sort().at(-1) : null;
}
module.exports={latestContentDate};
