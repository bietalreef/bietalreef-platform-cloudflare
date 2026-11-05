// English reading copy follows the same sector subjects as the Arabic guide.
const section = (heading, text) => [{ type: 'heading', text: heading }, { type: 'paragraph', text }];

export const UAE_SECTOR_GUIDES_EN = {
  'general-contracting': [
    ...section('Choosing a contractor', 'Define the project, drawings, specifications and responsibilities first. Villas, commercial buildings, extensions and infrastructure have different technical and approval requirements.'),
    ...section('Types of contractor', 'A general contractor manages a broad agreed scope; structural, finishing and specialist contractors carry out defined parts. Subcontractor responsibilities must be clear in the contract.'),
    ...section('Comparing companies and quotations', 'Check the licence, permitted activity, relevant experience, team and availability. Compare materials, quantities, exclusions, warranties, programme and payment terms; the lowest initial amount is not automatically the best offer.'),
    ...section('Contracts and permits', 'Record the scope, drawings, bill of quantities, changes, inspections and handover in writing. Confirm who arranges permits, procurement, site protection and waste removal with the authority responsible for the project.'),
    ...section('Starting and handing over', 'Prepare the land documents and owner requirements, appoint the right consultant, obtain applicable approvals and issue consistent documents for pricing. Keep approved plans, change records, payment details and handover reports.'),
    ...section('Common questions', 'Structural work and turnkey delivery have different scopes: check the contract. Verify a contractor through the relevant licensing authority and obtain comparable quotations from the actual plans rather than relying on one generic price per metre.'),
  ],
  'interior-design': [
    ...section('Engineering, design and decor', 'An engineering office may provide licensed design and supervision services; an interior designer focuses on the use and appearance of spaces. Confirm the qualifications and responsibilities required for your project.'),
    ...section('Design and construction drawings', 'Your project may need architectural, structural, mechanical, electrical and interior drawings. Detailed dimensions, materials and installation information help contractors price and execute the agreed design.'),
    ...section('BIM and digital design', 'BIM and 2D or 3D views can help coordinate disciplines and identify conflicts. Digital models support professional review; they do not replace official approvals or qualified supervision.'),
    ...section('Comparing consultants', 'Check licensing and classification where required, relevant work, deliverables, revisions, site visits, schedule, fees and responsibilities. Ask whether approvals and supervision are included.'),
    ...section('Common questions', 'A visual rendering alone is not a complete construction drawing. Agree the scope and ownership of deliverables, and check which consultants and approvals your project actually requires.'),
  ],
  'general-maintenance': [
    ...section('Choosing maintenance or finishing work', 'Describe the symptoms, location and condition. A qualified inspection can identify the cause before repairs, painting or demolition are agreed.'),
    ...section('Electrical, plumbing and AC', 'Electrical faults require safe isolation and a qualified technician. For leaks, locate the source before restoring finishes. For cooling problems, review the equipment, ventilation, maintenance and any necessary replacement parts.'),
    ...section('Waterproofing, painting and renovation', 'Check the surface and source of damp before selecting waterproofing or paint. Routine maintenance, repairs and a wider renovation have different scopes and may require different approvals.'),
    ...section('A clear quotation', 'Provide photos and dimensions and request the diagnosis, labour, materials, parts, access, timing, waste removal and warranty in writing. Confirm any building-management or authority requirements.'),
    ...section('Common questions', 'A photograph can help describe a fault, but some problems require a visit. Compare the same tasks and materials, and clarify inspection charges and exclusions before booking.'),
  ],
  'building-materials': [
    ...section('Choosing materials and suppliers', 'Start with the approved specifications, quantities, project location and delivery schedule. Structural and finishing materials have different performance and storage requirements.'),
    ...section('Structural and waterproofing materials', 'Review the required grades and documentation for structural products. Select insulation or waterproofing for the actual exposure, surface and installation method.'),
    ...section('Floors, finishes and paint', 'Compare tiles, stone, flooring and paint against the intended use, dimensions, finish and care requirements. Request samples and confirm the specified product before ordering.'),
    ...section('Comparing supply offers', 'Check brand or technical specification, quantity, tax where applicable, transport, unloading, lead time, warranty and returns. Large projects may need a phased delivery plan and documented inspection.'),
    ...section('Common questions', 'The cheapest item is not necessarily equivalent. Confirm compatibility and total delivered cost, and check how damaged or nonconforming materials will be handled.'),
  ],
  'aluminium-glass': [
    ...section('Choosing a workshop', 'Define the item, its dimensions and installation location, then check the workshop’s relevant experience and the materials it actually offers.'),
    ...section('Metal, aluminium, glass and wood', 'Metal workshops may fabricate gates, railings and structures; aluminium and glass work may include doors, windows and facades; joinery covers made-to-measure woodwork. Confirm the required finish and fittings.'),
    ...section('Drawings and measurements', 'Approve site measurements, workshop drawings, openings, materials, hardware and tolerances before manufacture. Check who is responsible for measurement and site preparation.'),
    ...section('Quotes and handover', 'Compare fabrication, finishes, transport, installation, timing and warranty. At handover inspect dimensions, operation, fixing, finish and any agreed safety details.'),
    ...section('Common questions', 'A photo alone does not confirm measurements or material quality. Ask for drawings and samples, and record any corrections and their agreed completion date.'),
  ],
  'furniture-decor': [
    ...section('Furniture and fit-out', 'Choose furniture for the room, its dimensions, use and access. Consider circulation, materials, durability and the care instructions for the actual product.'),
    ...section('Homes, majlis and furnishings', 'Compare seating, upholstery, curtains, rugs and lighting against the size and use of the space. Review fabric samples and cleaning instructions before ordering.'),
    ...section('Ready-made or made-to-measure', 'Ready-made and custom furniture each have advantages. For custom pieces, approve measurements, drawings, materials, hardware and manufacturing lead time before work starts.'),
    ...section('Offices and shops', 'Consider the layout, storage, operations and installation requirements of the premises. Check applicable building or activity requirements before changing a commercial space.'),
    ...section('Comparing offers and delivery', 'Clarify transport, installation, warranty, changes and return terms. A 3D view helps visualise the design but does not replace dimensions or manufacturing details.'),
  ],
  'equipment-rental': [
    ...section('Factories, suppliers and equipment', 'Decide whether you need a ready product, custom manufacture, recurring supply or equipment for a defined period. Give the supplier clear specifications and quantities.'),
    ...section('Manufacturing and supply', 'Agree drawings, samples, tolerances, tests and acceptance criteria for custom products. Compare capacity, lead time, minimum orders, transport and treatment of nonconforming goods.'),
    ...section('Equipment rental', 'Describe the work, required capacity, load, site, duration and access. Choose a suitable machine rather than assuming the largest is best, and check applicable safety and permit requirements.'),
    ...section('Operator, maintenance and costs', 'Clarify whether an operator, fuel, transport, insurance, maintenance and standby time are included. Compare operating hours, breakdown replacement, extensions and loading charges.'),
    ...section('Common questions', 'Buying versus renting depends on frequency, duration and operating costs. A manufacturer and a supplier may have different roles; confirm the contract and delivery responsibilities.'),
  ],
  'cleaning-services': [
    ...section('Choosing a cleaning service', 'Describe the property, condition, materials and result required. Regular, deep, post-construction and specialist cleaning have different scopes and equipment.'),
    ...section('Homes, villas and deep cleaning', 'Specify floors, rooms, bathrooms, kitchens, windows and whether furniture, cupboards or appliances are included. Check the products and equipment proposed for sensitive surfaces.'),
    ...section('Sofas, carpets and majlis', 'Provide the fabric type, condition, number of seats or item dimensions and any stains. Ask about the method, location of cleaning and drying time; complete stain removal cannot be guaranteed.'),
    ...section('After construction and specialist work', 'Identify remaining dust and materials and whether the contractors have finished. Water tanks, pools, tents and outdoor spaces need their own methods and may require specialist providers.'),
    ...section('Cleaning, disinfection and pest control', 'These are different services. Disinfection uses appropriate products and procedures; pest control requires suitable expertise and compliance with local requirements. Confirm the exact service offered.'),
    ...section('Comparing quotes', 'Ask what work, equipment, supplies, transport, timing and applicable tax are included. Compare like-for-like scope and confirm whether upholstery or other extras are covered.'),
  ],
};
