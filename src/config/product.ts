export interface ProductConfig {
  name: string;
  subtitle: string;
  brand: string;
  slogan: string;
  supportEmail: string;
  format: string;
  price: number;
  currency: string;
  currencySymbol: string;
  pagesEstimate: string;
  ebookPdfPath: string;
  ebookFilename: string;
  includesWorksheets: boolean;
  targetMarkets: string[];
}

export const PRODUCT_CONFIG: ProductConfig = {
  name: "Smart Money",
  subtitle: "A Simple Guide to Budgeting, Saving, and Feeling More in Control",
  brand: "QEVORIN",
  slogan: "Plan Smarter. Save Better. Live With Confidence.",
  supportEmail: "support@qevorin.online",
  format: "PDF Digital Download",
  price: 149, // Change in one place to update everywhere
  currency: "USD",
  currencySymbol: "$",
  pagesEstimate: "12-page practical workbook & printable sheets",
  ebookPdfPath: "/assets/aistudio/Qevorin_Smart_Money_Ebook_b0515eee.pdf",
  ebookFilename: "Qevorin_Smart_Money_Ebook_2026.pdf",
  includesWorksheets: true,
  targetMarkets: [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Worldwide"
  ]
};

export interface Chapter {
  number: number;
  title: string;
  summary: string;
  isWorksheet?: boolean;
  takeaway: string;
}

export const CHAPTERS: Chapter[] = [
  {
    number: 1,
    title: "Start With Your Money Snapshot",
    summary: "Establish an honest baseline of where your cash flow currently stands without shame or judgment.",
    takeaway: "Calculate your net monthly cash flow in under 20 minutes."
  },
  {
    number: 2,
    title: "Build a Budget You Can Maintain",
    summary: "Create a flexible 3-bucket spending structure designed for real life, not rigid deprivation.",
    takeaway: "Say goodbye to 40-category spreadsheets you abandon after two weeks."
  },
  {
    number: 3,
    title: "Track Spending Without Stress",
    summary: "Simple, friction-free methods to keep an eye on transactions without manual logging fatigue.",
    takeaway: "Master the 5-minute weekly spending review."
  },
  {
    number: 4,
    title: "Make Saving a Habit",
    summary: "Automate steady micro-savings so your cushion grows quietly in the background every month.",
    takeaway: "Automated deposit rules that work with any bank account."
  },
  {
    number: 5,
    title: "Prepare for Emergencies and Irregular Costs",
    summary: "Build a resilient buffer fund for annual car insurance, vet visits, and unexpected repairs.",
    takeaway: "The sinking fund formula that prevents surprise overdrafts."
  },
  {
    number: 6,
    title: "Reduce Spending Without Feeling Deprived",
    summary: "Identify high-friction subscription leaks and renegotiate recurring bills painlessly.",
    takeaway: "Prune up to $200 in monthly recurring waste without lowering your lifestyle."
  },
  {
    number: 7,
    title: "Your 30-Day Money Reset",
    summary: "A step-by-step calendar roadmap that transforms clarity into calm, lasting financial confidence.",
    takeaway: "Daily micro-actions to recalibrate your relationship with money."
  },
  {
    number: 8,
    title: "Monthly Budget Worksheet",
    summary: "Clean, high-resolution printable PDF worksheet to map out your monthly allocations on paper.",
    isWorksheet: true,
    takeaway: "Ready to print or fill digitally on iPad/tablet."
  },
  {
    number: 9,
    title: "Weekly Check-In & Savings Goal Planner",
    summary: "Printable milestone trackers to celebrate every savings breakthrough on your personal journey.",
    isWorksheet: true,
    takeaway: "Visual progress circles to stay motivated month after month."
  }
];

export const FAQS = [
  {
    question: "What format is the eBook?",
    answer: "Smart Money is provided in universal high-resolution PDF format. It includes the complete practical workbook guide along with high-resolution printable budget worksheets and planners."
  },
  {
    question: "How will I receive my purchase?",
    answer: "Immediately after your order is confirmed, you will receive an instant on-screen download link on the checkout confirmation screen. A backup download link with your access receipt is also sent directly to your email address."
  },
  {
    question: "Is this suitable for beginners?",
    answer: "Yes, absolutely. Smart Money was written specifically for beginners and everyday people. There is zero complicated financial jargon, no high-finance math, and no complex spreadsheet formulas to configure."
  },
  {
    question: "Can I read it on my phone or tablet?",
    answer: "Yes. The PDF is compatible with all modern devices: smartphones (iPhone and Android), tablets (iPad, Samsung Galaxy Tab, etc.), e-readers that support PDF, and desktop computers (Mac and PC)."
  },
  {
    question: "Is this financial advice?",
    answer: "No. Smart Money by QEVORIN is an educational self-help guide designed to teach personal organization, budgeting habits, and mindful spending strategies. It does not constitute licensed financial, investment, legal, or tax advice. For specific investment or tax situations, please consult a certified financial planner."
  },
  {
    question: "How can I contact customer support?",
    answer: "Our customer support team is always ready to assist you. You can reach us anytime directly via email at support@qevorin.online. We typically respond within 24 business hours."
  }
];
