import { House, Sparkles, PaintRoller, Sofa, AirVent, Droplets, PlugZap, Paintbrush, Building2, BrickWall, DoorOpen, ClipboardCheck } from 'lucide-react';
const icons = { homes: House, deep: Sparkles, 'after-building': PaintRoller, upholstery: Sofa, ac: AirVent, plumbing: Droplets, electrical: PlugZap, finishes: Paintbrush, villa: Building2, shell: BrickWall, extension: DoorOpen, handover: ClipboardCheck };
export default function WorkTypeIcon({ type }) {
  const Icon = icons[type] || ClipboardCheck;
  return <Icon aria-hidden="true" strokeWidth={1.65}/>;
}
