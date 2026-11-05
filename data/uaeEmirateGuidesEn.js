// English guides cover the same local questions as the supplied Arabic card copy.
const section = (heading, ...paragraphs) => [
  { type: 'heading', text: heading },
  ...paragraphs.map(text => ({ type: 'paragraph', text })),
];
const question = (heading, text) => [
  { type: 'subheading', text: heading }, { type: 'paragraph', text },
];

export const UAE_EMIRATE_GUIDES_EN = {
  'abu-dhabi': {
    summary: 'Find contractors, maintenance, cleaning and design companies, workshops and suppliers in Abu Dhabi City, Al Ain and Al Dhafra.',
    blocks: [
      ...section('Finding services across Abu Dhabi', 'Projects range from a new villa in Al Ain to a home renovation in Abu Dhabi City or a commercial project in Al Dhafra. Start with the location, specialty and scope, then review the businesses that actually serve the area.'),
      ...section('Choosing a contractor', 'Define whether you need structural work, an extension, finishing or a specialist trade. Check the economic licence, permitted activity and any classification required for the work.', 'Review the drawings, quantities, materials, schedule, payment terms and warranties. Ask which work the contractor undertakes directly and which is assigned to subcontractors.'),
      ...section('Maintenance and finishing', 'Electrical, plumbing, air-conditioning, painting, waterproofing and leak repairs require different skills. Identify the source of a problem before agreeing a repair; ask about inspection charges, parts, timing and warranty, and document the condition before and after the work.'),
      ...section('Cleaning, design and supply', 'Villa, upholstery and post-construction cleaning need different equipment and methods. For interiors, approve measurements and technical drawings before making kitchens, cupboards or doors. For supplies, confirm specifications, quantities, delivery and installation.'),
      ...section('Location and quotations', 'Choose Abu Dhabi City, Al Ain or Al Dhafra and then the relevant area and specialty. A company may cover a city without having an office there, so confirm availability.', 'Share the site, scope, dimensions, photos and drawings. Compare quotations on the same basis, including materials, exclusions, schedule, payments and warranty.'),
      ...section('Common questions'),
      ...question('Can a company serve both Abu Dhabi City and Al Ain?', 'Check its published coverage and confirm that it can reach your project.'),
      ...question('Does a listing mean municipal approval?', 'No. Check the licence, classification and any required approvals with the relevant authority.'),
      ...question('Are villa procedures identical in Abu Dhabi City and Al Ain?', 'Both are in Abu Dhabi Emirate, but the land, project and applicable municipal service affect the application. Confirm the requirements for your project.'),
    ],
  },
  dubai: {
    summary: 'Explore Dubai contractors, maintenance and cleaning companies, designers, fit-out workshops and suppliers for homes and commercial projects.',
    blocks: [
      ...section('Choosing a company in Dubai', 'Start with the property as well as the service: a Dubai Marina apartment may need AC or leak repairs, a Jumeirah villa may need a kitchen renovation, and an office or shop may have its own fit-out requirements.'),
      ...section('Construction and villas', 'For a villa or extension, consult the appropriate specialist, prepare drawings and confirm the necessary approvals. Separate structural work from finishing, waterproofing and mechanical and electrical work, and record responsibilities for supply, installation, inspection and handover.', 'Building-permit, inspection and completion requirements depend on the project and building category; consult the appropriate Dubai Municipality procedure.'),
      ...section('Maintenance in apartments, villas and towers', 'Check building-management and authority requirements before demolition, modifying services or changing AC systems. Define routine repairs and protect shared systems and neighbouring properties.'),
      ...section('Cleaning homes, offices and buildings', 'Specify regular, deep or post-fit-out cleaning and whether upholstery, glass, facades or outdoor areas are included. The condition, fabric, stains and drying time affect the work.'),
      ...section('Design, fit-out and materials', 'Your project may require a designer, contractor, joinery workshop and material suppliers. Check delivery, installation and warranties, and approve dimensions, drawings and materials before custom manufacture.'),
      ...section('Comparing services by area', 'Choose the actual location, such as Deira, Bur Dubai, Jumeirah, Al Barsha, Al Qusais or Dubai Marina. Coverage does not imply a physical branch. Confirm access, inspection charges and timing, especially for urgent work.'),
      ...section('Common questions'),
      ...question('Should I choose the cheapest offer?', 'Compare the full scope, specifications and final cost, not the initial price alone.'),
      ...question('Does every fit-out need a permit?', 'Requirements depend on the building and work. Check with the municipality and property management before work that may require approval.'),
      ...question('What should an interior-design request include?', 'Share the plan or measurements, photos, intended use, materials and deadline. Ask whether the fee covers design, manufacture and installation.'),
    ],
  },
  sharjah: {
    summary: 'Discover Sharjah contractors, maintenance and cleaning companies, designers, workshops and suppliers by city and specialty.',
    blocks: [
      ...section('Services across Sharjah', 'Sharjah includes residential, commercial and industrial areas as well as eastern cities such as Khorfakkan, Kalba and Dibba Al Hisn. State the exact location: distance can affect coverage, visits, equipment and cost.'),
      ...section('Choosing a building contractor', 'A new villa, extension, home renovation and shop fit-out have different requirements. Check the licence, permitted activity, plans and documents, and confirm applicable building, maintenance, inspection and approval procedures.', 'Do not start structural work on a verbal agreement. Agree the consultant’s and contractor’s responsibilities for approved documents, testing and handover.'),
      ...section('Maintenance for homes and premises', 'Describe electrical, plumbing, AC, damp or cracking symptoms before assuming a remedy. Some cracks need structural inspection rather than paint. Commercial and industrial premises may have operating-hour and safety constraints.'),
      ...section('Workshops and materials', 'For iron, aluminium, glass, joinery and finishing materials, provide dimensions, materials and quantities. Agree transport, installation and warranties; approve drawings or final measurements for custom work.'),
      ...section('Cleaning and clear quotations', 'Home cleaning, deep fabric cleaning and work on facades or facilities require different equipment. Do not assume every provider offers pest control, tanks or work at height.', 'Send the site, scope, area and photographs. Compare materials, quantities, exclusions, duration and final cost, and confirm coverage and travel charges for eastern cities.'),
      ...section('Common questions'),
      ...question('How do I find a Sharjah contractor?', 'Choose contracting and your city or area, then review the services and company details.'),
      ...question('Are extension and villa requirements the same?', 'Documentation and procedures may differ by work and site. Check the relevant municipal service.'),
      ...question('Can I request maintenance and cleaning together?', 'Yes, but confirm that each company actually provides the services requested.'),
    ],
  },
  ajman: {
    summary: 'Find Ajman contractors, maintenance and cleaning services, building-material shops, fit-out businesses and workshops.',
    blocks: [
      ...section('Starting a project in Ajman', 'From villas and extensions to apartment maintenance and shop fit-outs, the right provider depends on the work and the location. Specify the area, whether Al Nuaimiya, Al Jurf, Al Rawda, Masfout or Al Manama.'),
      ...section('Construction and finishing', 'Confirm the land status, drawings, engineering scope and permit requirements. Ajman’s municipality describes the relevant architectural and structural drawings and utility approvals according to the project.', 'Check the contractor’s licence, experience, capacity and written technical and financial offer. A turnkey label alone does not establish whether structure, finishing, AC, doors, external works or connections are included.'),
      ...section('Maintaining villas and apartments', 'AC, plumbing, electrical and waterproofing issues may require inspection before repair. Find the source of damp before repainting, and do not attempt dangerous electrical work. Agree who supplies parts and restores the finish.'),
      ...section('Materials, workshops and furniture', 'Use actual site measurements and approved drawings for made-to-measure kitchens, doors, windows and cabinets. For bulk materials, check specifications, quantities, timing, delivery and how shortages or damage are handled.'),
      ...section('Cleaning services', 'Describe whether you need pre-move, post-construction, upholstery, majlis or carpet cleaning. Equipment, time and staffing vary; agree the specific scope rather than a generic price.'),
      ...section('Common questions'),
      ...question('How can I obtain comparable construction quotations?', 'Provide the site, plans, dimensions and specifications, then request the same scope and quantities from each contractor.'),
      ...question('How does maintenance differ from renovation?', 'Maintenance preserves or repairs existing systems; renovation may change finishes, layouts or systems and can require additional procedures.'),
      ...question('What should I check with a workshop?', 'Review materials, measurements, drawings, manufacture, transport, installation and warranty.'),
    ],
  },
  'ras-al-khaimah': {
    summary: 'Explore construction, maintenance and cleaning businesses, suppliers and workshops for homes and projects across Ras Al Khaimah.',
    blocks: [
      ...section('Finding services in Ras Al Khaimah', 'Residential, commercial, industrial and hospitality projects have different requirements. Search by activity and area, then confirm the work each business actually provides.'),
      ...section('Contractors and approvals', 'Decide whether you need a general contractor, specialist trade or engineering office. Review licensing, applicable contractor or consultant qualifications, drawings and municipal permit requirements for the project.', 'For a new villa, alteration or extension, check the current architectural and structural requirements rather than relying on advertised experience alone.'),
      ...section('Villas, extensions and handover', 'Agree the scope for structure, waterproofing, facades, electrical and mechanical systems, and finishes. Clarify material testing, staged inspections, site protection and how changes are approved.'),
      ...section('Maintenance and waterproofing', 'Inspect the cause of damp, leaks or facade problems before choosing a repair. Coastal exposure may affect some metalwork and coatings; significant corrosion or structural cracking should not simply be concealed with paint.'),
      ...section('Workshops, equipment and cleaning', 'For metal, aluminium, wood, glass, materials or equipment, agree dimensions, specifications, lead time, transport and rental conditions. For cleaning, describe the surfaces, condition, area, products, drying and furniture protection required.'),
      ...section('Common questions'),
      ...question('Where can I check building-permit requirements?', 'Review the relevant municipal service, permit type, drawings and documents for your project.'),
      ...question('Can every contractor build every project type?', 'Do not assume so. Verify the activity, qualifications and requirements of the specific project.'),
      ...question('How should I compare finishing offers?', 'Compare materials or specifications, quantities, installation quality, duration and warranty as well as the total.'),
    ],
  },
  fujairah: {
    summary: 'Discover Fujairah contractors, maintenance and cleaning services, workshops and suppliers for homes and projects.',
    blocks: [
      ...section('Construction and services in Fujairah', 'Projects can be in the city, coastal or mountain areas. Consider the site, access, property and service before choosing a contractor or supplier; a villa, shop and warehouse have different needs.'),
      ...section('Choosing a contractor', 'Define whether the work is new construction, an extension, finishing or maintenance. Check the licence, activity, drawings and technical requirements, and assign responsibility for construction, supply, tests and handover.', 'Fujairah Municipality offers digital services for municipal requests and building permits. Check the relevant service through Rukhsati, and obtain a written offer covering materials, quantities, timing, payments and specialist trades.'),
      ...section('Site conditions and specifications', 'A specialist may need to assess ground conditions, soil, drainage and waterproofing. Foundations and waterproofing cannot be standardised for every building; follow project plans and engineering tests. Consider access, workspace, safety and coordination when transporting heavy equipment.'),
      ...section('Maintenance and finishing', 'Describe electrical, plumbing, AC, waterproofing, leak or paint issues. Find the cause of damp before replacing finishes; choose external materials according to their condition and exposure.'),
      ...section('Materials, workshops and cleaning', 'Confirm specifications, quantities and transport before ordering. For doors, windows, kitchens and cabinets, approve site measurements and drawings, including fittings and finishes.', 'For a villa, majlis, upholstery or post-construction clean, specify the area, surfaces and equipment. Outdoor or high-level work may require specialist providers.'),
      ...section('Common questions'),
      ...question('Do transport costs vary within Fujairah?', 'They can vary with location, quantity, vehicle and equipment. Ask for the charge in the offer.'),
      ...question('How do I check requirements for an extension?', 'Consult the relevant municipal service and check the land status, drawings and permits.'),
      ...question('What should a cleaning or maintenance request contain?', 'Give the location, service, area or number of items, photos of the condition and preferred timing.'),
    ],
  },
  'umm-al-quwain': {
    summary: 'Find contractors, maintenance and cleaning businesses, workshops and material suppliers across Umm Al Quwain.',
    blocks: [
      ...section('Choosing services in Umm Al Quwain', 'Homes and businesses need different combinations of construction, design, finishing, maintenance, cleaning and supply. Specify whether your project is in Umm Al Quwain City, Falaj Al Mualla or another area, and confirm coverage and travel charges.'),
      ...section('Villas and extensions', 'Start with the land information, plans and scope. Review municipal building and engineering services through the appropriate official channel, and check the contractor’s and consultant’s licences and activities where required.', 'Do not start work requiring a permit before approval. Obtain a written offer covering the structure, finishes, electrical and mechanical works, materials, waterproofing and warranties, with exclusions stated.'),
      ...section('Home maintenance', 'Leaks, AC upgrades, cracks, paint and flooring problems need an appropriate diagnosis. Agree responsibility for materials, replacement parts, site cleaning and making good after repair.'),
      ...section('Cleaning villas and furnishings', 'Specify post-construction or deep cleaning, upholstery, carpets, majlis or outside areas. Discuss the method, equipment, number of items, surface area and drying time, especially for delicate materials.'),
      ...section('Materials, workshops and rental', 'Compare technical specifications, quantities and delivery dates. Approve measurements, materials and drawings for custom doors, kitchens, windows and cabinets. For equipment rental, clarify capacity, duration, transport, operation and breakdown responsibilities.'),
      ...section('Using the directory', 'Choose a specialty, review the businesses offering it and give the exact location. Prepare photos, measurements and available documents, then confirm pricing, timing and coverage.'),
      ...section('Common questions'),
      ...question('How do I find a building contractor?', 'Choose contracting, define the project and verify the activity, licences and technical requirements.'),
      ...question('Can one company provide construction and finishing?', 'Some offer a complete scope, but confirm which work they perform and which specialist subcontractors they use.'),
      ...question('Does a material price include installation?', 'Not necessarily. Clarify transport, lifting, installation, fittings, tests and warranty in the final offer.'),
    ],
  },
};
