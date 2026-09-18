// Centralized mock data for the Miabe Afrika prototype.
// Togo-first, intra-African cross-border commerce.

export type Verification =
  | 'unverified'
  | 'documents-pending'
  | 'verified'
  | 'export-ready'

export const verificationLabels: Record<Verification, string> = {
  unverified: 'Non vérifié',
  'documents-pending': 'Documents en attente',
  verified: 'TOGOMALL Vérifié',
  'export-ready': 'Prêt à l’export',
}

export type Currency = 'XOF' | 'NGN' | 'GHS' | 'USD'

export const fxToXof: Record<Currency, number> = {
  XOF: 1,
  NGN: 0.42, // 1 NGN ~ 0.42 XOF
  GHS: 41, // 1 GHS ~ 41 XOF
  USD: 610, // 1 USD ~ 610 XOF
}

export function formatMoney(amount: number, currency: Currency) {
  const fractionDigits = currency === 'XOF' || currency === 'NGN' ? 0 : 2
  const value = new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount)
  return `${value} ${currency}`
}

// dual amount: primary currency + USD equivalent
export function dualMoney(amount: number, currency: Currency) {
  const usd = (amount * fxToXof[currency]) / fxToXof.USD
  const usdStr = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(usd)
  return { primary: formatMoney(amount, currency), usd: `~$${usdStr}` }
}

export type Corridor = {
  id: string
  from: string
  to: string
  flag: string
}

export const corridors: Corridor[] = [
  { id: 'tg-ng', from: 'Togo', to: 'Nigéria', flag: '🇳🇬' },
  { id: 'tg-gh', from: 'Togo', to: 'Ghana', flag: '🇬🇭' },
  { id: 'tg-ci', from: 'Togo', to: 'Côte d’Ivoire', flag: '🇨🇮' },
  { id: 'tg-bj', from: 'Togo', to: 'Bénin', flag: '🇧🇯' },
]

export type Supplier = {
  id: string
  name: string
  type: 'Coopérative' | 'Fabricant' | 'Transformateur' | 'Marque'
  city: string
  founded: number
  verification: Verification
  responseHours: number
  markets: string[]
  capacity: string
  employees: number
  bio: string
}

export const suppliers: Supplier[] = [
  {
    id: 'miel-plateaux',
    name: 'Coopérative Miel des Plateaux',
    type: 'Coopérative',
    city: 'Kpalimé',
    founded: 2009,
    verification: 'export-ready',
    responseHours: 5,
    markets: ['Nigéria', 'Ghana', 'Bénin'],
    capacity: '18 t / trimestre',
    employees: 240,
    bio: 'Coopérative de 240 apiculteurs sur le plateau de Kpalimé. Miel de forêt récolté à froid, traçabilité par rucher.',
  },
  {
    id: 'karite-savanes',
    name: 'Karité Savanes',
    type: 'Transformateur',
    city: 'Dapaong',
    founded: 2014,
    verification: 'verified',
    responseHours: 9,
    markets: ['Ghana', 'Côte d’Ivoire'],
    capacity: '40 t / mois',
    employees: 85,
    bio: 'Unité de transformation de karité de la région des Savanes. Beurre grade A pour l’industrie cosmétique et alimentaire.',
  },
  {
    id: 'aneho-textiles',
    name: 'Aného Textiles',
    type: 'Fabricant',
    city: 'Aného',
    founded: 2001,
    verification: 'verified',
    responseHours: 14,
    markets: ['Nigéria', 'Bénin'],
    capacity: '12 000 m / mois',
    employees: 160,
    bio: 'Imprimeur de pagne wax et fancy. Coton cardé, teinture réactive, motifs sur mesure pour distributeurs régionaux.',
  },
  {
    id: 'cajou-togo',
    name: 'Société Cajou Togo',
    type: 'Transformateur',
    city: 'Sokodé',
    founded: 2016,
    verification: 'documents-pending',
    responseHours: 22,
    markets: ['Côte d’Ivoire', 'Ghana'],
    capacity: '60 t / mois',
    employees: 310,
    bio: 'Décorticage et calibrage d’amandes de cajou. Grades WW240 à WW450, conditionnement sous vide.',
  },
  {
    id: 'cafe-kloto',
    name: 'Café Kloto',
    type: 'Coopérative',
    city: 'Kpalimé',
    founded: 2011,
    verification: 'verified',
    responseHours: 7,
    markets: ['Ghana', 'Bénin'],
    capacity: '9 t / trimestre',
    employees: 130,
    bio: 'Robusta et arabica d’altitude du massif du Kloto. Séchage naturel, lots par village.',
  },
  {
    id: 'sojafil',
    name: 'Sojafil Kara',
    type: 'Transformateur',
    city: 'Kara',
    founded: 2018,
    verification: 'unverified',
    responseHours: 30,
    markets: ['Nigéria'],
    capacity: '120 t / mois',
    employees: 54,
    bio: 'Soja non-OGM et tourteau de soja. Approvisionnement direct auprès de 900 producteurs de la région de la Kara.',
  },
]

export type ProductSpec = { label: string; value: string }

export type Product = {
  id: string
  name: string
  category: string
  supplierId: string
  origin: string
  image: string
  moq: string
  leadTime: string
  price: number
  currency: Currency
  unit: string
  verification: Verification
  certifications: string[]
  exportReady: string[] // destinations that are export-ready
  specs: ProductSpec[]
  packaging: string
  capacity: string
  story: string
}

export const products: Product[] = [
  {
    id: 'miel-brut-25',
    name: 'Miel brut de forêt 25 kg',
    category: 'Miel & apiculture',
    supplierId: 'miel-plateaux',
    origin: 'Kpalimé, Togo',
    image: '/products/raw-honey.png',
    moq: '2 fûts (50 kg)',
    leadTime: '14 jours',
    price: 3200,
    currency: 'XOF',
    unit: '/ kg',
    verification: 'export-ready',
    certifications: ['Analyse HMF', 'Certificat sanitaire'],
    exportReady: ['Ghana', 'Bénin'],
    specs: [
      { label: 'Humidité', value: '≤ 18 %' },
      { label: 'HMF', value: '≤ 15 mg/kg' },
      { label: 'Type', value: 'Miel de forêt polyfloral' },
      { label: 'Récolte', value: 'À froid, non chauffé' },
    ],
    packaging: 'Fût alimentaire HDPE 25 kg, palettisable 40 fûts / conteneur 20’',
    capacity: '18 t par trimestre',
    story:
      'Récolté par 240 apiculteurs sur le plateau de Kpalimé, ce miel de forêt est extrait à froid pour préserver ses enzymes. Chaque lot est rattaché à un rucher.',
  },
  {
    id: 'beurre-karite-a',
    name: 'Beurre de karité grade A',
    category: 'Karité & cosmétique',
    supplierId: 'karite-savanes',
    origin: 'Dapaong, Togo',
    image: '/products/shea-butter.png',
    moq: '500 kg',
    leadTime: '21 jours',
    price: 1850,
    currency: 'XOF',
    unit: '/ kg',
    verification: 'verified',
    certifications: ['ISO 22716', 'Certificat d’origine'],
    exportReady: ['Ghana'],
    specs: [
      { label: 'Acidité', value: '≤ 3 %' },
      { label: 'Indice de peroxyde', value: '≤ 10' },
      { label: 'Couleur', value: 'Ivoire' },
      { label: 'Extraction', value: 'Mécanique, non raffiné' },
    ],
    packaging: 'Carton doublé 25 kg ou fût 180 kg',
    capacity: '40 t par mois',
    story:
      'Transformé par un groupement de femmes de la région des Savanes selon un procédé mécanique sans solvant.',
  },
  {
    id: 'cajou-ww320',
    name: 'Amandes de cajou WW320',
    category: 'Noix & amandes',
    supplierId: 'cajou-togo',
    origin: 'Sokodé, Togo',
    image: '/products/cashew-kernels.png',
    moq: '1 tonne',
    leadTime: '25 jours',
    price: 4.9,
    currency: 'USD',
    unit: '/ kg',
    verification: 'documents-pending',
    certifications: ['HACCP (en cours)'],
    exportReady: [],
    specs: [
      { label: 'Grade', value: 'WW320 (320 amandes/lb)' },
      { label: 'Humidité', value: '≤ 5 %' },
      { label: 'Amandes brisées', value: '≤ 5 %' },
      { label: 'Conditionnement', value: 'Sous vide + azote' },
    ],
    packaging: 'Boîte fer-blanc 22,68 kg (50 lb), 2 par carton',
    capacity: '60 t par mois',
    story:
      'Décorticage et calibrage à Sokodé. Les amandes WW320 sont blanches, entières et conditionnées sous atmosphère modifiée.',
  },
  {
    id: 'wax-print-cotton',
    name: 'Pagne wax coton 6 yards',
    category: 'Textile & pagne',
    supplierId: 'aneho-textiles',
    origin: 'Aného, Togo',
    image: '/products/wax-print.png',
    moq: '300 pièces',
    leadTime: '30 jours',
    price: 6500,
    currency: 'XOF',
    unit: '/ pièce',
    verification: 'verified',
    certifications: ['OEKO-TEX (en cours)'],
    exportReady: ['Bénin'],
    specs: [
      { label: 'Composition', value: '100 % coton' },
      { label: 'Grammage', value: '110 g/m²' },
      { label: 'Laize', value: '120 cm' },
      { label: 'Longueur', value: '5,5 m (6 yards)' },
    ],
    packaging: 'Sac polypropylène de 20 pièces',
    capacity: '12 000 m par mois',
    story:
      'Impression wax à la cire sur coton cardé. Motifs classiques et créations sur mesure pour distributeurs.',
  },
  {
    id: 'ananas-seche',
    name: 'Ananas séché en lanières',
    category: 'Fruits transformés',
    supplierId: 'cafe-kloto',
    origin: 'Kpalimé, Togo',
    image: '/products/dried-pineapple.png',
    moq: '200 kg',
    leadTime: '18 jours',
    price: 3100,
    currency: 'XOF',
    unit: '/ kg',
    verification: 'verified',
    certifications: ['Certificat sanitaire'],
    exportReady: ['Ghana', 'Bénin'],
    specs: [
      { label: 'Humidité', value: '≤ 12 %' },
      { label: 'Sucre ajouté', value: 'Aucun' },
      { label: 'Variété', value: 'Cayenne lisse' },
      { label: 'Séchage', value: 'Air chaud 45 °C' },
    ],
    packaging: 'Sachet kraft 5 kg, carton 20 kg',
    capacity: '4 t par mois',
    story:
      'Ananas Cayenne séché sans additif, tranché à la main puis déshydraté lentement pour préserver la couleur.',
  },
  {
    id: 'hibiscus-sec',
    name: 'Fleurs d’hibiscus séchées (bissap)',
    category: 'Fruits transformés',
    supplierId: 'sojafil',
    origin: 'Kara, Togo',
    image: '/products/hibiscus.png',
    moq: '500 kg',
    leadTime: '20 jours',
    price: 1450,
    currency: 'XOF',
    unit: '/ kg',
    verification: 'unverified',
    certifications: [],
    exportReady: [],
    specs: [
      { label: 'Type', value: 'Calices rouge foncé' },
      { label: 'Humidité', value: '≤ 11 %' },
      { label: 'Corps étrangers', value: '≤ 1 %' },
      { label: 'Récolte', value: 'Saison sèche' },
    ],
    packaging: 'Sac jute 50 kg',
    capacity: '15 t par saison',
    story:
      'Calices d’hibiscus sabdariffa récoltés en saison sèche, triés puis séchés à l’ombre pour garder leur couleur.',
  },
]

export function supplierOf(product: Product) {
  return suppliers.find((s) => s.id === product.supplierId)!
}

export type Buyer = {
  id: string
  name: string
  country: string
  type: string
  volume: string
}

export const buyers: Buyer[] = [
  { id: 'lagos-food', name: 'Lagos Food Import Ltd', country: 'Nigéria', type: 'Importateur', volume: '2,4 M USD / an' },
  { id: 'accra-hub', name: 'Accra Wholesale Hub', country: 'Ghana', type: 'Grossiste', volume: '1,1 M USD / an' },
  { id: 'abidjan-dist', name: 'Abidjan Distribution', country: 'Côte d’Ivoire', type: 'Distributeur', volume: '900 k USD / an' },
  { id: 'dakar-proc', name: 'Dakar Institutional Procurement', country: 'Sénégal', type: 'Achats institutionnels', volume: '3,0 M USD / an' },
]

export type WorkflowStage =
  | 'interest'
  | 'rfq'
  | 'quote'
  | 'po'
  | 'production'
  | 'qc'
  | 'shipment'
  | 'customs'
  | 'delivery'
  | 'settlement'

export const workflowStages: { id: WorkflowStage; label: string }[] = [
  { id: 'interest', label: 'Intérêt' },
  { id: 'rfq', label: 'RFQ' },
  { id: 'quote', label: 'Devis' },
  { id: 'po', label: 'PO' },
  { id: 'production', label: 'Production' },
  { id: 'qc', label: 'Contrôle qualité' },
  { id: 'shipment', label: 'Expédition' },
  { id: 'customs', label: 'Douane' },
  { id: 'delivery', label: 'Livraison' },
  { id: 'settlement', label: 'Règlement' },
]

export type RFQ = {
  id: string
  productId: string
  buyerId: string
  supplierId: string
  quantity: string
  destination: string
  incoterm: string
  neededBy: string
  status: 'new' | 'quoted' | 'negotiating' | 'accepted' | 'declined'
  stage: WorkflowStage
  quote?: { unitPrice: number; currency: Currency; validity: string }
  createdAt: string
}

export const rfqs: RFQ[] = [
  {
    id: 'RFQ-2041',
    productId: 'miel-brut-25',
    buyerId: 'accra-hub',
    supplierId: 'miel-plateaux',
    quantity: '3 t',
    destination: 'Ghana',
    incoterm: 'FOB Lomé',
    neededBy: '30 nov. 2026',
    status: 'quoted',
    stage: 'quote',
    quote: { unitPrice: 3200, currency: 'XOF', validity: '15 jours' },
    createdAt: '2 nov. 2026',
  },
  {
    id: 'RFQ-2038',
    productId: 'beurre-karite-a',
    buyerId: 'lagos-food',
    supplierId: 'karite-savanes',
    quantity: '5 t',
    destination: 'Nigéria',
    incoterm: 'CIF Lagos',
    neededBy: '12 déc. 2026',
    status: 'negotiating',
    stage: 'quote',
    quote: { unitPrice: 1980, currency: 'XOF', validity: '10 jours' },
    createdAt: '28 oct. 2026',
  },
  {
    id: 'RFQ-2035',
    productId: 'cajou-ww320',
    buyerId: 'abidjan-dist',
    supplierId: 'cajou-togo',
    quantity: '10 t',
    destination: 'Côte d’Ivoire',
    incoterm: 'FOB Lomé',
    neededBy: '20 déc. 2026',
    status: 'new',
    stage: 'rfq',
    createdAt: '5 nov. 2026',
  },
  {
    id: 'RFQ-2030',
    productId: 'wax-print-cotton',
    buyerId: 'lagos-food',
    supplierId: 'aneho-textiles',
    quantity: '1 200 pièces',
    destination: 'Nigéria',
    incoterm: 'FOB Lomé',
    neededBy: '15 janv. 2027',
    status: 'accepted',
    stage: 'production',
    quote: { unitPrice: 6500, currency: 'XOF', validity: 'Confirmé' },
    createdAt: '18 oct. 2026',
  },
]

export function rfqProduct(r: RFQ) {
  return products.find((p) => p.id === r.productId)!
}
export function rfqBuyer(r: RFQ) {
  return buyers.find((b) => b.id === r.buyerId)!
}

export type Order = {
  id: string
  productId: string
  buyerId: string
  supplierId: string
  quantity: string
  value: number
  currency: Currency
  stage: WorkflowStage
  destination: string
  eta: string
  paymentStatus: 'awaiting' | 'escrow' | 'partial' | 'paid'
}

export const orders: Order[] = [
  {
    id: 'PO-8814',
    productId: 'wax-print-cotton',
    buyerId: 'lagos-food',
    supplierId: 'aneho-textiles',
    quantity: '1 200 pièces',
    value: 7800000,
    currency: 'XOF',
    stage: 'production',
    destination: 'Nigéria',
    eta: '15 janv. 2027',
    paymentStatus: 'escrow',
  },
  {
    id: 'PO-8790',
    productId: 'beurre-karite-a',
    buyerId: 'accra-hub',
    supplierId: 'karite-savanes',
    quantity: '5 t',
    value: 9250000,
    currency: 'XOF',
    stage: 'shipment',
    destination: 'Ghana',
    eta: '2 déc. 2026',
    paymentStatus: 'partial',
  },
  {
    id: 'PO-8771',
    productId: 'miel-brut-25',
    buyerId: 'accra-hub',
    supplierId: 'miel-plateaux',
    quantity: '3 t',
    value: 9600000,
    currency: 'XOF',
    stage: 'customs',
    destination: 'Ghana',
    eta: '28 nov. 2026',
    paymentStatus: 'escrow',
  },
  {
    id: 'PO-8752',
    productId: 'ananas-seche',
    buyerId: 'abidjan-dist',
    supplierId: 'cafe-kloto',
    quantity: '2 t',
    value: 6200000,
    currency: 'XOF',
    stage: 'delivery',
    destination: 'Côte d’Ivoire',
    eta: '20 nov. 2026',
    paymentStatus: 'paid',
  },
]

export function orderProduct(o: Order) {
  return products.find((p) => p.id === o.productId)!
}
export function orderBuyer(o: Order) {
  return buyers.find((b) => b.id === o.buyerId)!
}
export function orderSupplier(o: Order) {
  return suppliers.find((s) => s.id === o.supplierId)!
}

export type Opportunity = {
  id: string
  kind: 'buyer-request' | 'supplier-offer'
  title: string
  party: string
  country: string
  quantity: string
  destination: string
  budget?: string
  closes: string
}

export const opportunities: Opportunity[] = [
  {
    id: 'OPP-501',
    kind: 'buyer-request',
    title: 'Recherche 20 t d’amandes de cajou WW320',
    party: 'Lagos Food Import Ltd',
    country: 'Nigéria',
    quantity: '20 t',
    destination: 'Nigéria',
    budget: '95 000 – 110 000 USD',
    closes: '30 nov. 2026',
  },
  {
    id: 'OPP-498',
    kind: 'buyer-request',
    title: 'Appel d’offres — miel conditionné pour la grande distribution',
    party: 'Accra Wholesale Hub',
    country: 'Ghana',
    quantity: '8 t / trimestre',
    destination: 'Ghana',
    budget: '25 M XOF',
    closes: '10 déc. 2026',
  },
  {
    id: 'OPP-495',
    kind: 'supplier-offer',
    title: 'Disponibilité — beurre de karité grade A, récolte 2026',
    party: 'Karité Savanes',
    country: 'Togo',
    quantity: '40 t',
    destination: 'Toute l’Afrique de l’Ouest',
    closes: '31 déc. 2026',
  },
  {
    id: 'OPP-491',
    kind: 'buyer-request',
    title: 'Marché institutionnel — soja non-OGM',
    party: 'Dakar Institutional Procurement',
    country: 'Sénégal',
    quantity: '150 t',
    destination: 'Sénégal',
    budget: '3 M USD',
    closes: '15 janv. 2027',
  },
]

// Export readiness checklist: product x destination
export type ChecklistItem = {
  label: string
  status: 'done' | 'missing' | 'expiring'
  note?: string
}

export type ExportReadiness = {
  productId: string
  destination: string
  items: ChecklistItem[]
}

export const exportReadiness: ExportReadiness[] = [
  {
    productId: 'miel-brut-25',
    destination: 'Nigéria',
    items: [
      { label: 'Enregistrement de l’entreprise', status: 'done' },
      { label: 'Certificat de laboratoire (HMF)', status: 'missing', note: 'À prélever sur lot en cours' },
      { label: 'Étiquetage conforme NAFDAC', status: 'missing' },
      { label: 'Permis d’exportation', status: 'missing' },
      { label: 'Certificat d’origine CEDEAO', status: 'done' },
    ],
  },
  {
    productId: 'miel-brut-25',
    destination: 'Ghana',
    items: [
      { label: 'Enregistrement de l’entreprise', status: 'done' },
      { label: 'Certificat de laboratoire (HMF)', status: 'done' },
      { label: 'Étiquetage conforme FDA Ghana', status: 'done' },
      { label: 'Permis d’exportation', status: 'expiring', note: 'Expire le 31 déc. 2026' },
      { label: 'Certificat d’origine CEDEAO', status: 'done' },
    ],
  },
  {
    productId: 'beurre-karite-a',
    destination: 'Nigéria',
    items: [
      { label: 'Enregistrement de l’entreprise', status: 'done' },
      { label: 'ISO 22716', status: 'done' },
      { label: 'Étiquetage conforme NAFDAC', status: 'expiring', note: 'Renouvellement en cours' },
      { label: 'Permis d’exportation', status: 'missing' },
    ],
  },
]

export type Document = {
  id: string
  name: string
  type: string
  owner: string
  issued: string
  expires: string
  status: 'valid' | 'expiring' | 'expired' | 'missing'
}

export const documents: Document[] = [
  { id: 'DOC-1', name: 'Certificat d’origine CEDEAO', type: 'Origine', owner: 'Coopérative Miel des Plateaux', issued: '10 jan. 2026', expires: '10 jan. 2027', status: 'valid' },
  { id: 'DOC-2', name: 'Permis d’exportation', type: 'Permis', owner: 'Coopérative Miel des Plateaux', issued: '01 jan. 2026', expires: '31 déc. 2026', status: 'expiring' },
  { id: 'DOC-3', name: 'Analyse laboratoire HMF', type: 'Analyse', owner: 'Coopérative Miel des Plateaux', issued: '15 sep. 2026', expires: '15 mar. 2027', status: 'valid' },
  { id: 'DOC-4', name: 'ISO 22716', type: 'Certification', owner: 'Karité Savanes', issued: '20 fév. 2025', expires: '20 fév. 2026', status: 'expired' },
  { id: 'DOC-5', name: 'Certificat sanitaire', type: 'Sanitaire', owner: 'Café Kloto', issued: '05 aoû. 2026', expires: '05 aoû. 2027', status: 'valid' },
]

export type TeamMember = {
  id: string
  name: string
  role: string
  email: string
  status: 'active' | 'invited'
}

export const team: TeamMember[] = [
  { id: 'u1', name: 'Ama Koffi', role: 'Administratrice', email: 'ama@mielplateaux.tg', status: 'active' },
  { id: 'u2', name: 'Kwabena Doe', role: 'Responsable export', email: 'kwabena@mielplateaux.tg', status: 'active' },
  { id: 'u3', name: 'Fatima Sow', role: 'Logistique', email: 'fatima@mielplateaux.tg', status: 'active' },
  { id: 'u4', name: 'Yao Mensah', role: 'Qualité', email: 'yao@mielplateaux.tg', status: 'invited' },
]

export type Inventory = {
  productId: string
  available: number
  reserved: number
  incoming: number
  unit: string
  warehouse: string
  alert?: string
}

export const inventory: Inventory[] = [
  { productId: 'miel-brut-25', available: 12400, reserved: 3000, incoming: 6000, unit: 'kg', warehouse: 'Entrepôt Lomé A' },
  { productId: 'beurre-karite-a', available: 8200, reserved: 5000, incoming: 12000, unit: 'kg', warehouse: 'Dapaong', alert: 'Réservé > disponible dans 8 j' },
  { productId: 'ananas-seche', available: 900, reserved: 400, incoming: 0, unit: 'kg', warehouse: 'Entrepôt Lomé A', alert: 'Stock bas' },
  { productId: 'wax-print-cotton', available: 4200, reserved: 1200, incoming: 3000, unit: 'pièces', warehouse: 'Aného' },
]

export function inventoryProduct(i: Inventory) {
  return products.find((p) => p.id === i.productId)!
}

// Country Knowledge Engine
export type Country = {
  id: string
  name: string
  flag: string
  currency: Currency
  authorities: string[]
  avgDuty: string
  restricted: string[]
  rules: { title: string; detail: string }[]
}

export const countries: Country[] = [
  {
    id: 'nigeria',
    name: 'Nigéria',
    flag: '🇳🇬',
    currency: 'NGN',
    authorities: ['NAFDAC', 'Nigeria Customs Service', 'SON'],
    avgDuty: '5 – 20 %',
    restricted: ['Produits laitiers subventionnés', 'Textiles usagés'],
    rules: [
      { title: 'Enregistrement NAFDAC', detail: 'Tout produit alimentaire ou cosmétique importé doit disposer d’un numéro NAFDAC avant dédouanement.' },
      { title: 'Étiquetage', detail: 'Étiquette en anglais, date de péremption, numéro de lot et numéro NAFDAC obligatoires.' },
      { title: 'Certificat SONCAP', detail: 'Requis pour les produits réglementés par la SON.' },
    ],
  },
  {
    id: 'ghana',
    name: 'Ghana',
    flag: '🇬🇭',
    currency: 'GHS',
    authorities: ['FDA Ghana', 'GRA Customs', 'GSA'],
    avgDuty: '5 – 20 %',
    restricted: ['Volaille congelée', 'Certains médicaments'],
    rules: [
      { title: 'Enregistrement FDA', detail: 'Les produits alimentaires importés doivent être enregistrés auprès de la FDA du Ghana.' },
      { title: 'Certificat d’origine CEDEAO', detail: 'Exonère les droits sous le Schéma de Libéralisation des Échanges de la CEDEAO (SLEC).' },
    ],
  },
  {
    id: 'cote-ivoire',
    name: 'Côte d’Ivoire',
    flag: '🇨🇮',
    currency: 'XOF',
    authorities: ['Douanes ivoiriennes', 'Codinorm'],
    avgDuty: '0 – 20 %',
    restricted: ['Sacs plastiques non biodégradables'],
    rules: [
      { title: 'Zone UEMOA', detail: 'Échanges en franchise de droits au sein de l’UEMOA avec certificat d’origine.' },
      { title: 'Norme Codinorm', detail: 'Certaines catégories exigent une attestation de conformité.' },
    ],
  },
  {
    id: 'benin',
    name: 'Bénin',
    flag: '🇧🇯',
    currency: 'XOF',
    authorities: ['Douanes béninoises', 'ABSSA'],
    avgDuty: '0 – 20 %',
    restricted: [],
    rules: [
      { title: 'Zone UEMOA', detail: 'Franchise de droits intra-UEMOA sous couvert du certificat d’origine.' },
      { title: 'Contrôle sanitaire ABSSA', detail: 'Produits d’origine agricole soumis au contrôle de l’ABSSA.' },
    ],
  },
]

export function countryById(id: string) {
  return countries.find((c) => c.id === id)
}

// Trade Intelligence figures
export const intel = {
  tradeValueByMonth: [
    { month: 'Mai', value: 180 },
    { month: 'Juin', value: 210 },
    { month: 'Juil', value: 240 },
    { month: 'Août', value: 190 },
    { month: 'Sept', value: 280 },
    { month: 'Oct', value: 340 },
    { month: 'Nov', value: 410 },
  ], // millions XOF
  rfqVolume: [
    { month: 'Mai', value: 42 },
    { month: 'Juin', value: 55 },
    { month: 'Juil', value: 61 },
    { month: 'Août', value: 48 },
    { month: 'Sept', value: 73 },
    { month: 'Oct', value: 88 },
    { month: 'Nov', value: 96 },
  ],
  demandByDestination: [
    { name: 'Nigéria', value: 38 },
    { name: 'Ghana', value: 27 },
    { name: 'Côte d’Ivoire', value: 19 },
    { name: 'Bénin', value: 11 },
    { name: 'Autres', value: 5 },
  ],
  qcSuccess: 91, // %
  avgResponseHours: 11,
  smeParticipation: 64, // %
  topProducts: [
    { name: 'Beurre de karité', value: 118 },
    { name: 'Amandes de cajou', value: 96 },
    { name: 'Miel brut', value: 74 },
    { name: 'Pagne wax', value: 52 },
    { name: 'Ananas séché', value: 31 },
  ],
}

export type Notification = {
  id: string
  kind: 'rfq' | 'quote' | 'order' | 'document' | 'payment' | 'inspection' | 'shipment' | 'dispute'
  title: string
  detail: string
  time: string
  unread: boolean
}

export const notifications: Notification[] = [
  { id: 'n1', kind: 'rfq', title: 'Nouvelle RFQ — RFQ-2035', detail: 'Abidjan Distribution demande 10 t de cajou WW320', time: 'Il y a 12 min', unread: true },
  { id: 'n2', kind: 'quote', title: 'Devis en négociation', detail: 'Lagos Food a répondu au devis du beurre de karité', time: 'Il y a 1 h', unread: true },
  { id: 'n3', kind: 'payment', title: 'Paiement en séquestre', detail: 'PO-8814 — 7,8 M XOF sécurisés', time: 'Il y a 3 h', unread: true },
  { id: 'n4', kind: 'inspection', title: 'Contrôle qualité programmé', detail: 'PO-8790 — inspection le 24 nov. à Dapaong', time: 'Hier', unread: false },
  { id: 'n5', kind: 'document', title: 'Permis d’exportation expire bientôt', detail: 'Coopérative Miel des Plateaux — 31 déc. 2026', time: 'Hier', unread: false },
  { id: 'n6', kind: 'shipment', title: 'Expédition en douane', detail: 'PO-8771 — poste frontière d’Aflao', time: 'Il y a 2 j', unread: false },
]

export type InvoiceStatus = 'draft' | 'sent' | 'partial' | 'paid' | 'overdue'

export type Invoice = {
  id: string
  orderId: string
  buyerId: string
  amount: number
  currency: Currency
  status: InvoiceStatus
  issued: string
  due: string
}

export const invoices: Invoice[] = [
  { id: 'INV-4412', orderId: 'PO-8752', buyerId: 'abidjan-dist', amount: 6200000, currency: 'XOF', status: 'paid', issued: '8 nov. 2026', due: '22 nov. 2026' },
  { id: 'INV-4418', orderId: 'PO-8771', buyerId: 'accra-hub', amount: 9600000, currency: 'XOF', status: 'sent', issued: '12 nov. 2026', due: '26 nov. 2026' },
  { id: 'INV-4421', orderId: 'PO-8790', buyerId: 'accra-hub', amount: 4625000, currency: 'XOF', status: 'partial', issued: '14 nov. 2026', due: '28 nov. 2026' },
  { id: 'INV-4425', orderId: 'PO-8814', buyerId: 'lagos-food', amount: 7800000, currency: 'XOF', status: 'draft', issued: '18 nov. 2026', due: '2 déc. 2026' },
]

export function invoiceOrder(i: Invoice) {
  return orders.find((o) => o.id === i.orderId)!
}

export function invoiceBuyer(i: Invoice) {
  return buyers.find((b) => b.id === i.buyerId)!
}

export type QuoteOffer = {
  rfqId: string
  supplierId: string
  unitPrice: number
  currency: Currency
  leadTime: string
  incoterm: string
  certs: string[]
  capacity: string
  recommended?: boolean
}

export const quoteOffers: QuoteOffer[] = [
  { rfqId: 'RFQ-2041', supplierId: 'miel-plateaux', unitPrice: 3200, currency: 'XOF', leadTime: '14 jours', incoterm: 'FOB Lomé', certs: ['Analyse HMF', 'Sanitaire'], capacity: '18 t / trim.', recommended: true },
  { rfqId: 'RFQ-2041', supplierId: 'cafe-kloto', unitPrice: 3480, currency: 'XOF', leadTime: '21 jours', incoterm: 'EXW Kpalimé', certs: ['Sanitaire'], capacity: '9 t / trim.' },
  { rfqId: 'RFQ-2041', supplierId: 'karite-savanes', unitPrice: 3100, currency: 'XOF', leadTime: '28 jours', incoterm: 'FOB Lomé', certs: ['Origine CEDEAO'], capacity: '6 t / trim.' },
  { rfqId: 'RFQ-2038', supplierId: 'karite-savanes', unitPrice: 1980, currency: 'XOF', leadTime: '21 jours', incoterm: 'CIF Lagos', certs: ['ISO 22716', 'Origine'], capacity: '40 t / mois', recommended: true },
  { rfqId: 'RFQ-2038', supplierId: 'miel-plateaux', unitPrice: 2100, currency: 'XOF', leadTime: '30 jours', incoterm: 'FOB Lomé', certs: ['Sanitaire'], capacity: '8 t / mois' },
  { rfqId: 'RFQ-2038', supplierId: 'sojafil', unitPrice: 1890, currency: 'XOF', leadTime: '35 jours', incoterm: 'EXW Kara', certs: [], capacity: '12 t / mois' },
]

export function offerSupplier(o: QuoteOffer) {
  return suppliers.find((s) => s.id === o.supplierId)!
}

export type SupplierMatch = {
  rfqId: string
  supplierId: string
  score: number
  reasons: string[]
  unitPrice: number
  currency: Currency
  leadTime: string
  stock: string
}

export const supplierMatches: SupplierMatch[] = [
  { rfqId: 'RFQ-2035', supplierId: 'cajou-togo', score: 94, reasons: ['Grade WW320', 'Capacité 60 t / mois', 'FOB Lomé', 'HACCP en cours'], unitPrice: 4.9, currency: 'USD', leadTime: '25 jours', stock: '12 t disponibles' },
  { rfqId: 'RFQ-2035', supplierId: 'sojafil', score: 41, reasons: ['Corridor Nigéria/CI', 'Capacité volume', 'Pas de grade WW'], unitPrice: 5.4, currency: 'USD', leadTime: '40 jours', stock: 'Sur commande' },
  { rfqId: 'RFQ-2041', supplierId: 'miel-plateaux', score: 96, reasons: ['Produit exact', 'Prêt Ghana', 'Réponse 5 h', 'Stock 12 t'], unitPrice: 3200, currency: 'XOF', leadTime: '14 jours', stock: '12,4 t disponibles' },
  { rfqId: 'RFQ-2041', supplierId: 'cafe-kloto', score: 62, reasons: ['Même plateau', 'Certificat sanitaire', 'Volume limité'], unitPrice: 3480, currency: 'XOF', leadTime: '21 jours', stock: '2 t' },
  { rfqId: 'RFQ-2038', supplierId: 'karite-savanes', score: 97, reasons: ['Grade A', 'ISO 22716', '40 t / mois', 'CIF Lagos'], unitPrice: 1980, currency: 'XOF', leadTime: '21 jours', stock: '8,2 t + 12 t entrant' },
  { rfqId: 'RFQ-2038', supplierId: 'miel-plateaux', score: 48, reasons: ['Vérifié TOGOMALL', 'Délai plus long'], unitPrice: 2100, currency: 'XOF', leadTime: '30 jours', stock: 'Sur agrégation' },
]

export type Inspection = {
  id: string
  orderId: string
  site: string
  date: string
  result: 'pending' | 'pass' | 'fail'
  notes: string
}

export const inspections: Inspection[] = [
  { id: 'QC-112', orderId: 'PO-8790', site: 'Dapaong', date: '24 nov. 2026', result: 'pending', notes: 'Inspection visuelle + acidité du beurre de karité.' },
  { id: 'QC-108', orderId: 'PO-8771', site: 'Kpalimé', date: '10 nov. 2026', result: 'pass', notes: 'HMF 11 mg/kg, humidité 17,4 %. Lot conforme.' },
  { id: 'QC-101', orderId: 'PO-8752', site: 'Kpalimé', date: '2 nov. 2026', result: 'pass', notes: 'Humidité 11 %, aucun additif détecté.' },
  { id: 'QC-097', orderId: 'PO-8814', site: 'Aného', date: '20 nov. 2026', result: 'fail', notes: 'Écart colorimétrique sur 2 balles — reprise demandée.' },
]

export type Dispute = {
  id: string
  orderId: string
  kind: 'Qualité' | 'Quantité' | 'Livraison' | 'Documentation' | 'Paiement' | 'Logistique'
  status: 'open' | 'review' | 'resolved'
  summary: string
  opened: string
}

export const disputes: Dispute[] = [
  { id: 'DSP-14', orderId: 'PO-8790', kind: 'Documentation', status: 'open', summary: 'Scan du certificat d’origine CEDEAO illisible côté douane ghanéenne.', opened: '16 nov. 2026' },
  { id: 'DSP-11', orderId: 'PO-8814', kind: 'Quantité', status: 'review', summary: 'Écart de 18 pièces constaté en production à Aného.', opened: '12 nov. 2026' },
  { id: 'DSP-07', orderId: 'PO-8752', kind: 'Livraison', status: 'resolved', summary: 'Retard de 36 h au quai d’Abidjan — avoir commercial accordé.', opened: '8 nov. 2026' },
]

export type Shipment = {
  orderId: string
  provider: string
  route: string
  mode: string
  tracking: string
  milestone: string
  cost: number
  currency: Currency
}

export const shipments: Shipment[] = [
  { orderId: 'PO-8771', provider: 'Bolloré Logistics', route: 'Lomé → Aflao → Accra', mode: 'Routier', tracking: 'BL-8821', milestone: 'Poste frontière d’Aflao', cost: 840000, currency: 'XOF' },
  { orderId: 'PO-8790', provider: 'Maersk + transitaire Lomé', route: 'Lomé → Tema', mode: 'Maritime cabotage', tracking: 'MSK-44190', milestone: 'Chargement Dapaong', cost: 2100000, currency: 'XOF' },
  { orderId: 'PO-8752', provider: 'SITARAIL / route', route: 'Lomé → Abidjan', mode: 'Routier', tracking: 'ST-2291', milestone: 'Livré entrepôt Treichville', cost: 1250000, currency: 'XOF' },
  { orderId: 'PO-8814', provider: 'Grimaldi Lines', route: 'Lomé → Lagos', mode: 'Maritime', tracking: 'GR-1044', milestone: 'Production Aného', cost: 3100000, currency: 'XOF' },
]

export type Payout = {
  id: string
  orderId: string
  supplierId: string
  amount: number
  currency: Currency
  status: 'due' | 'scheduled' | 'paid'
  date: string
}

export const payouts: Payout[] = [
  { id: 'PAY-901', orderId: 'PO-8752', supplierId: 'cafe-kloto', amount: 5580000, currency: 'XOF', status: 'paid', date: '18 nov. 2026' },
  { id: 'PAY-904', orderId: 'PO-8771', supplierId: 'miel-plateaux', amount: 8640000, currency: 'XOF', status: 'scheduled', date: '2 déc. 2026' },
  { id: 'PAY-907', orderId: 'PO-8790', supplierId: 'karite-savanes', amount: 4162500, currency: 'XOF', status: 'due', date: '5 déc. 2026' },
  { id: 'PAY-910', orderId: 'PO-8814', supplierId: 'aneho-textiles', amount: 7020000, currency: 'XOF', status: 'due', date: '20 janv. 2027' },
]
