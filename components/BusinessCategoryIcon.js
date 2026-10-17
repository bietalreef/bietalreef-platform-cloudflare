import { Building2, Wrench, Sofa, Sparkles, Paintbrush, Lightbulb, Droplets, Wind, Trees, Layers, Hammer, Package, Factory, Ruler, Truck, Camera, PanelsTopLeft, Armchair, Drill } from 'lucide-react';
const icons = {
  'general-contracting': Building2, 'general-maintenance': Wrench, 'cleaning-services': Sparkles,
  'interior-design': Sofa, 'finishing-works': Paintbrush, electrical: Lightbulb,
  plumbing: Droplets, 'ac-technicians': Wind, landscaping: Trees,
  'marble-ceramic': Layers, 'carpentry-doors': Hammer, 'building-materials': Package,
  'engineering-consultants': Ruler, carpentry: Hammer, 'furniture-decor': Armchair, 'aluminium-glass': PanelsTopLeft, 'smart-systems': Camera, 'equipment-rental': Drill, 'transport-logistics': Truck,
  factories: Factory, workshops: Factory, 'engineering-consulting': Ruler,
};
export default function BusinessCategoryIcon({ category, className = '' }) {
  const Icon = icons[category] || Layers;
  return <Icon className={className} aria-hidden="true" strokeWidth={1.6} />;
}
