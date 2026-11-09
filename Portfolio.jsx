import React, { useState, useEffect, useRef, useCallback } from "react";

// ==========================================
// DESIGN SYSTEM - APPLE / LINEAR / VERCEL INSPIRED
// ==========================================
const THEMES = {
  dark: {
    id: "dark",
    bg: "#0B0C10",
    bgSec: "#12141C",
    cardBg: "rgba(18, 20, 28, 0.75)",
    cardHover: "rgba(25, 28, 40, 0.9)",
    border: "rgba(255, 255, 255, 0.08)",
    borderHover: "rgba(59, 130, 246, 0.4)",
    glow: "rgba(59, 130, 246, 0.25)",
    textPrimary: "#F8FAFC",
    textSecondary: "#94A3B8",
    textMuted: "#64748B",
    accent: "#3B82F6", // Electric Blue
    accentGlow: "#8B5CF6", // Purple Glow
    gradientText: "linear-gradient(135deg, #60A5FA 0%, #A855F7 50%, #EC4899 100%)",
    pillBg: "rgba(59, 130, 246, 0.1)",
    pillText: "#93C5FD",
    pillBorder: "rgba(59, 130, 246, 0.25)",
  },
  light: {
    id: "light",
    bg: "#F8FAFC",
    bgSec: "#FFFFFF",
    cardBg: "rgba(255, 255, 255, 0.9)",
    cardHover: "#FFFFFF",
    border: "rgba(226, 232, 240, 0.8)",
    borderHover: "rgba(59, 130, 246, 0.4)",
    glow: "rgba(59, 130, 246, 0.15)",
    textPrimary: "#0F172A",
    textSecondary: "#475569",
    textMuted: "#64748B",
    accent: "#2563EB",
    accentGlow: "#7C3AED",
    gradientText: "linear-gradient(135deg, #1D4ED8 0%, #6D28D9 50%, #DB2777 100%)",
    pillBg: "rgba(37, 99, 235, 0.08)",
    pillText: "#1D4ED8",
    pillBorder: "rgba(37, 99, 235, 0.2)",
  },
};

// ==========================================
// PORTFOLIO CONTENT & STORIES DATA
// ==========================================
const STORIES = [
  {
    id: "shrimant",
    role: "Operations Lead",
    organization: "Shrimant Garjana Vadya Pathak",
    date: "2023 — Present",
    title: "Reviving a Cultural Organization After COVID",
    shortDesc:
      "Played a key role in reviving a cultural organization that was on the verge of shutting down after COVID by rebuilding operations, scaling membership, managing finances, leading recruitment, and ensuring successful execution of large-scale events.",
    metrics: [
      "150–200 Members",
      "Operations Lead",
      "₹1–5L Annual Budget",
      "Marketing Lead",
      "Inventory Management",
      "Live Event Operations",
    ],
    // Case Study Detail
    overview:
      "Shrimant Garjana Vadya Pathak is a premier 150–200 member cultural performance organization in Pune. Post-COVID shutdowns left the group dormant, lacking venue access, leadership structure, and operating funds.",
    situation:
      "The organization was on the verge of shutting down. Practice grounds were lost, core members had dispersed, and annual event commitments were approaching fast.",
    task: "As Operations Lead, I took complete ownership of rebuilding organizational infrastructure, recruiting team leads, securing a new rehearsal venue, and managing a ₹1–5L operating budget.",
    action: [
      "Secured a new long-term practice facility through multi-stakeholder negotiations.",
      "Restructured leadership into dedicated sub-teams (Logistics, Sound & Equipment, Finance, Safety).",
      "Designed and deployed a unified visual recruitment campaign with strict brand guidelines.",
      "Managed ₹1–5L annual budget, controlling vendor sourcing, transport, and equipment inventory.",
    ],
    result:
      "Successfully scaled active membership back to 150–200 members, culminating in a headline performance at the historic Shree Kesariwada Ganpati.",
    learnings:
      "High-stakes operations require clear delegation, transparent budgeting, and crisis-proof contingency planning.",
    improveToday:
      "I would instrument a digital attendance and inventory tracking app to streamline real-time equipment check-ins.",
  },
  {
    id: "mentora",
    role: "Founder",
    organization: "Mentora.ai",
    date: "Nov 2025 — Present",
    title: "Building an AI Learning Platform",
    shortDesc:
      "Built an AI-powered learning platform focused on making education personalized, structured, and easier to understand through multiple AI models and product-first thinking.",
    metrics: [
      "Founder",
      "AI Product",
      "Product Strategy",
      "MVP",
      "User Research",
      "Analytics",
    ],
    overview:
      "Mentora.ai is a solo-founded learning operating system that consolidates scattered video lectures, notes, and coding exercises into structured, step-by-step career roadmaps.",
    situation:
      "Students waste hours jumping between fragmented YouTube videos, PDF notes, and coding practice platforms without clear structure or feedback.",
    task: "Solely responsible for product vision, writing PRDs, conducting user research, architecting multi-LLM pipelines, and instrumenting analytics.",
    action: [
      "Conducted 50+ user interviews to identify key drop-off points in online self-learning.",
      "Pivoted away from video generation after testing showed LLMs failed to generate quality >15s videos — refocusing on interactive text micro-modules.",
      "Redesigned AI responses into structured micro-chunks (CodePractice, QuizPractice, PredictPractice) — dropping bounce rate from 75% to 45%.",
      "Architected multi-model LLM failover (~18,000 req/day across 4 providers) guaranteeing 99.9% uptime.",
      "Instrumented GA4 & GTM event tracking and pitched Act Grants for campus distribution.",
    ],
    result:
      "Grew platform to 250+ active users with high engagement across structured micro-chunks.",
    learnings:
      "Killing features fast based on user data (like video generation) is critical for MVP velocity.",
    improveToday:
      "I would introduce peer-learning cohort features earlier to drive organic viral growth.",
  },
  {
    id: "mango-d2c",
    role: "Founder",
    organization: "Seasonal Mango Business",
    date: "Apr 2024 — Present (seasonal)",
    title: "Building a Seasonal Business",
    shortDesc:
      "Built and managed a seasonal direct-to-consumer business involving sourcing, pricing, marketing, customer acquisition, logistics, and repeat customer management.",
    metrics: [
      "Entrepreneur",
      "Sales",
      "Marketing",
      "Operations",
      "Customer Management",
      "Business Strategy",
    ],
    overview:
      "A seasonal direct-to-consumer produce enterprise operated independently alongside academic studies.",
    situation:
      "Perishable produce requires precise demand forecasting, tight margin management, and rapid delivery loops with zero ad spend.",
    task: "Sole operator responsible for farm sourcing, pricing model, customer acquisition, doorstep fulfillment, and unit economics.",
    action: [
      "Established direct farm sourcing partnerships to guarantee quality and eliminate middleman markups.",
      "Calculated exact unit economics (gross margins, wastage allowance, doorstep delivery cost).",
      "Ran targeted WhatsApp & community word-of-mouth marketing campaigns.",
      "Managed doorstep deliveries and customer feedback loops independently.",
    ],
    result:
      "Achieved day-one profitability with high customer retention and repeat order rates.",
    learnings:
      "Hands-on unit economics and direct customer communication build grounded business intuition.",
    improveToday:
      "I would set up a pre-order subscription portal to lock in 60% of revenue prior to harvest.",
  },
  {
    id: "social-workers",
    role: "Co-Founder",
    organization: "Social Workers Pune",
    date: "Feb 2024 — Present",
    title: "Building Community Through Action",
    shortDesc:
      "Co-founded a community initiative focused on environmental and social impact by organizing volunteers, coordinating events, and executing community-driven initiatives.",
    metrics: [
      "Leadership",
      "Volunteer Management",
      "Operations",
      "Community Building",
      "Execution",
    ],
    overview:
      "A grassroots community action group mobilizing youth for local environmental and civic welfare drives.",
    situation:
      "Local civic issues lacked structured volunteer coordination and sustained follow-through.",
    task: "Co-led volunteer recruitment, event permissions, logistics, and on-ground execution.",
    action: [
      "Co-organized 12+ civic and social welfare drives across the Pune region.",
      "Managed and onboarded a core team of 50+ active volunteers.",
      "Streamlined volunteer scheduling workflows, increasing drive turnout by 40%.",
    ],
    result:
      "Established a reliable youth volunteer network executing monthly high-impact drives.",
    learnings:
      "Volunteers stay engaged when drive objectives are crystal-clear and impact is immediately visible.",
    improveToday:
      "I would formalize partner NGO sponsorships to scale event funding.",
  },
  {
    id: "zomato",
    role: "Data Analyst",
    organization: "Zomato Delivery Dataset",
    date: "2024",
    title: "Zomato Delivery Performance Analysis",
    category: "Data Analytics",
    shortDesc:
      "Analyzed 45,584 delivery records to identify key operational patterns across road traffic density, adverse weather conditions, and multiple delivery assignments using Python, MySQL, and Power BI.",
    metrics: [
      "Data Analysis",
      "SQL & Python",
      "Data Cleaning",
      "Exploratory Analysis",
      "Operational Analytics",
      "Power BI Dashboard",
    ],
    overview:
      "Analyzed delivery performance and operational patterns using the Zomato Delivery Dataset containing 45,584 records. The core objective was to identify observed patterns in delivery time across critical operational dimensions including road traffic density, weather conditions, and multiple delivery assignments per delivery partner.",
    situation:
      "Food delivery platforms operate in dynamic urban environments where order fulfillment times vary significantly. Understanding operational bottlenecks—without attributing unverified causation—is essential for baseline benchmarking, dispatch planning, and service level agreement (SLA) estimation across varied field conditions.",
    task:
      "Perform end-to-end data preparation, cleaning, exploratory data analysis, relational SQL querying, and build an executive Power BI dashboard to evaluate delivery times and visualize patterns across traffic, weather, and multi-drop orders.",
    action: [
      "Inspected dataset dimensions (45,584 rows), data types, descriptive statistics, and missing value patterns using Python (Pandas & NumPy).",
      "Executed missing-value handling, including median imputation for numerical features and mode imputation for categorical attributes (Weather_conditions, Road_traffic_density, City, Festival, multiple_deliveries).",
      "Formatted date and time fields and validated delivery time ranges (10 to 54 minutes) before exporting the cleaned dataset.",
      "Imported the cleaned dataset into MySQL; structured analytical queries grouping orders by traffic density, weather, vehicle conditions, city tiers, and multiple delivery loads.",
      "Developed an interactive Power BI dashboard featuring executive KPI cards, condition-based distribution charts, and granular multi-delivery breakdowns.",
    ],
    result:
      "Delivered a structured operational analysis of 45,584 orders highlighting key empirical benchmarks: average delivery time of 26.29 minutes, with clear observed differences between Jam traffic (31.18 min) vs Low traffic (21.46 min), and single deliveries (26.72 min) vs triple deliveries (47.82 min).",
    learnings:
      "Data analysis in logistics requires rigorous handling of missing categories (mode imputation) and careful framing—presenting correlations as observed operational patterns rather than definitive proof of causation.",
    improveToday:
      "Instrument geospatial route-distance metrics (haversine formula) and time-of-day order velocity to deepen traffic-delay regression models.",
    tools: ["Python", "Pandas", "NumPy", "MySQL", "Power BI"],
    datasetDetails: {
      source: "Zomato Delivery Dataset",
      records: "45,584 records",
      problem: "Analyzing operational variance in food delivery fulfillment time across city traffic, atmospheric conditions, and multi-drop batching."
    },
    kpis: [
      { label: "Total Orders Analyzed", value: "45,584" },
      { label: "Average Delivery Time", value: "26.29 min" },
      { label: "Fastest Delivery", value: "10 min" },
      { label: "Slowest Delivery", value: "54 min" },
    ],
    findings: {
      traffic: [
        { condition: "Jam", time: "31.18 min", note: "Highest observed average duration" },
        { condition: "High", time: "27.24 min", note: "Elevated transit delay" },
        { condition: "Medium", time: "26.70 min", note: "Near overall mean benchmark" },
        { condition: "Low", time: "21.46 min", note: "Fastest operational baseline" },
      ],
      weather: [
        { condition: "Cloudy", time: "28.92 min" },
        { condition: "Fog", time: "28.74 min" },
        { condition: "Windy", time: "26.12 min" },
        { condition: "Sandstorms", time: "25.88 min" },
        { condition: "Stormy", time: "25.87 min" },
        { condition: "Sunny", time: "21.86 min" },
      ],
      deliveries: [
        { count: "0 Deliveries", time: "22.88 min" },
        { count: "1 Delivery", time: "26.72 min" },
        { count: "2 Deliveries", time: "40.45 min" },
        { count: "3 Deliveries", time: "47.82 min" },
      ],
    },
    conclusion:
      "The analysis and Power BI dashboard provide logistics and operational stakeholders with a clear, empirical view of delivery fulfillment variations across 45,584 orders. While these findings represent observed patterns rather than proven causal relationships, they equip teams to explore operational trade-offs, refine dispatch expectations during adverse weather and heavy traffic, and evaluate the delivery-time impact of multi-order batching.",
  },
];

const SKILL_CATEGORIES = [
  {
    category: "Product",
    skills: [
      "Product Thinking",
      "User Research",
      "Wireframing",
      "PRDs",
      "Roadmaps",
      "RICE Prioritization",
    ],
  },
  {
    category: "Analytics",
    skills: [
      "SQL",
      "Excel",
      "Power BI",
      "Python",
      "Google Analytics 4",
      "Data Analysis",
    ],
  },
  {
    category: "Technical",
    skills: ["Jira", "Figma", "Git", "AI Tools"],
  },
  {
    category: "Business",
    skills: [
      "Leadership",
      "Operations",
      "Marketing",
      "Communication",
      "Stakeholder Management",
      "Entrepreneurship",
    ],
  },
];

const ROADMAP_STEPS = [
  {
    stage: "Leadership",
    desc: "Developing empathy, team alignment, and clear communication while leading 150+ members.",
  },
  {
    stage: "Operations",
    desc: "Building systems thinking, budget management (₹1-5L), and execution discipline under tight deadlines.",
  },
  {
    stage: "Entrepreneurship",
    desc: "Mastering customer acquisition, unit economics, and rapid MVP iteration in solo ventures.",
  },
  {
    stage: "Building Products",
    desc: "Writing PRDs, conducting user research, and shipping Mentora.ai AI micro-chunk architecture.",
  },
  {
    stage: "Analytics",
    desc: "Instrumenting GA4, event tracking, and using SQL data to reduce bounce rates from 75% to 45%.",
  },
  {
    stage: "Associate Product Manager",
    desc: "Combining leadership, operations, tech build experience, and analytics to solve high-impact user problems.",
  },
];

const PROJECTS = [
  {
    id: "mentora-project",
    title: "Mentora.ai — AI Learning OS",
    tag: "Featured Product",
    problem:
      "Self-learners waste hours jumping between fragmented videos, notes, and coding practice without structured feedback.",
    solution:
      "An AI-powered learning OS that breaks complex subjects into structured micro-chunks (CodePractice, QuizPractice, PredictPractice).",
    role: "Solo Founder, Product Manager & Full-Stack Builder",
    tools: ["React", "Vite", "Node.js", "Express", "GA4", "GTM", "4 LLM APIs"],
    impact:
      "250+ users grown, 99.9% uptime across ~18k req/day, reduced bounce rate from 75% to 45%.",
    learnings:
      "Discovered LLM video limits early -> pivoted focus to text micro-modules for maximum retention.",
    link: "https://mentora-ai-new.vercel.app",
    caseStudyId: "mentora",
  },
  {
    id: "zomato-project",
    title: "Zomato Delivery Performance Analysis",
    tag: "Data Analytics",
    problem:
      "Delivery delay patterns across 45k+ orders were unbenchmarked against live traffic density, adverse weather, and multi-drop driver loads.",
    solution:
      "Cleaned and modeled 45,584 records using Python (Pandas/NumPy), executed structured SQL aggregations in MySQL, and engineered an executive Power BI KPI dashboard.",
    role: "Data Analyst",
    tools: ["Python", "Pandas", "NumPy", "MySQL", "Power BI"],
    impact:
      "Identified empirical delivery baselines across 45,584 orders: 26.29 min avg, quantifying observed variations from Jam (31.18 min) to triple drops (47.82 min).",
    learnings:
      "Rigorous categorical mode imputation and strictly presenting correlations as observed empirical patterns rather than unsupported causation.",
    caseStudyId: "zomato",
  },
  {
    id: "shrimant-project",
    title: "Shrimant Garjana Operations System",
    tag: "Operations & Leadership",
    problem:
      "Post-COVID operational breakdown: lost rehearsal venue, dispersed membership, and zero leadership structure.",
    solution:
      "Restructured organization into specialized operational pods, secured new venue, and built ₹1-5L budget system.",
    role: "Operations Lead",
    tools: ["Operations Management", "Budgeting", "Brand System", "Event Logistics"],
    impact:
      "Rebuilt active team to 150-200 members; executed headline performance at Shree Kesariwada Ganpati.",
    learnings:
      "High-stakes team execution requires transparent delegation and bulletproof logistics.",
    caseStudyId: "shrimant",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Vedant's ability to turn operational chaos into structured execution is outstanding. He leads with clarity and empathy.",
    author: "Shrimant Garjana Core Committee",
  },
  {
    quote:
      "Mentora's micro-chunk learning design completely transformed how I prepare for coding interviews. Product thinking at its finest.",
    author: "Mentora Early User",
  },
];

// ==========================================
// ANIMATED COUNTER COMPONENT
// ==========================================
function Counter({ target, prefix = "", suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let start = null;
    const duration = 1200;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [visible, target]);

  return (
    <span ref={ref}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

// ==========================================
// MAIN PORTFOLIO COMPONENT
// ==========================================
export default function Portfolio() {
  const [themeMode, setThemeMode] = useState("light");
  const theme = THEMES[themeMode];

  // Initial Intro Loader State
  const [loading, setLoading] = useState(true);

  // Active Section & Scroll
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Timeline Progress for Glowing Orb
  const timelineRef = useRef(null);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  // Dedicated Case Study & Resume Modal
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);

  // Finish Initial Loader after 1.2s
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Handle Smooth Scroll to Section or direct case study modal
  const scrollToSection = (id) => {
    if (id === "resume") {
      setShowResumeModal(true);
      return;
    }
    if (id === "project-zomato") {
      const found = STORIES.find((s) => s.id === "zomato");
      if (found) {
        setActiveCaseStudy(found);
        window.history.replaceState(null, "", "#project-zomato");
      }
      return;
    }
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  // Support direct route / deep-link via hash (e.g. #project-zomato)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "project-zomato" || hash === "zomato") {
        const found = STORIES.find((s) => s.id === "zomato");
        if (found) setActiveCaseStudy(found);
      } else if (hash.startsWith("project-")) {
        const storyId = hash.replace("project-", "");
        const found = STORIES.find((s) => s.id === storyId);
        if (found) setActiveCaseStudy(found);
      } else if (hash === "resume") {
        setShowResumeModal(true);
      } else if (hash) {
        scrollToSection(hash);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Scroll listener for sticky navbar, scroll progress, and timeline orb
  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      const st = h.scrollTop;
      const sh = h.scrollHeight - h.clientHeight;
      setScrollProgress(sh > 0 ? (st / sh) * 100 : 0);
      setScrolled(st > 40);

      // Section Highlight Tracker
      const sections = [
        "home",
        "why-product",
        "journey",
        "skills",
        "roadmap",
        "projects",
        "education",
        "contact",
      ];
      const scrollPos = window.scrollY + 250;
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(s);
            break;
          }
        }
      }

      // Timeline Scroll Progress
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const windowH = window.innerHeight;
        const totalH = rect.height;
        const currentY = windowH / 2 - rect.top;
        const pct = Math.min(Math.max(currentY / totalH, 0), 1);
        setTimelineProgress(pct);

        // Active node calculation
        const nodeIndex = Math.min(
          Math.floor(pct * STORIES.length),
          STORIES.length - 1
        );
        setActiveStoryIndex(nodeIndex);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        backgroundColor: theme.bg,
        color: theme.textPrimary,
        fontFamily:
          "'Inter', 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        transition: "background-color 0.4s ease, color 0.4s ease",
      }}
    >
      {/* GLOBAL CSS & ANIMATIONS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap');
        
        * { box-sizing: border-box; }
        
        .disp { font-family: 'Space Grotesk', sans-serif; letter-spacing: -0.03em; }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.borderHover}; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: ${theme.accent}; }

        /* Glass Cards */
        .linear-card {
          background: ${theme.cardBg};
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid ${theme.border};
          border-radius: 16px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .linear-card:hover {
          background: ${theme.cardHover};
          border-color: ${theme.borderHover};
          transform: translateY(-4px);
          box-shadow: 0 16px 36px -10px ${theme.glow};
        }

        /* Buttons & Actions */
        .btn-primary {
          background: ${theme.accent};
          color: ${theme.bg};
          border: none;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          box-shadow: 0 4px 14px ${theme.glow};
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          opacity: 0.88;
          box-shadow: 0 8px 24px ${theme.glow};
        }

        .btn-secondary {
          background: transparent;
          color: ${theme.textPrimary};
          border: 1px solid ${theme.border};
          padding: 11px 22px;
          border-radius: 10px;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }
        .btn-secondary:hover {
          background: ${theme.border};
          border-color: ${theme.borderHover};
          color: ${theme.textPrimary};
          transform: translateY(-2px);
        }

        .pill-badge {
          background: ${theme.pillBg};
          color: ${theme.pillText};
          border: 1px solid ${theme.pillBorder};
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          display: inline-block;
        }

        .nav-item {
          background: transparent;
          border: none;
          color: ${theme.textSecondary};
          font-size: 14px;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .nav-item:hover, .nav-item.active {
          color: ${theme.textPrimary};
          background: ${theme.border};
          font-weight: 600;
        }

        /* Modal Overlay */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(10px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.2s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 768px) {
          .mobile-hide { display: none !important; }
          .grid-2col { grid-template-columns: 1fr !important; }
          .grid-4col { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-title { font-size: 38px !important; }
        }

        @media print {
          header, nav, .btn-primary, .btn-secondary, footer, .modal-overlay, #home, #why-product, #journey, #skills, #roadmap, #projects, #education {
            display: none !important;
          }
          #resume {
            margin: 0 !important;
            padding: 0 !important;
          }
          #resume .linear-card {
            border: none !important;
            box-shadow: none !important;
            background: #ffffff !important;
            color: #000000 !important;
            padding: 0 !important;
          }
        }
      `}</style>

      {/* INITIAL INTRO LOADER CURTAIN */}
      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: theme.bg,
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transition: "opacity 0.4s ease",
          }}
        >
          <div
            className="disp"
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 2,
              color: theme.textPrimary,
              marginBottom: 12,
            }}
          >
            VEDANT DHANVE
          </div>
          <div
            style={{
              fontSize: 13,
              color: theme.accent,
              fontWeight: 600,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            APM & Product Operations Portfolio
          </div>
        </div>
      )}

      {/* TOP SCROLL PROGRESS BAR */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "3px",
          width: `${scrollProgress}%`,
          background: theme.gradientText,
          zIndex: 100,
          transition: "width 0.1s linear",
          boxShadow: `0 0 10px ${theme.accent}`,
        }}
      />

      {/* STICKY GLASSMORPHIC NAVBAR */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: scrolled ? `${theme.bgSec}E6` : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: `1px solid ${scrolled ? theme.border : "transparent"}`,
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            justify: "space-between",
            alignItems: "center",
          }}
        >
          {/* Brand Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: "pointer",
            }}
            onClick={() => scrollToSection("home")}
          >
            <div
              className="disp"
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: theme.gradientText,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                boxShadow: `0 4px 12px ${theme.glow}`,
              }}
            >
              VD
            </div>
            <span
              className="disp"
              style={{
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: -0.3,
                color: theme.textPrimary,
              }}
            >
              Vedant Dhanve
            </span>
          </div>

          {/* Navigation Items */}
          <nav
            className="mobile-hide"
            style={{ display: "flex", alignItems: "center", gap: 4 }}
          >
            <button
              className={`nav-item ${
                activeSection === "why-product" ? "active" : ""
              }`}
              onClick={() => scrollToSection("why-product")}
            >
              Why Product?
            </button>
            <button
              className={`nav-item ${
                activeSection === "journey" ? "active" : ""
              }`}
              onClick={() => scrollToSection("journey")}
            >
              Stories
            </button>
            <button
              className={`nav-item ${
                activeSection === "skills" ? "active" : ""
              }`}
              onClick={() => scrollToSection("skills")}
            >
              Skills
            </button>
            <button
              className={`nav-item ${
                activeSection === "roadmap" ? "active" : ""
              }`}
              onClick={() => scrollToSection("roadmap")}
            >
              Roadmap
            </button>
            <button
              className={`nav-item ${
                activeSection === "projects" ? "active" : ""
              }`}
              onClick={() => scrollToSection("projects")}
            >
              Projects
            </button>
            <button
              className={`nav-item ${
                activeSection === "resume" ? "active" : ""
              }`}
              onClick={() => scrollToSection("resume")}
            >
              Resume
            </button>
            <button
              className={`nav-item ${
                activeSection === "contact" ? "active" : ""
              }`}
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </button>
          </nav>

          {/* Actions & Theme Toggle at the far right end */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button
              className="btn-primary"
              style={{ padding: "7px 16px", fontSize: 13 }}
              onClick={() => scrollToSection("contact")}
            >
              Get In Touch
            </button>

            <button
              onClick={() => setThemeMode(themeMode === "dark" ? "light" : "dark")}
              title={themeMode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              style={{
                background: theme.bgSec,
                border: `1px solid ${theme.borderHover}`,
                color: theme.textPrimary,
                width: 38,
                height: 38,
                borderRadius: "50%",
                fontSize: 17,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.25s ease",
                boxShadow: `0 2px 8px ${theme.glow}`,
                flexShrink: 0,
              }}
            >
              {themeMode === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          padding: "48px 24px 80px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* HERO SECTION */}
        <section id="home" style={{ marginBottom: 80, paddingTop: 16, maxWidth: 840 }}>
          <div className="pill-badge" style={{ marginBottom: 20, fontSize: 13 }}>
            APM & Product Analyst Candidate
          </div>

          <h1
            className="disp hero-title"
            style={{
              fontSize: "clamp(40px, 5.5vw, 64px)",
              fontWeight: 800,
              lineHeight: 1.08,
              margin: "0 0 12px",
              letterSpacing: -1,
            }}
          >
            Vedant Dhanve
          </h1>

          <div
            style={{
              fontSize: "clamp(20px, 2.5vw, 26px)",
              fontWeight: 700,
              color: theme.accent,
              marginBottom: 18,
            }}
          >
            Product & Business Operations
          </div>

          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: theme.textSecondary,
              marginBottom: 20,
              letterSpacing: 0.2,
            }}
          >
            Builder • Entrepreneur • Operations Leader • Product Enthusiast
          </div>

          <p
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: theme.textSecondary,
              margin: "0 0 32px",
            }}
          >
            "I enjoy solving real-world problems by combining product
            thinking, leadership, technology, operations, and data. From
            reviving organizations to building AI products and running
            businesses, I believe great products are built by deeply
            understanding people."
          </p>

          {/* Hero Action Buttons */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button
              className="btn-primary"
              onClick={() => scrollToSection("journey")}
            >
              View My Journey ↓
            </button>

            <button
              className="btn-secondary"
              onClick={() => setShowResumeModal(true)}
            >
              📄 View Resume PDF
            </button>

            <a
              href="https://linkedin.com/in/vedant-dhanve-6b5004394"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{ padding: "11px 16px" }}
            >
              LinkedIn ↗
            </a>

            <a
              href="https://github.com/vedantdhanve"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{ padding: "11px 16px" }}
            >
              GitHub ↗
            </a>
          </div>
        </section>

        {/* ABOUT SECTION: WHY PRODUCT? */}
        <section id="why-product" style={{ marginBottom: 88 }}>
          <div className="pill-badge" style={{ marginBottom: 12 }}>
            PHILOSOPHY & VISION
          </div>
          <h2
            className="disp"
            style={{ fontSize: 36, fontWeight: 800, margin: "0 0 20px" }}
          >
            Why Product?
          </h2>

          <div
            className="linear-card"
            style={{ padding: 36, marginBottom: 32 }}
          >
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.8,
                color: theme.textSecondary,
                margin: 0,
              }}
            >
              "I've always been drawn toward solving problems. Whether rebuilding
              a cultural organization after COVID, launching an AI learning
              platform, managing a seasonal business, or leading community
              initiatives, I enjoy identifying problems, understanding people,
              making decisions, and building systems that create meaningful
              impact. That curiosity naturally led me toward Product Management."
            </p>
          </div>

          {/* 4 ELEGANT STATISTIC CARDS */}
          <div
            className="grid-4col"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 20,
            }}
          >
            <div className="linear-card" style={{ padding: 24 }}>
              <div
                className="disp"
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: theme.accent,
                  lineHeight: 1.1,
                }}
              >
                <Counter target={200} prefix="150–" suffix="" />
              </div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 15,
                  marginTop: 6,
                  color: theme.textPrimary,
                }}
              >
                Team Members Led
              </div>
              <div style={{ fontSize: 13, color: theme.textMuted, marginTop: 4 }}>
                Shrimant Garjana Vadya Pathak
              </div>
            </div>

            <div className="linear-card" style={{ padding: 24 }}>
              <div
                className="disp"
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: theme.accent,
                  lineHeight: 1.1,
                }}
              >
                <Counter target={250} prefix="" suffix="+" />
              </div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 15,
                  marginTop: 6,
                  color: theme.textPrimary,
                }}
              >
                Platform Users
              </div>
              <div style={{ fontSize: 13, color: theme.textMuted, marginTop: 4 }}>
                Mentora.ai Active Users
              </div>
            </div>

            <div className="linear-card" style={{ padding: 24 }}>
              <div
                className="disp"
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: theme.accent,
                  lineHeight: 1.1,
                }}
              >
                <Counter target={12} prefix="" suffix="+" />
              </div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 15,
                  marginTop: 6,
                  color: theme.textPrimary,
                }}
              >
                Community Events Run
              </div>
              <div style={{ fontSize: 13, color: theme.textMuted, marginTop: 4 }}>
                50+ Volunteers, Social Workers Pune
              </div>
            </div>

            <div className="linear-card" style={{ padding: 24 }}>
              <div
                className="disp"
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: theme.accent,
                  lineHeight: 1.1,
                }}
              >
                <Counter target={2} prefix="" suffix="" />
              </div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 15,
                  marginTop: 6,
                  color: theme.textPrimary,
                }}
              >
                Businesses Founded
              </div>
              <div style={{ fontSize: 13, color: theme.textMuted, marginTop: 4 }}>
                Mentora.ai & Seasonal Mango D2C
              </div>
            </div>
          </div>
        </section>

        {/* SIGNATURE SECTION: STORIES THAT BUILT ME (TIMELINE) */}
        <section id="journey" style={{ marginBottom: 88 }}>
          <div className="pill-badge" style={{ marginBottom: 12 }}>
            SIGNATURE SECTION
          </div>
          <h2
            className="disp"
            style={{ fontSize: 36, fontWeight: 800, margin: "0 0 8px" }}
          >
            Stories That Built Me
          </h2>
          <p
            style={{
              fontSize: 16,
              color: theme.textSecondary,
              marginBottom: 40,
            }}
          >
            A continuous journey of leadership, execution, product iteration, and problem solving.
          </p>

          {/* GLOWING CONTINUOUS TIMELINE CONTAINER */}
          <div
            ref={timelineRef}
            style={{ position: "relative", paddingLeft: 44 }}
          >
            {/* Background Line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 16,
                width: 2,
                background: theme.border,
              }}
            />

            {/* Animated Glowing Progress Line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 16,
                width: 2,
                height: `${timelineProgress * 100}%`,
                background: theme.gradientText,
                boxShadow: `0 0 10px ${theme.accent}`,
                transition: "height 0.1s linear",
              }}
            />



            {/* TIMELINE STORY CARDS */}
            {STORIES.map((story, i) => {
              const isActive = activeStoryIndex === i;
              return (
                <div
                  key={story.id}
                  style={{
                    position: "relative",
                    marginBottom: 48,
                    opacity: isActive ? 1 : 0.75,
                    transform: isActive ? "translateY(0)" : "translateY(6px)",
                    transition: "all 0.4s ease",
                  }}
                >
                  {/* Timeline Node Dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: -35,
                      top: 28,
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: isActive ? theme.accent : theme.bg,
                      border: `2px solid ${isActive ? theme.accent : theme.borderHover}`,
                      boxShadow: isActive ? `0 0 0 4px ${theme.glow}` : "none",
                      transition: "all 0.35s ease",
                      zIndex: 2,
                    }}
                  />

                  {/* Card Component */}
                  <div className="linear-card" style={{ padding: 32 }}>
                    <div
                      style={{
                        display: "flex",
                        justify: "space-between",
                        alignItems: "center",
                        marginBottom: 12,
                        flexWrap: "wrap",
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: theme.accent,
                        }}
                      >
                        {story.role} • {story.organization}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          color: theme.textMuted,
                          fontWeight: 500,
                        }}
                      >
                        {story.date}
                      </span>
                    </div>

                    <h3
                      className="disp"
                      style={{
                        fontSize: 24,
                        fontWeight: 800,
                        margin: "0 0 12px",
                        color: theme.textPrimary,
                      }}
                    >
                      {story.title}
                    </h3>

                    <p
                      style={{
                        fontSize: 15,
                        lineHeight: 1.7,
                        color: theme.textSecondary,
                        marginBottom: 20,
                      }}
                    >
                      "{story.shortDesc}"
                    </p>

                    {/* Highlight Metrics Pills */}
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        flexWrap: "wrap",
                        marginBottom: 24,
                      }}
                    >
                      {story.metrics.map((m, j) => (
                        <span key={j} className="pill-badge">
                          {m}
                        </span>
                      ))}
                    </div>

                    {/* Case Study Trigger */}
                    <button
                      className="btn-secondary"
                      onClick={() => setActiveCaseStudy(story)}
                    >
                      Read Full Story & Case Study &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SKILLS SECTION (FLOATING CARDS, NO PROGRESS BARS) */}
        <section id="skills" style={{ marginBottom: 88 }}>
          <div className="pill-badge" style={{ marginBottom: 12 }}>
            COMPETENCIES
          </div>
          <h2
            className="disp"
            style={{ fontSize: 36, fontWeight: 800, margin: "0 0 8px" }}
          >
            Skills & Capabilities
          </h2>
          <p
            style={{
              fontSize: 16,
              color: theme.textSecondary,
              marginBottom: 32,
            }}
          >
            Grouped functional skills across product, analytics, tech, and business leadership.
          </p>

          <div
            className="grid-2col"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
            }}
          >
            {SKILL_CATEGORIES.map((cat, i) => (
              <div key={i} className="linear-card" style={{ padding: 28 }}>
                <h3
                  className="disp"
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    margin: "0 0 16px",
                    color: theme.accent,
                    borderBottom: `1px solid ${theme.border}`,
                    paddingBottom: 10,
                  }}
                >
                  {cat.category}
                </h3>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {cat.skills.map((s, j) => (
                    <span
                      key={j}
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: `1px solid ${theme.border}`,
                        color: theme.textPrimary,
                        padding: "7px 14px",
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 500,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CAREER ROADMAP: WHERE I'M HEADING */}
        <section id="roadmap" style={{ marginBottom: 88 }}>
          <div className="pill-badge" style={{ marginBottom: 12 }}>
            CAREER TRAJECTORY
          </div>
          <h2
            className="disp"
            style={{ fontSize: 36, fontWeight: 800, margin: "0 0 12px" }}
          >
            Where I'm Heading
          </h2>
          <p
            style={{
              fontSize: 16,
              color: theme.textSecondary,
              marginBottom: 36,
              maxWidth: 720,
            }}
          >
            How each experience has progressively shaped my foundation for Associate Product Management.
          </p>

          {/* Sequential Roadmap Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: 12,
              marginBottom: 32,
            }}
            className="grid-2col"
          >
            {ROADMAP_STEPS.map((step, i) => (
              <div
                key={i}
                className="linear-card"
                style={{
                  padding: "20px 14px",
                  textAlign: "center",
                  borderColor:
                    i === ROADMAP_STEPS.length - 1
                      ? theme.accent
                      : theme.border,
                  boxShadow:
                    i === ROADMAP_STEPS.length - 1
                      ? `0 0 16px ${theme.glow}`
                      : "none",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: theme.accent,
                    marginBottom: 6,
                  }}
                >
                  STEP 0{i + 1}
                </div>
                <div
                  className="disp"
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: theme.textPrimary,
                    marginBottom: 8,
                  }}
                >
                  {step.stage}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: theme.textMuted,
                    lineHeight: 1.5,
                  }}
                >
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED PROJECTS SECTION */}
        <section id="projects" style={{ marginBottom: 88 }}>
          <div className="pill-badge" style={{ marginBottom: 12 }}>
            FEATURED CASE STUDIES
          </div>
          <h2
            className="disp"
            style={{ fontSize: 36, fontWeight: 800, margin: "0 0 28px" }}
          >
            Featured Projects
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {PROJECTS.map((p) => (
              <div key={p.id} className="linear-card" style={{ padding: 36 }}>
                <div
                  style={{
                    display: "flex",
                    justify: "space-between",
                    alignItems: "center",
                    marginBottom: 12,
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  <span className="pill-badge">{p.tag}</span>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: theme.accent,
                        fontSize: 13,
                        fontWeight: 600,
                        textDecoration: "none",
                      }}
                    >
                      Visit Product ↗
                    </a>
                  )}
                </div>

                <h3
                  className="disp"
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    margin: "0 0 16px",
                    color: theme.textPrimary,
                  }}
                >
                  {p.title}
                </h3>

                <div
                  className="grid-2col"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 20,
                    marginBottom: 20,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: theme.accent,
                        marginBottom: 4,
                      }}
                    >
                      PROBLEM
                    </div>
                    <p
                      style={{
                        fontSize: 14,
                        color: theme.textSecondary,
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {p.problem}
                    </p>
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: theme.accent,
                        marginBottom: 4,
                      }}
                    >
                      SOLUTION
                    </div>
                    <p
                      style={{
                        fontSize: 14,
                        color: theme.textSecondary,
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {p.solution}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    borderTop: `1px solid ${theme.border}`,
                    paddingTop: 16,
                    display: "flex",
                    justify: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 12,
                  }}
                >
                  <div>
                    <span style={{ fontSize: 13, color: theme.textMuted }}>
                      Role:{" "}
                    </span>
                    <strong
                      style={{ fontSize: 13, color: theme.textPrimary }}
                    >
                      {p.role}
                    </strong>
                  </div>

                  <button
                    className="btn-primary"
                    onClick={() => {
                      const found = STORIES.find(
                        (s) => s.id === p.caseStudyId
                      );
                      if (found) setActiveCaseStudy(found);
                    }}
                  >
                    View Full Case Study &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION & CERTIFICATIONS */}
        <section id="education" style={{ marginBottom: 88 }}>
          <div className="pill-badge" style={{ marginBottom: 12 }}>
            CREDENTIALS
          </div>
          <h2
            className="disp"
            style={{ fontSize: 36, fontWeight: 800, margin: "0 0 28px" }}
          >
            Education & Certifications
          </h2>

          <div
            className="grid-2col"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
            }}
          >
            {/* Education Card */}
            <div className="linear-card" style={{ padding: 32 }}>
              <div
                style={{
                  fontSize: 12,
                  color: theme.accent,
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                DEGREE
              </div>
              <h3
                className="disp"
                style={{ fontSize: 20, fontWeight: 700, margin: "0 0 6px" }}
              >
                B.Tech, Computer Science Engineering
              </h3>
              <div style={{ fontSize: 14, color: theme.textSecondary }}>
                ISB&M College of Engineering, Nande, Pune
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: theme.textMuted,
                  marginTop: 8,
                  fontWeight: 600,
                }}
              >
                Graduated July 2026
              </div>
            </div>

            {/* Certification Card */}
            <div className="linear-card" style={{ padding: 32 }}>
              <div
                style={{
                  fontSize: 12,
                  color: theme.accent,
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                CERTIFICATION
              </div>
              <h3
                className="disp"
                style={{ fontSize: 20, fontWeight: 700, margin: "0 0 6px" }}
              >
                Google Analytics Certification
              </h3>
              <div style={{ fontSize: 14, color: theme.textSecondary }}>
                Google Skillshop Verified
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: theme.textMuted,
                  marginTop: 8,
                  fontWeight: 600,
                }}
              >
                GA4 Event Tracking & Funnel Analysis
              </div>
            </div>
          </div>
        </section>



        {/* CONTACT SECTION */}
        <footer
          id="contact"
          className="linear-card"
          style={{
            padding: 48,
            textAlign: "center",
            background: `radial-gradient(circle, ${theme.accent}15 0%, ${theme.cardBg} 80%)`,
          }}
        >
          <div className="pill-badge" style={{ marginBottom: 16 }}>
            GET IN TOUCH
          </div>

          <h2
            className="disp"
            style={{
              fontSize: "clamp(32px, 4.5vw, 48px)",
              fontWeight: 800,
              margin: "0 0 16px",
            }}
          >
            Let's Build Something Meaningful Together.
          </h2>

          <p
            style={{
              fontSize: 17,
              color: theme.textSecondary,
              maxWidth: 580,
              margin: "0 auto 32px",
              lineHeight: 1.7,
            }}
          >
            Former competitive cricket player (4–5 years). Available immediately for
            Associate Product Manager, Associate Product Manager, Data Analyst, Product Analyst, Product Operations, Growth Analyst opportunities.
          </p>

          <div
            style={{
              display: "flex",
              justify: "center",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <a
              href="mailto:dhanvevedant@gmail.com"
              className="btn-primary"
              style={{ padding: "14px 28px", fontSize: 15 }}
            >
              ✉️ Email (dhanvevedant@gmail.com)
            </a>

            <button
              className="btn-secondary"
              style={{ padding: "14px 28px", fontSize: 15 }}
              onClick={() => setShowResumeModal(true)}
            >
              📄 View Resume PDF
            </button>

            <a
              href="https://linkedin.com/in/vedant-dhanve-6b5004394"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{ padding: "14px 28px", fontSize: 15 }}
            >
              LinkedIn ↗
            </a>

            <a
              href="https://github.com/vedantdhanve"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{ padding: "14px 28px", fontSize: 15 }}
            >
              GitHub ↗
            </a>
          </div>

          <div
            style={{
              fontSize: 13,
              color: theme.textMuted,
              marginTop: 48,
              borderTop: `1px solid ${theme.border}`,
              paddingTop: 24,
            }}
          >
            Vedant Dhanve © 2026 • Product & Operations Portfolio
          </div>
        </footer>
      </main>

      {/* FULL DEDICATED CASE STUDY MODAL */}
      {activeCaseStudy && (
        <div
          className="modal-overlay"
          onClick={() => setActiveCaseStudy(null)}
        >
          <div
            className="linear-card"
            style={{
              maxWidth: 780,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: 40,
              position: "relative",
              background: theme.bgSec,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveCaseStudy(null)}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                background: "rgba(255, 255, 255, 0.1)",
                border: `1px solid ${theme.border}`,
                color: theme.textPrimary,
                width: 34,
                height: 34,
                borderRadius: 10,
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              ✕
            </button>



            {/* Header / Category Badge */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: theme.accent,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {activeCaseStudy.category || "Product Case Study"} • {activeCaseStudy.role}
              </div>
            </div>

            <h2
              className="disp"
              style={{
                fontSize: "clamp(26px, 3.5vw, 34px)",
                fontWeight: 800,
                margin: "0 0 8px",
                color: theme.textPrimary,
                letterSpacing: -0.5,
              }}
            >
              {activeCaseStudy.title}
            </h2>

            <div
              style={{
                fontSize: 15,
                color: theme.textSecondary,
                marginBottom: 16,
                fontWeight: 600,
              }}
            >
              {activeCaseStudy.organization} ({activeCaseStudy.date})
            </div>

            {/* Short Description */}
            {activeCaseStudy.shortDesc && (
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: theme.textSecondary,
                  margin: "0 0 20px",
                }}
              >
                {activeCaseStudy.shortDesc}
              </p>
            )}

            {/* Technology Badges */}
            {activeCaseStudy.tools && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                {activeCaseStudy.tools.map((t, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: "4px 12px",
                      borderRadius: 14,
                      fontSize: 12,
                      fontWeight: 600,
                      background: theme.pillBg,
                      color: theme.pillText,
                      border: `1px solid ${theme.pillBorder}`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Overview & Dataset Details */}
            <div style={{ marginBottom: 24 }}>
              <h4
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: theme.accent,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Project Overview & Dataset Details
              </h4>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: theme.textSecondary,
                  margin: "0 0 12px",
                }}
              >
                {activeCaseStudy.overview}
              </p>

              {activeCaseStudy.datasetDetails && (
                <div
                  className="linear-card"
                  style={{
                    padding: 16,
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 12,
                    fontSize: 13,
                  }}
                >
                  <div>
                    <span style={{ color: theme.textMuted, fontWeight: 600 }}>Dataset Source: </span>
                    <strong style={{ color: theme.textPrimary }}>{activeCaseStudy.datasetDetails.source}</strong>
                  </div>
                  <div>
                    <span style={{ color: theme.textMuted, fontWeight: 600 }}>Volume: </span>
                    <strong style={{ color: theme.textPrimary }}>{activeCaseStudy.datasetDetails.records}</strong>
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <span style={{ color: theme.textMuted, fontWeight: 600 }}>Core Problem: </span>
                    <span style={{ color: theme.textSecondary }}>{activeCaseStudy.datasetDetails.problem}</span>
                  </div>
                </div>
              )}
            </div>

            {/* STAR Breakdown Grid */}
            <div
              className="grid-2col"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 20,
                marginBottom: 24,
              }}
            >
              <div className="linear-card" style={{ padding: 20 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: theme.accent,
                    marginBottom: 4,
                  }}
                >
                  SITUATION
                </div>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: theme.textSecondary,
                    margin: 0,
                  }}
                >
                  {activeCaseStudy.situation}
                </p>
              </div>

              <div className="linear-card" style={{ padding: 20 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: theme.accent,
                    marginBottom: 4,
                  }}
                >
                  TASK
                </div>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: theme.textSecondary,
                    margin: 0,
                  }}
                >
                  {activeCaseStudy.task}
                </p>
              </div>
            </div>

            {/* Action Items / Data Preparation Steps */}
            <div style={{ marginBottom: 28 }}>
              <h4
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: theme.accent,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                {activeCaseStudy.id === "zomato"
                  ? "Data Cleaning, Preparation & SQL Analysis Workflow"
                  : "Action & Product Strategy"}
              </h4>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: 20,
                  color: theme.textSecondary,
                  fontSize: 14,
                  lineHeight: 1.7,
                }}
              >
                {activeCaseStudy.action.map((act, j) => (
                  <li key={j} style={{ marginBottom: 6 }}>
                    {act}
                  </li>
                ))}
              </ul>
            </div>

            {/* Dashboard Preview Section (Prominent & Responsive) */}
            {activeCaseStudy.id === "zomato" && (
              <div style={{ marginBottom: 32 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <h4
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: theme.accent,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      margin: 0,
                    }}
                  >
                    Power BI Dashboard Preview
                  </h4>
                  <a
                    href="/Dashboard.pdf"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: theme.accent,
                      textDecoration: "none",
                    }}
                  >
                    Open Full PDF Dashboard ↗
                  </a>
                </div>

                <div
                  className="linear-card"
                  style={{
                    overflow: "hidden",
                    border: `1px solid ${theme.borderHover}`,
                    background: theme.cardBg,
                    boxShadow: `0 12px 30px ${theme.glow}`,
                  }}
                >
                  <img
                    src="/dashboard-preview.png"
                    alt="Zomato Delivery Performance Analysis - Power BI Dashboard"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/dashboard-preview.svg";
                    }}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      aspectRatio: "16 / 9",
                      objectFit: "contain",
                      background: "#0d1117",
                    }}
                  />
                  <div
                    style={{
                      padding: "12px 18px",
                      borderTop: `1px solid ${theme.border}`,
                      fontSize: 12,
                      color: theme.textMuted,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 8,
                    }}
                  >
                    <span>Dashboard File: <code>Dashboard.pbix</code> • 45,584 Records</span>
                    <span>Preserved 16:9 Aspect Ratio • Responsive Presentation</span>
                  </div>
                </div>
              </div>
            )}

            {/* KPI Cards */}
            {activeCaseStudy.kpis && (
              <div style={{ marginBottom: 28 }}>
                <h4
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: theme.accent,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  Key Performance Indicators (KPIs)
                </h4>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: 14,
                  }}
                >
                  {activeCaseStudy.kpis.map((kpi, kIdx) => (
                    <div
                      key={kIdx}
                      className="linear-card"
                      style={{ padding: "16px 18px", textAlign: "center" }}
                    >
                      <div
                        className="disp"
                        style={{
                          fontSize: 24,
                          fontWeight: 800,
                          color: theme.accent,
                          lineHeight: 1.1,
                          marginBottom: 4,
                        }}
                      >
                        {kpi.value}
                      </div>
                      <div style={{ fontSize: 12, color: theme.textMuted, fontWeight: 600 }}>
                        {kpi.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Findings Section (Traffic, Weather, Multi-Deliveries) */}
            {activeCaseStudy.findings && (
              <div style={{ marginBottom: 28 }}>
                <div style={{ marginBottom: 8 }}>
                  <h4
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: theme.accent,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      margin: "0 0 4px",
                    }}
                  >
                    Key Findings: Observed Delivery Patterns
                  </h4>
                  <p style={{ fontSize: 13, color: theme.textMuted, margin: 0, fontStyle: "italic" }}>
                    Note: Metrics reflect observed patterns across 45,584 records, not verified causal proof.
                  </p>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 16,
                    marginTop: 14,
                  }}
                >
                  {/* Traffic Density */}
                  <div className="linear-card" style={{ padding: 18 }}>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: theme.accent,
                        marginBottom: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Road Traffic Density
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {activeCaseStudy.findings.traffic.map((item, tIdx) => (
                        <div
                          key={tIdx}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: 13,
                            paddingBottom: 4,
                            borderBottom: `1px dashed ${theme.border}`,
                          }}
                        >
                          <span style={{ color: theme.textSecondary }}>{item.condition}</span>
                          <strong style={{ color: theme.textPrimary }}>{item.time}</strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Weather Conditions */}
                  <div className="linear-card" style={{ padding: 18 }}>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: theme.accent,
                        marginBottom: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Weather Conditions
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {activeCaseStudy.findings.weather.map((item, wIdx) => (
                        <div
                          key={wIdx}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: 13,
                            paddingBottom: 3,
                            borderBottom: `1px dashed ${theme.border}`,
                          }}
                        >
                          <span style={{ color: theme.textSecondary }}>{item.condition}</span>
                          <strong style={{ color: theme.textPrimary }}>{item.time}</strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Multiple Deliveries */}
                  <div className="linear-card" style={{ padding: 18 }}>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: theme.accent,
                        marginBottom: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Multiple Deliveries
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {activeCaseStudy.findings.deliveries.map((item, dIdx) => (
                        <div
                          key={dIdx}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: 13,
                            paddingBottom: 4,
                            borderBottom: `1px dashed ${theme.border}`,
                          }}
                        >
                          <span style={{ color: theme.textSecondary }}>{item.count}</span>
                          <strong style={{ color: theme.textPrimary }}>{item.time}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Project Conclusion */}
            {activeCaseStudy.conclusion && (
              <div
                className="linear-card"
                style={{
                  padding: 22,
                  marginBottom: 24,
                  borderLeft: `4px solid ${theme.accent}`,
                }}
              >
                <h4
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: theme.accent,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Project Conclusion & Operational Utility
                </h4>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: theme.textSecondary,
                    margin: 0,
                  }}
                >
                  {activeCaseStudy.conclusion}
                </p>
              </div>
            )}

            {/* Standard Result & Impact for other case studies */}
            {!activeCaseStudy.kpis && (
              <div
                className="linear-card"
                style={{
                  padding: 24,
                  marginBottom: 24,
                  borderColor: theme.accent,
                }}
              >
                <h4
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: theme.accent,
                    marginBottom: 6,
                  }}
                >
                  MEASURABLE RESULT & IMPACT
                </h4>
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    lineHeight: 1.6,
                    color: theme.textPrimary,
                    margin: 0,
                  }}
                >
                  {activeCaseStudy.result}
                </p>
              </div>
            )}

            {/* Learnings & What I'd Improve Today */}
            <div
              className="grid-2col"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 20,
                marginBottom: 28,
              }}
            >
              <div>
                <h4
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: theme.accent,
                    marginBottom: 4,
                  }}
                >
                  KEY ANALYTICS & OPERATIONAL LEARNINGS
                </h4>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: theme.textSecondary,
                    margin: 0,
                  }}
                >
                  {activeCaseStudy.learnings}
                </p>
              </div>

              <div>
                <h4
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: theme.accent,
                    marginBottom: 4,
                  }}
                >
                  WHAT I'D IMPROVE TODAY
                </h4>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: theme.textSecondary,
                    margin: 0,
                  }}
                >
                  {activeCaseStudy.improveToday}
                </p>
              </div>
            </div>

            {/* Footer Navigation: Back to Projects button and Close */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 12,
                borderTop: `1px solid ${theme.border}`,
                paddingTop: 18,
              }}
            >
              <button
                className="btn-secondary"
                onClick={() => {
                  setActiveCaseStudy(null);
                  window.history.replaceState(null, "", "#projects");
                  scrollToSection("projects");
                }}
              >
                ← Back to Featured Projects
              </button>

              <button
                className="btn-primary"
                onClick={() => {
                  setActiveCaseStudy(null);
                  window.history.replaceState(null, "", " ");
                }}
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESUME PDF VIEWER MODAL */}
      {showResumeModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowResumeModal(false)}
        >
          <div
            className="linear-card"
            style={{
              maxWidth: 900,
              width: "95%",
              height: "90vh",
              display: "flex",
              flexDirection: "column",
              padding: 24,
              position: "relative",
              background: theme.bgSec,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Controls */}
            <div
              style={{
                display: "flex",
                justify: "space-between",
                alignItems: "center",
                marginBottom: 14,
                paddingBottom: 14,
                borderBottom: `1px solid ${theme.border}`,
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: theme.textPrimary }}>
                  Vedant Dhanve — Official Resume
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <a
                  href="/Vedant_Dhanve_Resume.pdf"
                  download="Vedant_Dhanve_Resume.pdf"
                  className="btn-primary"
                  style={{ padding: "7px 16px", fontSize: 13 }}
                >
                  Download PDF ⤓
                </a>
                <a
                  href="/Vedant_Dhanve_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ padding: "7px 14px", fontSize: 13 }}
                >
                  Open in New Tab ↗
                </a>
                <button
                  onClick={() => setShowResumeModal(false)}
                  style={{
                    background: "transparent",
                    border: `1px solid ${theme.border}`,
                    color: theme.textPrimary,
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    fontSize: 16,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Embedded PDF Viewer */}
            <iframe
              src="/Vedant_Dhanve_Resume.pdf"
              title="Vedant Dhanve Resume PDF"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: 8,
                background: "#ffffff",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
