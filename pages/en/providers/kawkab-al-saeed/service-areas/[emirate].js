import KawkabEmiratePage from '../../../../../components/provider/KawkabEmiratePage';
import { KAWKAB_COVERAGE } from '../../../../../lib/kawkabPresence';
export default function Page({emirate}) {return <KawkabEmiratePage locale="en" emirate={emirate}/>;}
export async function getStaticPaths(){
 return {paths:KAWKAB_COVERAGE.map(area=>({params:{emirate:area.slug}})),fallback:false};
}
export async function getStaticProps({params}){
 if(!KAWKAB_COVERAGE.some(area=>area.slug===params.emirate))return {notFound:true};
 return {props:{emirate:params.emirate}};
}
