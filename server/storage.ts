import { tubeBenders, comparisons, costCalculations, adminUsers, type TubeBender, type InsertTubeBender, type Comparison, type InsertComparison, type CostCalculation, type InsertCostCalculation, type AdminUser, type InsertAdminUser } from "@shared/schema";

export interface IStorage {
  // Tube Benders
  getTubeBenders(): Promise<TubeBender[]>;
  getTubeBender(id: number): Promise<TubeBender | undefined>;
  getTubeBendersByBrand(brand: string): Promise<TubeBender[]>;
  getRecommendedTubeBenders(): Promise<TubeBender[]>;
  getTubeBendersByCategory(category: string): Promise<TubeBender[]>;
  createTubeBender(tubeBender: InsertTubeBender): Promise<TubeBender>;
  updateTubeBenderCategory(id: number, category: string): Promise<TubeBender | null>;
  updateTubeBender(id: number, updates: Partial<TubeBender>): Promise<TubeBender | null>;
  
  // Comparisons
  getComparisons(): Promise<Comparison[]>;
  getComparison(id: number): Promise<Comparison | undefined>;
  createComparison(comparison: InsertComparison): Promise<Comparison>;
  
  // Cost Calculations
  createCostCalculation(calculation: InsertCostCalculation): Promise<CostCalculation>;
  getCostCalculationsByProduct(productId: number): Promise<CostCalculation[]>;
  
  // Admin Users
  getAdminByUsername(username: string): Promise<AdminUser | undefined>;
  getAdminByEmail(email: string): Promise<AdminUser | undefined>;
  createAdmin(admin: Omit<AdminUser, 'id'>): Promise<AdminUser>;
  updateAdminLoginAttempts(id: number, attempts: number, lockedUntil?: string): Promise<AdminUser | null>;
  updateAdminLastLogin(id: number, lastLogin: string): Promise<AdminUser | null>;
  updateAdminEmail(id: number, email: string): Promise<AdminUser | null>;
  getAllAdmins(): Promise<AdminUser[]>;
}

export class MemStorage implements IStorage {
  private tubeBenders: Map<number, TubeBender>;
  private comparisons: Map<number, Comparison>;
  private costCalculations: Map<number, CostCalculation>;
  private adminUsers: Map<number, AdminUser>;
  private currentTubeBenderId: number;
  private currentComparisonId: number;
  private currentCostCalculationId: number;
  private currentAdminUserId: number;

  constructor() {
    this.tubeBenders = new Map();
    this.comparisons = new Map();
    this.costCalculations = new Map();
    this.adminUsers = new Map();
    this.currentTubeBenderId = 1;
    this.currentComparisonId = 1;
    this.currentCostCalculationId = 1;
    this.currentAdminUserId = 1;
    
    this.seedData();
  }

  private seedData() {
    // RogueFab M6xx Series
    const rogueFab: TubeBender = {
      id: this.currentTubeBenderId++,
      name: "RogueFab M6xx Series",
      brand: "RogueFab",
      model: "M601/M605/M625",
      rating: "9.0",
      priceRange: "$1,895 - $2,695",
      priceMin: "1895",
      priceMax: "2695",
      componentPricing: {
        frame: { min: 995, max: 995 },
        hydraulicRam: { min: 0, max: 450 },
        die: { min: 185, max: 185 },
        standMount: { min: 125, max: 125 }
      },
      maxCapacity: "2-3/8\" OD",
      powerType: "Hydraulic",
      bendAngle: 195,
      countryOfOrigin: "USA",
      warranty: "Lifetime (Workmanship & Material)",
      materials: ["Mild Steel", "4130 Chromoly", "Aluminum", "Stainless Steel", "Titanium"],
      pros: [
        "Highly customizable with extensive upgrade options",
        "Excellent build quality and American manufacturing",
        "94° bend achievable without hydraulic adjustment (typical first-stroke market performance is 80-85°)",
        "Low entry price with affordable upgrades",
        "Double-acting hydraulic option (fastest on market)",
        "Superior customer support and technical assistance",
        "Fast lead times: Standard dies typically ship within 1-2 weeks"
      ],
      cons: [
        "Many accessories sold separately",
        "No reverse bending attachment included",
        "Warranty covers workmanship, not unlimited coverage"
      ],
      description: "The RogueFab M6xx series stands out as our top choice for its exceptional combination of performance, customization options, and value. This American-made tube bender offers professional-grade capabilities at a competitive price point with capacity up to 2.375\" OD (larger dies available upon request). Complete setup pricing includes hydraulic ram system, 1.5\" die set, and all mounting hardware - ready to bend out of the box.",
      imageUrl: "https://www.roguefab.com/wp-content/uploads/2023/07/Main-bender-white-background.jpg",
      purchaseUrl: "https://www.roguefab.com/product-category/tubing-benders/",
      category: "professional",
      isRecommended: true,
      totalCostOfOwnership: "1180.00",
      supportQuality: 10,
      buildQuality: 9,
      valueScore: 9,
      features: ["Air/Hydraulic ram upgrade", "Pressure roller dies", "Thin-wall roller", "Backstop", "Rotation gauges", "Mandrel conversion available"],
      mandrelBender: "Available",
      wallThicknessCapacity: "0.156", // 1.75" OD DOM capacity from RogueFab chart
      sBendCapability: true, // RogueFab can make S-bends per documentation
      userReviewRating: "4.9", // From 65 verified reviews shown on website
      userReviewCount: 65,
      importantNotes: [
        "Prices current as of January 2025",
        "Additional dies and accessories sold separately", 
        "Lead times vary by manufacturer (JD2: 6-8 weeks, others: 2-4 weeks)",
        "Hydraulic upgrades available for compatible models"
      ]
    };

    // Baileigh RDB-050
    const baileigh: TubeBender = {
      id: this.currentTubeBenderId++,
      name: "Baileigh RDB-050",
      brand: "Baileigh",
      model: "RDB-050",
      rating: "8.0",
      priceRange: "$2,895 - $3,495",
      priceMin: "2895",
      priceMax: "3495",
      componentPricing: null,
      maxCapacity: "2.5\" OD",
      powerType: "Manual",
      bendAngle: 200,
      countryOfOrigin: "Taiwan",
      warranty: "1 Year Limited",
      materials: ["Mild Steel", "Chromoly", "Aluminum"],
      pros: [
        "Straightforward operation with clear controls",
        "Heavy-duty capacity roll cage tube bender",
        "Everything comes with the bender itself (except dies)",
        "No added accessories needed",
        "Heavy-duty build quality and performance",
        "Multiple speed control options",
        "Lightweight design"
      ],
      cons: [
        "High price tag for manual operation",
        "Dies and reverse bending attachment not included",
        "No lifetime warranty",
        "Requires mounting to floor with concrete anchors"
      ],
      description: "The Baileigh RDB-050 is a manual-type tube bender that outperforms expectations with heavy-duty metal bending capacity. Complete setup includes the bender, stand, 1.5\" die set, and degree markings. Additional dies and hydraulic upgrades available separately.",
      imageUrl: null,
      purchaseUrl: "https://www.baileigh.com/tube-pipe-benders/rotary-draw-benders/rdb-050",
      category: "heavy-duty",
      isRecommended: false,
      totalCostOfOwnership: "2400.00",
      supportQuality: 7,
      buildQuality: 8,
      valueScore: 6,
      features: ["Three-speed settings", "Anti-spring-back mechanism", "Stand included", "Degree dial", "36-inch telescopic handle"],
      mandrelBender: "No",
      wallThicknessCapacity: "0.095",
      sBendCapability: false,
      userReviewRating: "4.1",
      userReviewCount: 43,
      importantNotes: [
        "Prices current as of January 2025",
        "Additional dies and accessories sold separately",
        "Lead times vary by manufacturer (JD2: 6-8 weeks, others: 2-4 weeks)",
        "Hydraulic upgrades available for compatible models"
      ]
    };

    // JD2 Model 32
    const jd2: TubeBender = {
      id: this.currentTubeBenderId++,
      name: "JD2 Model 32",
      brand: "JD2",
      model: "Model 32",
      rating: "8.0",
      priceRange: "$1,545 - $1,895",
      priceMin: "1545",
      priceMax: "1895",
      componentPricing: null,
      maxCapacity: "2\" OD",
      powerType: "Manual",
      bendAngle: 180,
      countryOfOrigin: "USA",
      warranty: "Limited (excludes 3rd party components)",
      materials: ["Mild Steel", "Chromoly", "Aluminum"],
      pros: [
        "Affordable with all add-ons and attachments",
        "Simple construction with fewer maintenance issues",
        "Degree pointer for precision bending angles",
        "Good overall performance",
        "Great die selection available",
        "Manufacturer has decades of experience"
      ],
      cons: [
        "No speed or torque control",
        "Must be mounted to floor with concrete anchors",
        "Warranty excludes 3rd party components",
        "No affordable hydraulic power option from manufacturer",
        "Degree indicator can be accidentally moved (reported in user reviews on YouTube and fabrication forums)",
        "Dies sold separately (4-6 week lead time per JD2.com/lead-times as of June 2025)"
      ],
      description: "The JD2 Model 32 follows a proven 25-year-old design with tweaks for improved operation. Complete manual setup includes base unit, stand, and 1.5\" die set. Made-to-order manufacturing means longer lead times but ensures fresh builds.",
      imageUrl: null,
      purchaseUrl: "#",
      category: "budget",
      isRecommended: false,
      totalCostOfOwnership: "1245.00",
      supportQuality: 6,
      buildQuality: 7,
      valueScore: 8,
      features: ["36-inch telescopic handle", "Degree indicator wheel", "CNC machined surfaces", "25-year proven design"],
      mandrelBender: "No",
      wallThicknessCapacity: "0.120",
      sBendCapability: false,
      userReviewRating: null,
      userReviewCount: null,
      importantNotes: [
        "Prices current as of January 2025",
        "Additional dies and accessories sold separately",
        "Lead times vary by manufacturer (JD2: 6-8 weeks, others: 2-4 weeks)",
        "Hydraulic upgrades available for compatible models"
      ]
    };

    // JD2 Model 32 Hydraulic
    const jd2Hydraulic: TubeBender = {
      id: this.currentTubeBenderId++,
      name: "JD2 Model 32 Hydraulic",
      brand: "JD2",
      model: "Model 32-H",
      rating: "8.5",
      priceRange: "$2,045 - $2,395",
      priceMin: "2045",
      priceMax: "2395",
      componentPricing: null,
      maxCapacity: "2\" OD",
      powerType: "Hydraulic",
      bendAngle: 180,
      countryOfOrigin: "USA",
      warranty: "Limited (excludes 3rd party components)",
      materials: ["Mild Steel", "Chromoly", "Aluminum"],
      pros: [
        "Proven 25-year design reliability",
        "Made in USA with quality construction",
        "Double-acting hydraulic system",
        "Extensive die selection available",
        "Strong aftermarket support",
        "Consistent power delivery"
      ],
      cons: [
        "Higher price than manual version",
        "Degree indicator can be accidentally moved (reported in user reviews on YouTube and fabrication forums)", 
        "Dies sold separately (4-6 week lead time per JD2.com/lead-times as of June 2025)",
        "Requires electrical connection for pump"
      ],
      description: "The JD2 Model 32 Hydraulic combines the proven manual design with a complete hydraulic system. Setup includes base unit, stand, hydraulic pump with controls, and 1.5\" die set. Made-to-order manufacturing ensures fresh builds with latest improvements.",
      imageUrl: null,
      purchaseUrl: "#",
      category: "professional",
      isRecommended: false,
      totalCostOfOwnership: "2220.00",
      supportQuality: 8,
      buildQuality: 8,
      valueScore: 7,
      features: ["Double-acting hydraulic ram", "Electric pump with controls", "Degree markings", "Heavy-duty stand", "Quick-change tooling"],
      mandrelBender: "No",
      wallThicknessCapacity: "0.120",
      sBendCapability: false,
      userReviewRating: null,
      userReviewCount: null,
      importantNotes: [
        "Prices current as of January 2025",
        "Additional dies and accessories sold separately",
        "Lead times vary by manufacturer (JD2: 6-8 weeks, others: 2-4 weeks)",
        "Hydraulic upgrades available for compatible models"
      ]
    };

    // Woodward Fab WFB2
    const woodward: TubeBender = {
      id: this.currentTubeBenderId++,
      name: "Woodward Fab WFB2",
      category: "budget",
      brand: "Woodward Fab",
      model: "WFB2",
      rating: "6.5",
      priceRange: "$839 - $1,195",
      priceMin: "839",
      priceMax: "1195",
      componentPricing: null,
      maxCapacity: "2\" OD",
      powerType: "Manual",
      bendAngle: 180,
      countryOfOrigin: "China",
      warranty: "90 Days",
      materials: ["Mild Steel", "Aluminum"],
      pros: [
        "Very affordable price point",
        "CNC machined components",
        "Engraved degree dial",
        "Space-saving design",
        "Works with square and round tubes"
      ],
      cons: [
        "No provision for extendable handle",
        "Built-in handle only 27 inches",
        "Budget-focused construction",
        "Stand sold separately",
        "Limited material compatibility",
        "Short warranty period"
      ],
      description: "The Woodward Fab WFB2 offers an entry-level solution for light fabrication work. Complete setup includes base unit, basic stand, and 1.5\" die set. While build quality reflects the budget price point, it provides adequate performance for hobby work and light commercial applications.",
      imageUrl: null,
      purchaseUrl: "#",
      isRecommended: false,
      totalCostOfOwnership: "650.00",
      supportQuality: 4,
      buildQuality: 5,
      valueScore: 7,
      features: ["29-inch handle", "Engraved degree dial", "CNC machined components", "Compact design"],
      mandrelBender: "No",
      wallThicknessCapacity: "0.120",
      sBendCapability: false,
      userReviewRating: null,
      userReviewCount: null,
      importantNotes: [
        "Prices current as of January 2025",
        "Additional dies and accessories sold separately",
        "Lead times vary by manufacturer (JD2: 6-8 weeks, others: 2-4 weeks)",
        "Hydraulic upgrades available for compatible models"
      ]
    };

    // JMR TBM-250R RaceLine
    const jmrRaceline: TubeBender = {
      id: this.currentTubeBenderId++,
      name: "JMR TBM-250R RaceLine",
      brand: "JMR Manufacturing",
      model: "TBM-250R",
      rating: "8.5",
      priceRange: "$780 - $950",
      priceMin: "780",
      priceMax: "950",
      componentPricing: null,
      maxCapacity: "2\" OD",
      powerType: "Manual",
      bendAngle: 180,
      countryOfOrigin: "USA",
      warranty: "1 Year Limited",
      materials: ["Mild Steel", "Chromoly", "Aluminum", "Stainless Steel"],
      pros: [
        "American-made quality construction",
        "3-speed manual operation",
        "Heat treated 4140 steel pins",
        "Upgradeable to hydraulic power",
        "Fast shipping (typically 1 week)",
        "Nylon/graphite bushings at pivot points"
      ],
      cons: [
        "Dies sold separately (4-6 week lead time per JMR website)",
        "Uncoated steel arms require maintenance",
        "Higher price than budget options",
        "Limited to 2\" capacity without hydraulic upgrade"
      ],
      description: "The JMR TBM-250R RaceLine offers American-made quality at an accessible price point. Features 3-speed manual operation with heat-treated components and upgrade path to hydraulics. Complete setup includes bender frame, degree ring, and warranty.",
      imageUrl: null,
      purchaseUrl: "#",
      category: "professional",
      isRecommended: false,
      totalCostOfOwnership: "580.00",
      supportQuality: 8,
      buildQuality: 8,
      valueScore: 7,
      features: ["3-speed operation", "Degree ring with pointer", "Heat-treated pins", "Hydraulic upgrade path"],
      mandrelBender: "No",
      wallThicknessCapacity: "0.120",
      sBendCapability: false,
      userReviewRating: null,
      userReviewCount: null,
      importantNotes: [
        "Prices current as of January 2025",
        "Additional dies and accessories sold separately",
        "Lead times vary by manufacturer (JD2: 6-8 weeks, others: 2-4 weeks)",
        "Hydraulic upgrades available for compatible models"
      ]
    };

    // JMR TBM-250U Ultra
    const jmrUltra: TubeBender = {
      id: this.currentTubeBenderId++,
      name: "JMR TBM-250 RaceLine",
      brand: "JMR Manufacturing",
      model: "TBM-250U RaceLine",
      rating: "9.0",
      priceRange: "$1,000 - $1,250",
      priceMin: "1000",
      priceMax: "1250",
      componentPricing: null,
      maxCapacity: "2\" OD",
      powerType: "Manual",
      bendAngle: 180,
      countryOfOrigin: "USA",
      warranty: "1 Year Limited",
      materials: ["Mild Steel", "Chromoly", "Aluminum", "Stainless Steel"],
      pros: [
        "Premium JMR construction quality",
        "Bronze bushings for smooth operation",
        "Powder-coated finish",
        "5-speed operation for precision",
        "Upgradeable to 2.5\" with hydraulics",
        "Fast shipping and strong support"
      ],
      cons: [
        "Highest price in manual category",
        "Dies sold separately with lead times",
        "Requires floor mounting for stability",
        "Premium features may be overkill for hobby use"
      ],
      description: "The JMR TBM-250U Ultra represents the pinnacle of manual tube bender construction. Features bronze bushings, powder-coated finish, and 5-speed operation. Professional-grade build quality with hydraulic upgrade capability to 2.5\" capacity.",
      imageUrl: null,
      purchaseUrl: "#",
      category: "professional",
      isRecommended: false,
      totalCostOfOwnership: "780.00",
      supportQuality: 9,
      buildQuality: 9,
      valueScore: 6,
      features: ["5-speed operation", "Bronze bushings", "Powder-coated finish", "Premium construction"],
      mandrelBender: "No",
      wallThicknessCapacity: "0.120",
      sBendCapability: false,
      userReviewRating: null,
      userReviewCount: null,
      importantNotes: [
        "Prices current as of January 2025",
        "Additional dies and accessories sold separately",
        "Lead times vary by manufacturer (JD2: 6-8 weeks, others: 2-4 weeks)",
        "Hydraulic upgrades available for compatible models"
      ]
    };

    // Pro-Tools 105HD
    const proTools105: TubeBender = {
      id: this.currentTubeBenderId++,
      name: "Pro-Tools 105HD Heavy Duty",
      brand: "Pro-Tools",
      model: "105HD",
      rating: "8.0",
      priceRange: "$1,264 - $1,609",
      priceMin: "1264",
      priceMax: "1609",
      componentPricing: null,
      maxCapacity: "2\" OD",
      powerType: "Manual",
      bendAngle: 180,
      countryOfOrigin: "USA",
      warranty: "1 Year Manufacturing Defects",
      materials: ["Mild Steel", "Chromoly", "Aluminum"],
      pros: [
        "Heavy-duty 5/8\" thick main frame arms",
        "100% USA designed and manufactured",
        "Steel bushings for durability",
        "Integrated degree plate included",
        "Hydraulic upgrade available",
        "Strong reputation in professional market"
      ],
      cons: [
        "Higher price point for manual operation",
        "Steel bushings require more maintenance than bronze",
        "Limited wall thickness (0.134\" max)",
        "Dies packages increase total cost significantly"
      ],
      description: "The Pro-Tools 105HD represents American manufacturing excellence with heavy-duty construction. Features 5/8\" thick frame arms and steel bushings. Complete packages available with dies, or buy components separately for custom setups.",
      imageUrl: null,
      purchaseUrl: "#",
      category: "professional",
      isRecommended: false,
      totalCostOfOwnership: "1264.00",
      supportQuality: 8,
      buildQuality: 8,
      valueScore: 5,
      features: ["5/8\" thick frame arms", "Steel bushings", "Degree plate", "USA manufactured"],
      mandrelBender: "No",
      wallThicknessCapacity: "0.120",
      sBendCapability: false,
      userReviewRating: null,
      userReviewCount: null,
      importantNotes: [
        "Prices current as of January 2025",
        "Additional dies and accessories sold separately",
        "Lead times vary by manufacturer (JD2: 6-8 weeks, others: 2-4 weeks)",
        "Hydraulic upgrades available for compatible models"
      ]
    };

    // Pro-Tools BRUTE Hydraulic
    const proToolsBrute: TubeBender = {
      id: this.currentTubeBenderId++,
      name: "Pro-Tools BRUTE Hydraulic",
      brand: "Pro-Tools",
      model: "BRUTE",
      rating: "9.5",
      priceRange: "$4,500 - $6,500",
      priceMin: "4500",
      priceMax: "6500",
      componentPricing: null,
      maxCapacity: "2.5\" OD",
      powerType: "Hydraulic",
      bendAngle: 180,
      countryOfOrigin: "USA",
      warranty: "1 Year Manufacturing Defects",
      materials: ["Mild Steel", "Chromoly", "Aluminum", "Stainless Steel"],
      pros: [
        "Highest capacity at 2.5\" tube capability",
        "15-ton hydraulic cylinder with 16\" stroke",
        "1\" thick main bending frame",
        "Integrated CNC machined degree ring",
        "100% USA designed and assembled",
        "Professional production capability"
      ],
      cons: [
        "Highest price point in comparison",
        "Requires compressed air for operation",
        "Heavy unit requiring permanent installation",
        "Dies sold separately at premium pricing"
      ],
      description: "The Pro-Tools BRUTE sets the standard for hydraulic tube bending with 2.5\" capacity and 15-ton power. Features 1\" thick frame construction and CNC machined components throughout. Built for production environments and professional fabrication shops.",
      imageUrl: null,
      purchaseUrl: "#",
      category: "professional",
      isRecommended: false,
      totalCostOfOwnership: "4500.00",
      supportQuality: 9,
      buildQuality: 10,
      valueScore: 4,
      features: ["15-ton hydraulic cylinder", "1\" thick frame", "CNC machined degree ring", "2.5\" capacity"],
      mandrelBender: "No",
      wallThicknessCapacity: "0.120",
      sBendCapability: false,
      userReviewRating: null,
      userReviewCount: null,
      importantNotes: [
        "Prices current as of January 2025",
        "Additional dies and accessories sold separately",
        "Lead times vary by manufacturer (JD2: 6-8 weeks, others: 2-4 weeks)",
        "Hydraulic upgrades available for compatible models"
      ]
    };

    // Mittler Bros Model 2500
    const mittler2500: TubeBender = {
      id: this.currentTubeBenderId++,
      name: "Mittler Bros Model 2500",
      brand: "Mittler Bros",
      model: "2500-HD",
      rating: "8.5",
      priceRange: "$3,200 - $4,200",
      priceMin: "3200",
      priceMax: "4200",
      componentPricing: null,
      maxCapacity: "2\" OD",
      powerType: "Hydraulic",
      bendAngle: 180,
      countryOfOrigin: "USA",
      warranty: "1 Year Limited",
      materials: ["Mild Steel", "Chromoly", "Aluminum"],
      pros: [
        "25-ton hydraulic ram capacity",
        "180° bending capability",
        "Portable work stand available",
        "Established manufacturer with long history",
        "Heavy-duty construction",
        "Good aftermarket support"
      ],
      cons: [
        "Higher price than manual alternatives",
        "Requires hydraulic pump setup",
        "Heavy unit for portable applications",
        "Limited material compatibility compared to competitors"
      ],
      description: "The Mittler Bros Model 2500 combines traditional American manufacturing with modern hydraulic power. Features 25-ton ram capacity and 180° bending capability. Available with portable stand for shop flexibility.",
      imageUrl: null,
      purchaseUrl: "#",
      category: "professional",
      isRecommended: false,
      totalCostOfOwnership: "3200.00",
      supportQuality: 7,
      buildQuality: 8,
      valueScore: 5,
      features: ["25-ton hydraulic ram", "180° bending", "Portable stand option", "Heavy-duty design"],
      mandrelBender: "No",
      wallThicknessCapacity: "0.120",
      sBendCapability: false,
      userReviewRating: null,
      userReviewCount: null,
      importantNotes: [
        "Prices current as of January 2025",
        "Additional dies and accessories sold separately",
        "Lead times vary by manufacturer (JD2: 6-8 weeks, others: 2-4 weeks)",
        "Hydraulic upgrades available for compatible models"
      ]
    };

    // Hossfeld Standard Model No. 2
    const hossfeld: TubeBender = {
      id: this.currentTubeBenderId++,
      name: "Hossfeld Standard Model No. 2",
      brand: "Hossfeld",
      model: "Standard No. 2",
      rating: "7.5",
      priceRange: "$1,800 - $2,500",
      priceMin: "1800",
      priceMax: "2500",
      componentPricing: null,
      maxCapacity: "2\" OD",
      powerType: "Manual",
      bendAngle: 180,
      countryOfOrigin: "USA",
      warranty: "Limited Warranty",
      materials: ["Mild Steel", "Chromoly", "Aluminum", "Flat Bar", "Angle Iron"],
      pros: [
        "100+ years of manufacturing experience",
        "Largest selection of tooling available",
        "Universal design handles multiple materials",
        "Hydraulic power option available",
        "Classic proven design",
        "Strong resale value"
      ],
      cons: [
        "Older design lacks modern conveniences",
        "Tooling costs add up quickly",
        "Learning curve for optimal setup",
        "Manual operation requires significant effort"
      ],
      description: "The Hossfeld Standard Model No. 2 represents over 100 years of bending innovation. Features universal design for tube, pipe, flat bar, and angle iron. Extensive tooling catalog available with hydraulic upgrade options.",
      imageUrl: null,
      purchaseUrl: "#",
      category: "professional",
      isRecommended: false,
      totalCostOfOwnership: "1800.00",
      supportQuality: 6,
      buildQuality: 7,
      valueScore: 6,
      features: ["Universal material capability", "Extensive tooling catalog", "100+ year heritage", "Hydraulic upgrade option"],
      mandrelBender: "No",
      wallThicknessCapacity: "0.120",
      sBendCapability: false,
      userReviewRating: null,
      userReviewCount: null,
      importantNotes: [
        "Prices current as of January 2025",
        "Additional dies and accessories sold separately",
        "Lead times vary by manufacturer (JD2: 6-8 weeks, others: 2-4 weeks)",
        "Hydraulic upgrades available for compatible models"
      ]
    };

    const swagOffRoad: TubeBender = {
      id: this.currentTubeBenderId++,
      name: "SWAG Off Road REV 2",
      brand: "SWAG Off Road",
      model: "REV 2",
      rating: "9.6",
      priceRange: "$970 - $1,250",
      priceMin: "970",
      priceMax: "1250",
      componentPricing: null,
      maxCapacity: "2.0\" OD",
      powerType: "Manual/Hydraulic",
      bendAngle: 180,
      countryOfOrigin: "USA",
      warranty: "1 Year Limited",
      materials: ["Round Tube", "DOM Tubing", "Chromoly"],
      pros: [
        "Exceptional build quality and tight tolerances",
        "Oil-impregnated bronze bushings for smooth operation",
        "Precision machined aluminum degree wheel",
        "95% pre-assembled for quick setup",
        "Superior repeatability compared to competitors",
        "Made in USA with premium materials"
      ],
      cons: [
        "Proprietary die system (not compatible with JD2)",
        "Higher initial cost than basic alternatives",
        "Currently limited die selection compared to established brands",
        "Dies sold separately unless specifically bundled"
      ],
      description: "The SWAG Off Road REV 2 represents the pinnacle of precision tube bending equipment. Designed, machined, and assembled in Oregon, USA, it features exceptional tolerances and professional-grade components throughout.",
      imageUrl: null,
      purchaseUrl: "https://www.swagoffroad.com/products/swag-rev-2-tubing-bender",
      category: "professional",
      isRecommended: false,
      totalCostOfOwnership: "970.00",
      supportQuality: 9,
      buildQuality: 10,
      valueScore: 8,
      features: ["Precision machined components", "Oil-impregnated bronze bushings", "Machined aluminum degree wheel", "2\" receiver hitch mount"],
      mandrelBender: "No",
      wallThicknessCapacity: "0.120",
      sBendCapability: false,
      userReviewRating: null,
      userReviewCount: null,
      importantNotes: [
        "Prices current as of January 2025",
        "Additional dies and accessories sold separately",
        "Lead times vary by manufacturer (JD2: 6-8 weeks, others: 2-4 weeks)",
        "Hydraulic upgrades available for compatible models"
      ]
    };

    // Add missing fields to all records
    const addMissingFields = (bender: any) => ({
      ...bender,
      wallThicknessCapacity: bender.wallThicknessCapacity || null,
      sBendCapability: bender.sBendCapability || false,
      userReviewRating: bender.userReviewRating || null,
      userReviewCount: bender.userReviewCount || 0
    });

    this.tubeBenders.set(rogueFab.id, addMissingFields(rogueFab));
    this.tubeBenders.set(baileigh.id, addMissingFields(baileigh));
    this.tubeBenders.set(jd2.id, addMissingFields(jd2));
    this.tubeBenders.set(jd2Hydraulic.id, addMissingFields(jd2Hydraulic));
    this.tubeBenders.set(jmrRaceline.id, addMissingFields(jmrRaceline));
    this.tubeBenders.set(jmrUltra.id, addMissingFields(jmrUltra));
    this.tubeBenders.set(proTools105.id, addMissingFields(proTools105));
    this.tubeBenders.set(proToolsBrute.id, addMissingFields(proToolsBrute));
    this.tubeBenders.set(mittler2500.id, addMissingFields(mittler2500));
    this.tubeBenders.set(hossfeld.id, addMissingFields(hossfeld));
    this.tubeBenders.set(woodward.id, addMissingFields(woodward));
    this.tubeBenders.set(swagOffRoad.id, addMissingFields(swagOffRoad));
  }

  async getTubeBenders(): Promise<TubeBender[]> {
    return Array.from(this.tubeBenders.values());
  }

  async getTubeBender(id: number): Promise<TubeBender | undefined> {
    return this.tubeBenders.get(id);
  }

  async getTubeBendersByBrand(brand: string): Promise<TubeBender[]> {
    return Array.from(this.tubeBenders.values()).filter(
      (bender) => bender.brand.toLowerCase() === brand.toLowerCase()
    );
  }

  async getRecommendedTubeBenders(): Promise<TubeBender[]> {
    return Array.from(this.tubeBenders.values()).filter(
      (bender) => bender.isRecommended
    );
  }

  async getTubeBendersByCategory(category: string): Promise<TubeBender[]> {
    return Array.from(this.tubeBenders.values()).filter(
      (bender) => bender.category === category
    );
  }

  async createTubeBender(insertTubeBender: InsertTubeBender): Promise<TubeBender> {
    const id = this.currentTubeBenderId++;
    const tubeBender: TubeBender = { 
      ...insertTubeBender, 
      id,
      description: insertTubeBender.description || "",
      imageUrl: insertTubeBender.imageUrl || null,
      purchaseUrl: insertTubeBender.purchaseUrl || null,
      totalCostOfOwnership: insertTubeBender.totalCostOfOwnership || null,
      mandrelBender: insertTubeBender.mandrelBender || "No",
      priceMin: insertTubeBender.priceMin || null,
      priceMax: insertTubeBender.priceMax || null,
      userReviewCount: insertTubeBender.userReviewCount || null
    };
    this.tubeBenders.set(id, tubeBender);
    return tubeBender;
  }

  async getComparisons(): Promise<Comparison[]> {
    return Array.from(this.comparisons.values());
  }

  async getComparison(id: number): Promise<Comparison | undefined> {
    return this.comparisons.get(id);
  }

  async createComparison(insertComparison: InsertComparison): Promise<Comparison> {
    const id = this.currentComparisonId++;
    const comparison: Comparison = { 
      ...insertComparison, 
      id,
      description: insertComparison.description || null
    };
    this.comparisons.set(id, comparison);
    return comparison;
  }

  async createCostCalculation(insertCalculation: InsertCostCalculation): Promise<CostCalculation> {
    const id = this.currentCostCalculationId++;
    const calculation: CostCalculation = { 
      ...insertCalculation, 
      id,
      productId: insertCalculation.productId || null
    };
    this.costCalculations.set(id, calculation);
    return calculation;
  }

  async getCostCalculationsByProduct(productId: number): Promise<CostCalculation[]> {
    return Array.from(this.costCalculations.values()).filter(
      (calc) => calc.productId === productId
    );
  }

  async updateTubeBenderCategory(id: number, category: string): Promise<TubeBender | null> {
    const existing = this.tubeBenders.get(id);
    if (!existing) {
      return null;
    }

    const updated: TubeBender = {
      ...existing,
      category
    };

    this.tubeBenders.set(id, updated);
    return updated;
  }

  async updateTubeBender(id: number, updates: Partial<TubeBender>): Promise<TubeBender | null> {
    const existing = this.tubeBenders.get(id);
    if (!existing) {
      return null;
    }

    const updated: TubeBender = {
      ...existing,
      ...updates,
      priceMin: updates.priceMin ?? existing.priceMin,
      priceMax: updates.priceMax ?? existing.priceMax,
    };

    this.tubeBenders.set(id, updated);
    return updated;
  }

  // Admin User Methods
  async getAdminByUsername(username: string): Promise<AdminUser | undefined> {
    return Array.from(this.adminUsers.values()).find(admin => admin.username === username);
  }

  async getAdminByEmail(email: string): Promise<AdminUser | undefined> {
    return Array.from(this.adminUsers.values()).find(admin => admin.email === email);
  }

  async createAdmin(admin: Omit<AdminUser, 'id'>): Promise<AdminUser> {
    const id = this.currentAdminUserId++;
    const newAdmin: AdminUser = { 
      ...admin, 
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.adminUsers.set(id, newAdmin);
    return newAdmin;
  }

  async updateAdminLoginAttempts(id: number, attempts: number, lockedUntil?: string): Promise<AdminUser | null> {
    const existing = this.adminUsers.get(id);
    if (!existing) {
      return null;
    }

    const updated: AdminUser = {
      ...existing,
      loginAttempts: attempts,
      lockedUntil: lockedUntil || null,
      updatedAt: new Date().toISOString()
    };

    this.adminUsers.set(id, updated);
    return updated;
  }

  async updateAdminLastLogin(id: number, lastLogin: string): Promise<AdminUser | null> {
    const existing = this.adminUsers.get(id);
    if (!existing) {
      return null;
    }

    const updated: AdminUser = {
      ...existing,
      lastLogin,
      loginAttempts: 0, // Reset login attempts on successful login
      lockedUntil: null, // Clear any lockout
      updatedAt: new Date().toISOString()
    };

    this.adminUsers.set(id, updated);
    return updated;
  }

  async updateAdminEmail(id: number, email: string): Promise<AdminUser | null> {
    const existing = this.adminUsers.get(id);
    if (!existing) {
      return null;
    }

    const updated: AdminUser = {
      ...existing,
      email,
      updatedAt: new Date().toISOString()
    };

    this.adminUsers.set(id, updated);
    return updated;
  }

  async getAllAdmins(): Promise<AdminUser[]> {
    return Array.from(this.adminUsers.values());
  }
}

export const storage = new MemStorage();
