/**
 * Lightweight, locale-neutral architectural illustrations for the UAE directory.
 * No lettering is baked into the artwork: Arabic and English are rendered as HTML.
 * Vector viewBox preserves the entire composition on desktop and mobile.
 */
const palettes = {
  'abu-dhabi': {sky:'#E4E9F2',haze:'#F6E7D1',land:'#DFD0B7',water:'#B9C7D6'},
  dubai: {sky:'#DFE9F5',haze:'#F3E9DA',land:'#DFC7AE',water:'#BDC9D8'},
  sharjah: {sky:'#E6EAF0',haze:'#FAEBD9',land:'#DCC7AD',water:'#C2D0DA'},
  ajman: {sky:'#E5EBF3',haze:'#F7E8D3',land:'#E6CFA9',water:'#BECCD7'},
  'ras-al-khaimah': {sky:'#E2E9F1',haze:'#F2E6D8',land:'#BFAE9B',water:'#CCD6DB'},
  fujairah: {sky:'#E5EAF3',haze:'#F7E9D6',land:'#D0B8A3',water:'#BFCBD4'},
  'umm-al-quwain': {sky:'#E5EBF2',haze:'#F8ECD9',land:'#D9BEA0',water:'#C7D7DC'}
};
function Palm({x,y=320,scale=1}) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} stroke="#87755E" strokeWidth="7" strokeLinecap="round" fill="none"><path d="M0 0 Q-7 -38 6 -90"/><path d="M6 -90 Q-25 -107 -57 -90 M6 -90 Q40 -116 70 -95 M6 -90 Q-10 -126 -12 -140 M6 -90 Q35 -80 57 -65 M6 -90 Q-35 -87 -60 -63" strokeWidth="6"/></g>
}
function Building({x,y,w,h,roof=0,accent=false}) {
  return <g><path d={`M${x} ${y+h} V${y+roof} L${x+w/2} ${y} L${x+w} ${y+roof} V${y+h} Z`} fill={accent?'#A99B8A':'#53677D'} /><path d={`M${x+w/2} ${y+10} V${y+h}`} stroke="#F0DFC2" strokeOpacity=".55" strokeWidth="3"/>{Array.from({length:3},(_,i)=><path key={i} d={`M${x+13} ${y+roof+26+i*31} h${Math.max(8,w-27)}`} stroke="#EBDFC7" strokeOpacity=".65" strokeWidth="5" />)}</g>
}
function EmirateBuildings({slug}) {
  switch(slug) {
    case 'abu-dhabi': return <g>
      <Building x={155} y={154} w={68} h={188} roof={29}/><Building x={232} y={120} w={75} h={222} roof={25}/><Building x={319} y={175} w={62} h={167} roof={28}/><Building x={399} y={109} w={72} h={233} roof={17}/><Building x={480} y={165} w={76} h={177} roof={23}/>
      <path d="M570 342v-59h135v59z" fill="#E8D9BB"/><path d="M587 281 Q638 222 689 281 Z" fill="#D7BC87"/><path d="M624 239h29v-40h-29z" fill="#F9EFE0"/><path d="M635 198v-40" stroke="#C7A45B" strokeWidth="7"/><path d="M571 280h11v-90h8v90M702 280h10v-90h7v90" stroke="#D7BC87" strokeWidth="8" fill="none"/>
    </g>;
    case 'dubai': return <g>
      <Building x={120} y={214} w={78} h={133} roof={24}/><Building x={206} y={172} w={66} h={175} roof={19}/>
      <path d="M353 347V295h24v-67h20v-65h16v-61h14V57h11v45h13v61h16v65h20v67h24v52Z" fill="#34495F"/>
      <path d="M437 55V24" stroke="#34495F" strokeWidth="7"/><path d="M410 164h55M397 229h81M382 293h112" stroke="#D9B779" strokeWidth="5"/>
      <Building x={515} y={176} w={68} h={171} roof={12}/><Building x={601} y={209} w={84} h={138} roof={25}/><Building x={696} y={240} w={66} h={107} roof={17}/>
    </g>;
    case 'sharjah': return <g>
      <path d="M150 344V263h570v81Z" fill="#E7D6BC"/><path d="M271 262v-54h317v54" fill="#C1A27C"/>
      <path d="M337 207 Q427 90 520 207 Z" fill="#D5B785"/><path d="M407 119v-31M422 88V72" stroke="#C7A45B" strokeWidth="8"/>
      {[233,624].map(x=><g key={x}><path d={`M${x} 344V128h30v216Z`} fill="#A28C72"/><path d={`M${x-8} 128Q${x+15} 87 ${x+38} 128Z`} fill="#D7BD8C"/><path d={`M${x+15} 100V77`} stroke="#BDA176" strokeWidth="5"/></g>)}
      {[313,380,454,520].map(x=><path key={x} d={`M${x} 306V254a22 22 0 0 1 44 0v52Z`} fill="#68788B"/>)}
      <path d="M115 350Q320 337 560 351T860 350" stroke="#FFF" strokeWidth="7" fill="none" opacity=".65"/>
    </g>;
    case 'ajman': return <g>
      <path d="M125 342V215h500v127Z" fill="#C9AA85"/><path d="M139 215v-42h73v42m22 0v-42h75v42m22 0v-42h76v42m20 0v-42h75v42m20 0v-42h75v42" fill="#C9AA85" stroke="#AA8968" strokeWidth="6"/>
      <path d="M357 342v-66a52 52 0 0 1 104 0v66Z" fill="#576C7E"/><path d="M372 342v-55a37 37 0 0 1 74 0v55Z" fill="#8294A1"/>
      <path d="M630 341v-178h53v178Z" fill="#E6D2AB"/><path d="M622 161v-25h70v25Z" fill="#D0B58B"/><path d="M636 135v-21h42v21Z" fill="#D0B58B"/><path d="M650 344v-60" stroke="#7B8A92" strokeWidth="16"/><Palm x={93} y={349} scale={.77}/><Palm x={737} y={352} scale={.72}/>
    </g>;
    case 'ras-al-khaimah': return <g>
      <path d="M55 344 168 182 230 250 325 94 442 245 546 160 708 341Z" fill="#B6A99C"/>
      <path d="m222 342 103-248 117 151 104-85 162 181Z" fill="#8E9297"/>
      <path d="m277 191 48-97 49 64-40-17Z" fill="#F5EBDF" opacity=".83"/><path d="m480 251 66-91 54 60-55-22Z" fill="#DAD9D3"/>
      <path d="M118 348h610" stroke="#AD9677" strokeWidth="13"/>
      <path d="M500 343v-56h150v56Z" fill="#D6BE9B"/><path d="M537 288v-34h41v34Z" fill="#D6BE9B"/><path d="M545 252v-20h26v20Z" fill="#D6BE9B"/>
    </g>;
    case 'fujairah': return <g>
      <path d="M30 344 162 194 242 252 343 123 474 256 585 180 826 345Z" fill="#B4A69C"/>
      <path d="M128 344 342 123 474 256 584 180 787 344Z" fill="#928E91"/>
      <path d="m319 147 24-24 22 33-24-9Z" fill="#DDD3C9"/>
      <path d="M245 342V242h390v100Z" fill="#D6B994"/><path d="M248 257h385" stroke="#FFF0D9" strokeWidth="10"/>
      {[268,562].map(x=><g key={x}><rect x={x} y="201" width="46" height="141" fill="#C4A47C"/><path d={`M${x-6} 202v-24h58v24Z`} fill="#B78F67"/></g>)}
      <path d="M399 342v-73a38 38 0 0 1 76 0v73Z" fill="#6B7181"/>
    </g>;
    case 'umm-al-quwain': return <g>
      <path d="M95 343V247h615v96Z" fill="#DEC3A1"/><path d="M110 252v-30h105v30m19 0v-30h105v30m19 0v-30h105v30m19 0v-30h105v30" fill="#DEC3A1" stroke="#B99D78" strokeWidth="5"/>
      <path d="M435 342v-66a38 38 0 0 1 76 0v66Z" fill="#6D8091"/>
      <path d="M149 243v-74h65v74Z" fill="#C2A27C"/><path d="M138 169v-22h85v22Z" fill="#C2A27C"/><path d="M168 143v-26h29v26Z" fill="#C2A27C"/>
      <Palm x={86} y={340} scale={.88}/><Palm x={747} y={340} scale={.9}/>
    </g>;
    default:return <g><Building x={210} y={175} w={110} h={165}/><Building x={354} y={115} w={85} h={225}/><Building x={480} y={184} w={130} h={156}/></g>;
  }
}
export default function EmirateVisual({slug='abu-dhabi',className=''}) {
 const p=palettes[slug]||palettes['abu-dhabi'];
 const uid=`emirate-visual-${slug}`;
 return <svg className={className} viewBox="0 0 880 480" width="880" height="480" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
   <defs>
     <linearGradient id={`${uid}-sky`} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={p.sky}/><stop offset="100%" stopColor={p.haze}/></linearGradient>
     <linearGradient id={`${uid}-shore`} x1="0" x2="1" y1="0" y2=".4"><stop offset="0%" stopColor={p.water}/><stop offset="100%" stopColor="#DCE1E4"/></linearGradient>
   </defs>
   <rect width="880" height="480" fill={`url(#${uid}-sky)`}/>
   <circle cx="710" cy="100" r="56" fill="#FFFFFF" opacity=".55"/><circle cx="710" cy="100" r="39" fill="#F9F1DA"/>
   <path d="M0 343 Q210 327 420 337 T880 333 V480 H0Z" fill={p.land}/>
   <g opacity=".18" stroke="#FFFFFF" strokeWidth="2">{Array.from({length:6},(_,i)=><path key={i} d={`M0 ${110+i*32} Q450 ${130+i*24} 880 ${110+i*32}`} fill="none"/>)}</g>
   <EmirateBuildings slug={slug}/>
   <path d="M0 344 Q200 350 470 342 T880 344 V480 H0Z" fill={`url(#${uid}-shore)`}/>
   <path d="M0 390 Q205 381 440 392 T880 390 M0 436 Q230 424 480 432 T880 429" stroke="#FFF" opacity=".38" strokeWidth="5" fill="none"/>
   <path d="M0 346H880" stroke="#FFFFFF" strokeOpacity=".4" strokeWidth="4"/>
 </svg>;
}
