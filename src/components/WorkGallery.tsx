import React, { useState, useRef, useEffect } from 'react';
import karryLisleImg from '../assets/images/karry_lisle_strategy_1788734823398.jpg';
import setlinnImg from '../assets/images/setlinn_strategy_deck_1788734834735.jpg';
import iamwhoisayiamImg from '../assets/images/iamwhoisayiam_real_deck_1788736481767.jpg';
import debbysTreatImg from '../assets/images/debbys_treat_deck_1788737086327.jpg';
import glowAndGrowImg from '../assets/images/glow_and_grow_deck_1788737100041.jpg';
import glowUpFlyerImg from '../assets/images/glow_up_flyer_1788737113048.jpg';
import {
  LayoutGrid,
  Image as ImageIcon,
  Layers,
  Sparkles,
  ZoomIn,
  X,
  Upload,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Presentation,
  CheckCircle,
  Eye,
  Sliders,
  Target,
  FileText,
  Calendar
} from 'lucide-react';

export interface DeckSlide {
  slideNumber: number;
  title: string;
  subtitle?: string;
  badge?: string;
  intro?: string;
  bulletPoints?: { label?: string; text: string }[];
  mainText?: string;
  visualType?: 'cover' | 'eye' | 'standard' | 'metrics' | 'thankyou';
}

export interface WorkItem {
  id: string;
  title: string;
  category: 'strategy' | 'carousels' | 'feed' | 'graphics' | 'reels' | 'stories';
  categoryLabel: string;
  description: string;
  imageUrl?: string;
  deliverables: string[];
  platform?: string;
  dateAdded?: string;
  slides?: DeckSlide[];
}

const CATEGORIES = [
  { id: 'all', label: 'All Work' },
  { id: 'strategy', label: 'Strategy Decks & Frameworks' },
  { id: 'carousels', label: 'Carousels & Multi-Slide' },
  { id: 'feed', label: 'Feed & Content Operations' },
  { id: 'graphics', label: 'Flyers & Single Graphics' },
  { id: 'reels', label: 'Reels & Video Covers' },
  { id: 'stories', label: 'Stories & Layouts' },
];

// ==========================================
// 1. <I AM WHO I SAY I AM.GLOBAL>™ (9 SLIDES)
// ==========================================
const IAMWHOISAYIAM_SLIDES: DeckSlide[] = [
  {
    slideNumber: 1,
    title: 'Social media',
    subtitle: 'Posting strategy',
    badge: '<I AM WHO I SAY I AM.GLOBAL>™',
    mainText: 'Official Operational Posting Strategy & Distribution Framework',
    visualType: 'cover',
  },
  {
    slideNumber: 2,
    title: 'Objective',
    badge: 'Core Purpose',
    mainText:
      'Establish brand visibility, thought leadership, and credibility while supporting community growth and engagement.',
    visualType: 'standard',
  },
  {
    slideNumber: 3,
    title: 'Posting Schedule & Logistics',
    badge: 'Cadence & Platforms',
    bulletPoints: [
      { label: 'Frequency', text: '5 posts per week (Monday – Friday)' },
      {
        label: 'Timing',
        text: '8:00 AM – 11:00 AM (EST/UTC) / Track performance closely, adjust timing, and customize targeting based on engagement and follower reach!',
      },
      { label: 'Primary Platform', text: 'LinkedIn (Company Page)' },
      { label: 'Secondary Platforms', text: 'Relevant Groups, Instagram, and X (Twitter)' },
    ],
    visualType: 'eye',
  },
  {
    slideNumber: 4,
    title: 'Content Pillars',
    subtitle: 'All posts will align with one of these six focus areas:',
    badge: 'Six Pillars',
    bulletPoints: [
      {
        label: 'Thought Leadership',
        text: 'Insights on identity matters, mentoring, and leadership.',
      },
      {
        label: 'Founder Story',
        text: 'The journey, vision, and "behind the scenes" of the mission.',
      },
      {
        label: 'Company News',
        text: 'Milestones, partnerships, and "Early Access" updates.',
      },
      {
        label: 'Educational Value Frameworks',
        text: '"Learning moments" and methodology deep dives.',
      },
      {
        label: 'Vision & Promotion',
        text: 'Brand program invitations and clear Calls to Action (CTAs).',
      },
      {
        label: 'Community Engagement',
        text: 'Reposts with perspective and group discussion starters.',
      },
    ],
    visualType: 'eye',
  },
  {
    slideNumber: 5,
    title: 'Weekly Content Mix (Example)',
    badge: 'Weekly Formula',
    bulletPoints: [
      { label: '2 ×', text: 'Thought Leadership / Founder Voice' },
      { label: '1 ×', text: 'Company News or Program Update' },
      { label: '1 ×', text: 'Educational or Value-led Post' },
      { label: '1 ×', text: 'Vision or Promotional Post' },
    ],
    visualType: 'eye',
  },
  {
    slideNumber: 6,
    title: 'Group Posting Strategy',
    badge: 'Amplification',
    bulletPoints: [
      { text: 'Publish to company page first.' },
      { text: 'Share adapted versions into relevant groups.' },
      { text: 'Slight caption adjustments to fit each group\'s context.' },
      { text: 'Focus on relevance, insight, and engagement (not direct selling).' },
    ],
    visualType: 'eye',
  },
  {
    slideNumber: 7,
    title: 'Weekly Targets',
    badge: 'Key Performance Indicators',
    bulletPoints: [
      {
        label: 'New Followers',
        text: 'LinkedIn: +30/wk • Instagram: +20/wk • X (Twitter): +15/wk • Facebook: +10/wk',
      },
      {
        label: 'Group Engagement',
        text: 'At least 1 meaningful interaction per day in relevant groups.',
      },
      {
        label: 'Content Output',
        text: '5 posts/week across platforms (with slight adaptations per platform).',
      },
    ],
    visualType: 'metrics',
  },
  {
    slideNumber: 8,
    title: 'Operational Workflow',
    badge: 'Workflow & Roles',
    bulletPoints: [
      {
        label: 'Production',
        text: 'Asset creation coordinates after the Founder / Design team.',
      },
      {
        label: 'Management',
        text: 'Content Admin drafts captions and manages all distribution.',
      },
      {
        label: 'Optimization',
        text: 'Monitor performance for 2–3 weeks, then adjust timing and content mix based on data.',
      },
    ],
    visualType: 'eye',
  },
  {
    slideNumber: 9,
    title: 'Thank you',
    subtitle: '<I AM WHO I SAY I AM.GLOBAL>™',
    badge: 'End of Playbook',
    mainText: 'Prepared with Strategic Precision by Deborah Odion',
    visualType: 'thankyou',
  },
];

// ==========================================
// 2. DEBBY'S TREAT (11 SLIDES)
// ==========================================
const DEBBYS_TREAT_SLIDES: DeckSlide[] = [
  {
    slideNumber: 1,
    title: 'SOCIAL MEDIA STRATEGY',
    subtitle: "Smart approach to showcase Debby's Treat and attract sweet lovers.",
    badge: "Debby's Treat • Confectionery Brand",
    mainText: 'Growth & Visual Content Strategy for Debby\'s Treat',
    visualType: 'cover',
  },
  {
    slideNumber: 2,
    title: 'Executive Summary',
    badge: 'Brand Essence',
    mainText:
      'Crafting crave-worthy visual content, community trust, and structured conversion pathways to position Debby\'s Treat as the premier confectionery brand for celebrations and everyday indulgences.',
    visualType: 'standard',
  },
  {
    slideNumber: 3,
    title: 'GOALS & Objectives',
    badge: 'Strategic Alignment',
    bulletPoints: [
      {
        label: 'Brand Goals',
        text: 'Increase brand awareness, showcase products through creative visuals, engage and build loyal community, drive sales and conversions, strengthen brand identity and credibility, expand brand reach.',
      },
      {
        label: 'Follower Objective',
        text: 'Gain 1,000 new Instagram followers and 200 Facebook page likes within 3 months.',
      },
      {
        label: 'Engagement Objective',
        text: 'Achieve 5–7% engagement rate on posts and increase story interactions by 20% in 2 months.',
      },
      {
        label: 'Order Volume',
        text: 'Generate at least 50 orders per month via Instagram, Facebook, and WhatsApp.',
      },
      {
        label: 'Posting Cadence',
        text: 'Post consistently 4 times weekly and share at least 2 customer testimonials monthly.',
      },
      {
        label: 'Influencer Reach',
        text: 'Collaborate with 2 local influencers/food bloggers within 6 months and reach 10,000 impressions monthly.',
      },
    ],
    visualType: 'metrics',
  },
  {
    slideNumber: 4,
    title: 'Competitor Analysis',
    badge: 'Market Research',
    bulletPoints: [
      {
        label: 'Competitor Gap',
        text: 'Competitors in the same niche post nice food visual and run promos, but lack consistency, structured content pillars, and organic community engagement.',
      },
      {
        label: 'Debby\'s Treat Opportunity',
        text: 'Stand out by posting consistently, sharing behind-the-scenes artistry, and balancing promotional menus with irresistible video carousels.',
      },
    ],
    visualType: 'eye',
  },
  {
    slideNumber: 5,
    title: 'Target Audience Profile',
    badge: 'Demographics & Personas',
    bulletPoints: [
      {
        label: 'Core Demographics',
        text: 'Sweet lovers, young professionals, birthday celebrants, event planners, and families aged 20–45.',
      },
      {
        label: 'Psychographics',
        text: 'Appreciates premium presentation, fresh natural ingredients, dependable delivery, and celebratory treats.',
      },
      {
        label: 'Purchasing Triggers',
        text: 'Birthdays, anniversaries, office milestones, weekend cravings, and customized party dessert tables.',
      },
    ],
    visualType: 'standard',
  },
  {
    slideNumber: 6,
    title: 'Platform Selection',
    badge: 'Channels & Focus',
    bulletPoints: [
      {
        label: 'Instagram',
        text: 'Reels of cake cuts, aesthetic photo galleries, customer reposts, and story polls.',
      },
      {
        label: 'Facebook',
        text: 'Local community catering announcements, family party specials, and customer reviews.',
      },
      {
        label: 'WhatsApp Business',
        text: 'Direct DM orders, instant customer service, product catalog links, and status drops.',
      },
    ],
    visualType: 'eye',
  },
  {
    slideNumber: 7,
    title: 'Content Strategy & Formats',
    badge: 'Content Pillars',
    bulletPoints: [
      {
        label: 'Product Showcase',
        text: 'Luscious close-ups of chocolate mousse cakes, berry toppings, and seasonal specialties.',
      },
      {
        label: 'Behind-The-Scenes',
        text: 'Piping frosting techniques, baking prep, clean kitchen standards, and packaging reveals.',
      },
      {
        label: 'Customer Love & Proof',
        text: 'Customer taste reactions, event setup photos, and glowing unboxing testimonials.',
      },
      {
        label: 'Promotions & Giveaways',
        text: 'Weekend treat boxes, holiday flash sales, and engagement trivia giveaways.',
      },
    ],
    visualType: 'eye',
  },
  {
    slideNumber: 8,
    title: 'Posting Schedules & Engagement',
    badge: 'Publishing Cadence',
    bulletPoints: [
      {
        label: 'Instagram Schedule',
        text: '4 times per week (mix of reels, carousels, and stories daily).',
      },
      {
        label: 'Facebook Schedule',
        text: '3 posts per week to keep presence active in community updates.',
      },
      {
        label: 'WhatsApp Status',
        text: 'Daily updates showcasing freshly baked treat boxes and limited batches.',
      },
      {
        label: 'Engagement Protocol',
        text: 'Reply to all DMs within 30 minutes. Use polls, Q&As, and quizzes to drive active conversations.',
      },
    ],
    visualType: 'eye',
  },
  {
    slideNumber: 9,
    title: 'Analytics & Reporting',
    badge: 'Metrics & Tracking',
    bulletPoints: [
      {
        label: 'Tracked Metrics',
        text: 'Reach, post impressions, save rates, follower growth, website clicks, and WhatsApp orders.',
      },
      {
        label: 'Monthly Reports',
        text: 'Highlighting top-performing assets, customer acquisition sources, and optimization steps.',
      },
      {
        label: 'Goal',
        text: 'Ensure total transparency and data-driven improvements for compounding growth.',
      },
    ],
    visualType: 'metrics',
  },
  {
    slideNumber: 10,
    title: 'Conclusion & Strategic Growth',
    badge: 'Execution Roadmap',
    mainText:
      'This strategy for Debby\'s Treat lays out a clear path to grow the brand, engage the audience and boost online visibility. With consistent content, strategic posting, and continuous optimization, the brand is poised to build a strong, loyal community and achieve measurable growth.',
    visualType: 'standard',
  },
  {
    slideNumber: 11,
    title: 'Thank You',
    subtitle: "Debby's Treat",
    badge: 'Get In Touch',
    mainText: 'Prepared with Strategic Precision by Deborah Odion',
    visualType: 'thankyou',
  },
];

// ==========================================
// 3. GLOW AND GROW PODCAST (10 SLIDES)
// ==========================================
const GLOW_AND_GROW_SLIDES: DeckSlide[] = [
  {
    slideNumber: 1,
    title: 'Glow and Grow podcast',
    subtitle: 'Shine from Within. Grow Without Limits',
    badge: 'Larana Inc. • Brand Strategy Guide | 2025',
    mainText: 'Brand Strategy & Social Media Roadmap for Larana Inc.',
    visualType: 'cover',
  },
  {
    slideNumber: 2,
    title: 'Primary Audience Demographics',
    badge: 'Audience Persona',
    bulletPoints: [
      {
        label: 'Target Demographic',
        text: 'Young adult women aged 20–35, career starters, creative entrepreneurs, and students.',
      },
      {
        label: 'Psychographics',
        text: 'Passionate about self-development, mindfulness, radiant skincare, and building self-worth.',
      },
      {
        label: 'Preferred Tone',
        text: 'Relatable, uplifting, vulnerable, and empowering conversations with genuine empathy.',
      },
    ],
    visualType: 'standard',
  },
  {
    slideNumber: 3,
    title: 'What They Want & Need',
    badge: 'Core Desires',
    bulletPoints: [
      {
        label: 'Vulnerability',
        text: 'Honest discussions on moving forward when life feels heavy and overcoming burnout.',
      },
      {
        label: 'Actionable Frameworks',
        text: 'Clear routines and mental tools to step into personal power and healthy boundaries.',
      },
      {
        label: 'Community Connection',
        text: 'A welcoming digital sisterhood where vulnerability is met with celebration.',
      },
    ],
    visualType: 'standard',
  },
  {
    slideNumber: 4,
    title: 'Brand Voice & Tone',
    badge: 'Identity Guidelines',
    bulletPoints: [
      {
        label: 'Warm & Grounded',
        text: 'Speaking like an inspiring older sister who listens deeply and guides with grace.',
      },
      {
        label: 'Uplifting & Real',
        text: 'Never toxic positivity; acknowledging tough emotions while providing actionable hope.',
      },
      {
        label: 'Aesthetic Radiance',
        text: 'Every visual and caption reflects self-love, nourishment, and refined intentionality.',
      },
    ],
    visualType: 'eye',
  },
  {
    slideNumber: 5,
    title: 'Logo & Visual Identity',
    badge: 'Larana Inc. Design',
    bulletPoints: [
      {
        label: 'Color Direction',
        text: 'Warm terracotta rust, desert sand beige, rich mocha, and glowing amber skin tones.',
      },
      {
        label: 'Iconography',
        text: 'Hand-drawn vintage studio microphones, organic circular curves, and glowing textures.',
      },
      {
        label: 'Typography',
        text: 'Sophisticated modern serif headings paired with clean legible body fonts.',
      },
    ],
    visualType: 'eye',
  },
  {
    slideNumber: 6,
    title: 'Content Strategy Overview',
    badge: 'Editorial Themes',
    bulletPoints: [
      {
        label: 'Core Theme 1',
        text: 'Mindset & Resilience ("Becoming Unstuck when life feels overwhelming").',
      },
      {
        label: 'Core Theme 2',
        text: 'Self-Care & Daily Glow (nourishing routines, skin wellness, mental peace).',
      },
      {
        label: 'Core Theme 3',
        text: 'Career & Creative Confidence (navigating ambitions without losing your peace).',
      },
    ],
    visualType: 'eye',
  },
  {
    slideNumber: 7,
    title: 'Episode Structure & Flow',
    badge: 'Show Architecture',
    bulletPoints: [
      {
        label: 'Intro (0–3 mins)',
        text: 'Signature chime, warm check-in question, guest introduction.',
      },
      {
        label: 'Heart-to-Heart (4–28 mins)',
        text: 'Deep-dive conversation on overcoming life hurdles and discovering strength.',
      },
      {
        label: 'Glow-Up Takeaway (29–35 mins)',
        text: 'One actionable self-love challenge for listeners to practice throughout the week.',
      },
    ],
    visualType: 'standard',
  },
  {
    slideNumber: 8,
    title: 'Social Media Strategy',
    badge: 'Distribution Engine',
    bulletPoints: [
      {
        label: 'Platforms to Use',
        text: 'Instagram (Primary hub), TikTok (Viral audio snippets), YouTube (Video interviews).',
      },
      {
        label: 'Content Formats',
        text: 'Episode promotional flyers, quote carousels, video reels, and interactive stories.',
      },
      {
        label: 'Live Shows',
        text: 'Instagram Live co-hosting sessions with featured guests before major episode drops.',
      },
    ],
    visualType: 'eye',
  },
  {
    slideNumber: 9,
    title: 'Audience Engagement Strategy',
    badge: 'Community Retention',
    bulletPoints: [
      {
        label: 'Story Stickers',
        text: 'Weekly "Ask Me Anything" polls and vulnerability prompts.',
      },
      {
        label: 'Live Discussions',
        text: 'Interactive Q&A sessions where listeners share their personal breakthrough stories.',
      },
      {
        label: 'Community Reposts',
        text: 'Amplifying listener listening setups and journal entries on the main page.',
      },
    ],
    visualType: 'metrics',
  },
  {
    slideNumber: 10,
    title: 'Thank You',
    subtitle: 'Glow and Grow Podcast',
    badge: 'Brand Strategy Guide 2025',
    mainText: 'Designed & Engineered with Strategic Care by Deborah Odion',
    visualType: 'thankyou',
  },
];

// ==========================================
// 4. KARRY LISLE (5 SLIDES)
// ==========================================
const KARRY_LISLE_SLIDES: DeckSlide[] = [
  {
    slideNumber: 1,
    title: 'The Karry Lisle Ecosystem',
    subtitle: 'Executive Content Strategy & Lead Gen Architecture',
    badge: 'B2B Enterprise Positioning',
    mainText: 'A strategic framework designed to position Karry Lisle as a premier authority in AI transformation and systems thinking.',
    visualType: 'cover',
  },
  {
    slideNumber: 2,
    title: 'Target Audience Profile',
    badge: 'Audience Persona',
    bulletPoints: [
      { label: 'Primary', text: 'C-Suite Executives & Enterprise Innovation Leaders seeking AI adoption models.' },
      { label: 'Secondary', text: 'Fractional Executives, System Designers, and Purpose-Driven Founders.' },
      { label: 'Core Pain Point', text: 'Overwhelmed by abstract AI hype without actionable operational frameworks.' },
    ],
    visualType: 'standard',
  },
  {
    slideNumber: 3,
    title: 'Core Content Pillars',
    badge: 'Strategic Architecture',
    bulletPoints: [
      { label: 'Pillar 1: AI Transformation', text: 'Demystifying generative AI and workflow orchestration for enterprise teams.' },
      { label: 'Pillar 2: Systems Thinking', text: 'Architecting sustainable business processes and scalable technology stacks.' },
      { label: 'Pillar 3: Founder Philosophy', text: 'Purpose-driven leadership, intentionality, and sustainable innovation.' },
      { label: 'Pillar 4: Proof & Case Studies', text: 'Real client transformations, workflow automations, and operational benchmarks.' },
    ],
    visualType: 'eye',
  },
  {
    slideNumber: 4,
    title: 'Lead Generation Funnel',
    badge: 'Conversion Engine',
    bulletPoints: [
      { label: 'Top of Funnel', text: 'High-value educational LinkedIn carousels and thought leadership posts.' },
      { label: 'Middle of Funnel', text: 'Save-worthy framework diagrams and actionable implementation checklists.' },
      { label: 'Bottom of Funnel', text: 'Direct invitations to executive advisory calls and proprietary AI audit blueprints.' },
    ],
    visualType: 'standard',
  },
  {
    slideNumber: 5,
    title: 'Execution & Publishing Rhythm',
    badge: 'Operational Cadence',
    bulletPoints: [
      { label: 'Cadence', text: '4 high-impact long-form posts and carousels per week on LinkedIn.' },
      { label: 'Community', text: 'Daily 30-minute proactive engagement with key industry thought leaders.' },
      { label: 'Review', text: 'Bi-weekly analytics check-ins to optimize hook engagement and lead magnet downloads.' },
    ],
    visualType: 'thankyou',
  },
];

// ==========================================
// 5. SETLINN (5 SLIDES)
// ==========================================
const SETLINN_SLIDES: DeckSlide[] = [
  {
    slideNumber: 1,
    title: 'Setlinn Growth Plan',
    subtitle: 'Social Media Strategy Research & 10-Slide Action Plan',
    badge: 'Global Mobility & Community',
    mainText: 'Research-grounded social growth roadmap tailored for international migrants, students, and global talent by Deborah Odion.',
    visualType: 'cover',
  },
  {
    slideNumber: 2,
    title: 'Audience Insights & Segmentation',
    badge: 'Global Community',
    bulletPoints: [
      { label: 'Prospective Students', text: 'Seeking transparent scholarship guidance, university requirements, and study visas.' },
      { label: 'Skilled Migrants', text: 'Navigating job sponsorship, visa pathways, and cross-border settlement.' },
      { label: 'Emotional Trigger', text: 'High uncertainty, need for relatable community support and reliable information.' },
    ],
    visualType: 'standard',
  },
  {
    slideNumber: 3,
    title: 'Dual Platform Architecture',
    badge: 'Platform Differentiation',
    bulletPoints: [
      { label: 'Instagram', text: 'Visual community warmth, relatable student reels, cultural tips, and lifestyle advice.' },
      { label: 'LinkedIn', text: 'Formal career advancement, global job sponsorship guides, and professional immigration insights.' },
    ],
    visualType: 'eye',
  },
  {
    slideNumber: 4,
    title: 'Content Pillars & Formats',
    badge: 'Engagement Strategy',
    bulletPoints: [
      { label: 'Step-by-Step Checklists', text: 'Save-worthy carousels breaking down complex visa application steps.' },
      { label: 'Relatable Relocation Hooks', text: '"What I wish I knew before moving abroad" narrative reels.' },
      { label: 'Community Spotlights', text: 'User success stories that prove the value of the Setlinn ecosystem.' },
    ],
    visualType: 'eye',
  },
  {
    slideNumber: 5,
    title: 'Weekly Cadence & Community Management',
    badge: 'Consistency Model',
    bulletPoints: [
      { label: 'Schedule', text: '4 posts weekly with coordinated comment moderation during peak migration research hours.' },
      { label: 'Interactive Stories', text: 'Daily migration Q&A stickers, relocation polls, and resource links.' },
      { label: 'Outcome', text: 'Position Setlinn as the most trustworthy relocation companion.' },
    ],
    visualType: 'thankyou',
  },
];

// Complete verified portfolio of Deborah Odion
const DEFAULT_AUTHENTIC_WORK_ITEMS: WorkItem[] = [
  {
    id: 'work-debbys-treat',
    title: "Debby's Treat — Social Media Strategy & Growth Playbook",
    category: 'strategy',
    categoryLabel: 'Strategy Deck (11 Slides)',
    description:
      'Complete 11-slide confectionery social media strategy detailing 3-month growth goals (1,000 IG followers, 50 monthly orders), competitor gap analysis, target audience personas, and WhatsApp conversion funnels.',
    imageUrl: debbysTreatImg,
    deliverables: [
      '11-Slide Strategy Deck',
      'Goals & 3-Month Objectives',
      'Competitor Analysis',
      '4x Weekly Schedule',
      'WhatsApp Funnel',
    ],
    platform: 'Instagram, Facebook & WhatsApp',
    dateAdded: 'Verified Brand Strategy',
    slides: DEBBYS_TREAT_SLIDES,
  },
  {
    id: 'work-glow-and-grow',
    title: 'Larana Inc. — Glow and Grow Podcast Brand Strategy Guide (2025)',
    category: 'strategy',
    categoryLabel: 'Brand Strategy Guide (10 Slides)',
    description:
      'Full 10-slide brand strategy guide for Larana Inc., defining target female demographics, brand voice and aesthetic guidelines, episode structure and flow, and multi-channel social media tactics.',
    imageUrl: glowAndGrowImg,
    deliverables: [
      '10-Slide Brand Guide',
      'Audience Demographics',
      'Brand Voice & Tone',
      'Episode Flow Architecture',
      'Instagram Live Tactics',
    ],
    platform: 'Podcast, Instagram & TikTok',
    dateAdded: 'Verified Client Guide',
    slides: GLOW_AND_GROW_SLIDES,
  },
  {
    id: 'work-iamwhoisayiam',
    title: '<I AM WHO I SAY I AM.GLOBAL>™ — Social Media Posting Strategy',
    category: 'strategy',
    categoryLabel: 'Posting Strategy (9 Slides)',
    description:
      'Authentic 9-slide operational posting strategy detailing a 5-day posting schedule (8:00–11:00 AM), 6 defined content pillars, weekly content mix, 2-tier group distribution, and operational production workflows.',
    imageUrl: iamwhoisayiamImg,
    deliverables: [
      '9-Slide Strategy Deck',
      '6 Content Pillars',
      '5-Day Posting Cadence',
      'Group Posting Strategy',
      'Weekly Targets',
    ],
    platform: 'LinkedIn Company Page & Instagram',
    dateAdded: 'Verified Client Deliverable',
    slides: IAMWHOISAYIAM_SLIDES,
  },
  {
    id: 'work-glow-up-flyer',
    title: 'The Glow Up Journey — Episode 07 Promotional Flyer',
    category: 'graphics',
    categoryLabel: 'Flyers & Single Graphics',
    description:
      'High-conversion promotional flyer for Instagram Live Episode 07: "Becoming Unstuck: How to Move Forward When Life Feels Heavy" featuring guest speaker Olivia Wilson, with custom typography and organic aesthetic framing.',
    imageUrl: glowUpFlyerImg,
    deliverables: [
      'Instagram Live Event Flyer',
      'Typography & Layout Framing',
      'Guest Speaker Feature',
      'Promotional Social Asset',
    ],
    platform: 'Instagram Live & Feed',
    dateAdded: 'Verified Creative Asset',
  },
  {
    id: 'work-karry-lisle',
    title: 'The Karry Lisle Ecosystem — Content Strategy Framework',
    category: 'strategy',
    categoryLabel: 'Strategy Deck & Framework',
    description:
      'Strategic executive framework designed to position the Karry Lisle ecosystem as a trusted authority in AI transformation, systems thinking, and purpose-driven leadership.',
    imageUrl: karryLisleImg,
    deliverables: [
      'Executive Strategy Deck',
      'AI Systems Framework',
      'Lead Generation Architecture',
      'Lead Magnet Funnel',
    ],
    platform: 'LinkedIn & B2B Ecosystem',
    dateAdded: 'Verified Client Project',
    slides: KARRY_LISLE_SLIDES,
  },
  {
    id: 'work-setlinn',
    title: 'Setlinn — Social Media Strategy Research & Growth Plan',
    category: 'strategy',
    categoryLabel: 'Strategy Deck & Growth Plan',
    description:
      'Research-grounded social growth plan defining platform differentiation, community engagement mechanisms, and educational migration content pillars for Setlinn by Deborah Odion.',
    imageUrl: setlinnImg,
    deliverables: [
      '10-Slide Deck',
      'Content Pillars',
      'Growth Plan',
      'Engagement Strategy',
    ],
    platform: 'Instagram & LinkedIn',
    dateAdded: 'Verified Client Project',
    slides: SETLINN_SLIDES,
  },
];

export const WorkGallery: React.FC = () => {
  // Load saved custom work items from localStorage (v6 with Daily Content Plan removed)
  const [workItems, setWorkItems] = useState<WorkItem[]>(() => {
    try {
      const saved = localStorage.getItem('deborah_work_gallery_items_v6');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Keep custom items while guaranteeing default items are updated
          const defaultIds = new Set(DEFAULT_AUTHENTIC_WORK_ITEMS.map((d) => d.id));
          const customOnly = parsed.filter(
            (p: WorkItem) => !defaultIds.has(p.id) && p.id !== 'work-calendar-workflow'
          );
          return [...DEFAULT_AUTHENTIC_WORK_ITEMS, ...customOnly];
        }
      }
    } catch {
      // fallback
    }
    return DEFAULT_AUTHENTIC_WORK_ITEMS;
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Modals state
  const [activeDeckItem, setActiveDeckItem] = useState<WorkItem | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // New item upload form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'strategy' | 'carousels' | 'feed' | 'graphics' | 'reels' | 'stories'>('carousels');
  const [newDescription, setNewDescription] = useState('');
  const [newDeliverables, setNewDeliverables] = useState('');
  const [newPlatform, setNewPlatform] = useState('Instagram');
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const quickUploadInputRef = useRef<HTMLInputElement>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('deborah_work_gallery_items_v6', JSON.stringify(workItems));
    } catch (e) {
      console.warn('LocalStorage limit reached or failed', e);
    }
  }, [workItems]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setNewImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuickAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File, index: number) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const newItem: WorkItem = {
            id: `work-custom-${Date.now()}-${index}`,
            title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || 'Portfolio Piece',
            category: 'carousels',
            categoryLabel: 'Carousels & Multi-Slide',
            description: 'Client deliverable created by Deborah Odion.',
            imageUrl: reader.result,
            deliverables: ['Custom Asset', 'Client Deliverable'],
            platform: 'Social Media',
            dateAdded: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          };
          setWorkItems((prev) => [...prev, newItem]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (quickUploadInputRef.current) {
      quickUploadInputRef.current.value = '';
    }
  };

  const handleCreateNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const deliverablesArray = newDeliverables
      .split(',')
      .map((d) => d.trim())
      .filter(Boolean);

    const catLabelObj = CATEGORIES.find((c) => c.id === newCategory);
    const categoryLabel = catLabelObj ? catLabelObj.label : 'Social Deliverable';

    const newItem: WorkItem = {
      id: `work-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      categoryLabel,
      description: newDescription.trim() || 'Client deliverable created by Deborah Odion.',
      imageUrl: newImagePreview || undefined,
      deliverables: deliverablesArray.length > 0 ? deliverablesArray : ['Social Asset', 'Content Design'],
      platform: newPlatform || 'Instagram',
      dateAdded: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };

    setWorkItems((prev) => [...prev, newItem]);

    // Reset
    setNewTitle('');
    setNewCategory('carousels');
    setNewDescription('');
    setNewDeliverables('');
    setNewPlatform('Instagram');
    setNewImagePreview(null);
    setIsUploadModalOpen(false);
  };

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWorkItems((prev) => prev.filter((item) => item.id !== id));
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(null);
    }
    if (activeDeckItem?.id === id) {
      setActiveDeckItem(null);
    }
  };

  const filteredItems =
    activeCategory === 'all'
      ? workItems
      : workItems.filter((item) => item.category === activeCategory);

  const activeLightboxItem =
    activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  const handleOpenDeck = (item: WorkItem) => {
    setActiveDeckItem(item);
    setActiveSlideIndex(0);
  };

  const handlePrevSlide = () => {
    if (!activeDeckItem?.slides) return;
    if (activeSlideIndex > 0) {
      setActiveSlideIndex(activeSlideIndex - 1);
    } else {
      setActiveSlideIndex(activeDeckItem.slides.length - 1);
    }
  };

  const handleNextSlide = () => {
    if (!activeDeckItem?.slides) return;
    if (activeSlideIndex < activeDeckItem.slides.length - 1) {
      setActiveSlideIndex(activeSlideIndex + 1);
    } else {
      setActiveSlideIndex(0);
    }
  };

  return (
    <section
      id="work"
      className="py-24 lg:py-32 bg-[#F7F1E6] text-[#242424] border-t border-[#E9DDC9] relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 pb-6 border-b border-[#E9DDC9] gap-6">
          <div className="text-left">
            <div
              id="work-eyebrow-badge"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#17352D] text-[#B08D3C] text-xs uppercase tracking-[0.2em] font-semibold mb-3"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Section 05 • Work Gallery &amp; Strategy Decks</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#17352D] font-normal tracking-tight">
              Selected Work &amp; Strategy Playbooks
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#242424]/80 mt-2 max-w-2xl leading-relaxed">
              Explore authentic social media posting strategies, brand guide presentations, promotional flyers, and operational calendars delivered by Deborah Odion.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <input
              ref={quickUploadInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleQuickAddFiles}
              className="hidden"
              id="work-quick-upload-input"
            />
            <button
              type="button"
              onClick={() => quickUploadInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#17352D] hover:bg-[#20473d] text-[#E9DDC9] hover:text-[#B08D3C] border border-[#B08D3C]/40 text-xs font-medium rounded-sm transition-colors shadow-sm cursor-pointer"
              title="Quickly add image files directly to the gallery"
            >
              <Upload className="w-3.5 h-3.5 text-[#B08D3C]" />
              <span>Upload Work Images</span>
            </button>

            <button
              type="button"
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#B08D3C] hover:bg-[#c29d47] text-[#0F2922] font-semibold text-xs rounded-sm transition-colors shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add Custom Project Piece</span>
            </button>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 overflow-x-auto">
          {CATEGORIES.map((cat) => {
            const count =
              cat.id === 'all'
                ? workItems.length
                : workItems.filter((i) => i.category === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-sm text-xs tracking-wider uppercase font-medium transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#17352D] text-[#B08D3C] border border-[#B08D3C] shadow-sm'
                    : 'bg-[#FFFFFF] text-[#242424]/70 hover:text-[#17352D] border border-[#E9DDC9]'
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredItems.map((item, idx) => {
              const hasSlides = item.slides && item.slides.length > 0;
              return (
                <div
                  key={item.id}
                  id={`work-item-card-${item.id}`}
                  className="bg-[#FFFFFF] border border-[#E9DDC9] hover:border-[#B08D3C] rounded-sm overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col justify-between group text-left"
                >
                  {/* Visual Preview / Image */}
                  <div
                    onClick={() => {
                      if (hasSlides) {
                        handleOpenDeck(item);
                      } else {
                        setActiveLightboxIndex(idx);
                      }
                    }}
                    className="cursor-pointer bg-[#0F2922] relative overflow-hidden aspect-[4/3] flex items-center justify-center"
                  >
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="p-8 text-center flex flex-col items-center justify-center text-[#E9DDC9]/70">
                        <div className="w-12 h-12 rounded-full bg-[#17352D] border border-[#B08D3C]/40 flex items-center justify-center text-[#B08D3C] mb-3">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-serif text-[#F7F1E6]">
                          {item.categoryLabel}
                        </span>
                      </div>
                    )}

                    {/* Category Pill Over Image */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-sm bg-[#0F2922]/90 backdrop-blur-sm text-[#B08D3C] border border-[#B08D3C]/40 text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                        {hasSlides ? <Presentation className="w-3 h-3 text-[#B08D3C]" /> : <Layers className="w-3 h-3 text-[#B08D3C]" />}
                        <span>{item.categoryLabel}</span>
                      </span>
                    </div>

                    {/* Slide Count Indicator for Interactive Decks */}
                    {hasSlides && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-0.5 rounded-sm bg-[#17352D] text-[#F7F1E6] text-[10px] font-medium border border-[#B08D3C]/50 shadow-md">
                          {item.slides?.length} Slides
                        </span>
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#0F2922]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-[#17352D] text-[#F7F1E6] px-3.5 py-1.5 rounded-sm text-xs font-medium border border-[#B08D3C] inline-flex items-center gap-1.5 shadow-lg">
                        {hasSlides ? (
                          <>
                            <Presentation className="w-3.5 h-3.5 text-[#B08D3C]" />
                            <span>Open Strategy Deck Reader</span>
                          </>
                        ) : (
                          <>
                            <ZoomIn className="w-3.5 h-3.5 text-[#B08D3C]" />
                            <span>View Full Size</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase tracking-wider text-[#B08D3C] font-semibold">
                          {item.platform || 'Social Channel'}
                        </span>
                        {item.id.startsWith('work-custom-') && (
                          <button
                            type="button"
                            onClick={(e) => handleDeleteItem(item.id, e)}
                            className="text-[#242424]/40 hover:text-red-600 p-1 transition-colors"
                            title="Delete piece"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <h3 className="font-serif text-xl font-normal text-[#17352D] mb-2 group-hover:text-[#B08D3C] transition-colors leading-snug">
                        {item.title}
                      </h3>

                      <p className="font-sans text-xs text-[#242424]/75 leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>

                    {/* Deliverables Tags & Slide Deck Action */}
                    <div>
                      <div className="pt-3 border-t border-[#E9DDC9] mb-4">
                        <div className="flex flex-wrap gap-1.5">
                          {item.deliverables.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] px-2 py-0.5 rounded-sm bg-[#F7F1E6] text-[#17352D] border border-[#E9DDC9]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {hasSlides && (
                        <button
                          type="button"
                          onClick={() => handleOpenDeck(item)}
                          className="w-full py-2 px-3 bg-[#17352D] hover:bg-[#20473d] text-[#F7F1E6] hover:text-[#B08D3C] text-xs rounded-sm border border-[#B08D3C]/40 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                        >
                          <Presentation className="w-3.5 h-3.5 text-[#B08D3C]" />
                          <span>View Full Strategy Deck ({item.slides?.length} Slides)</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div
            onClick={() => quickUploadInputRef.current?.click()}
            className="border-2 border-dashed border-[#B08D3C]/40 hover:border-[#B08D3C] bg-[#FFFFFF] rounded-sm p-12 sm:p-16 text-center cursor-pointer transition-all duration-200 mb-16 group shadow-sm"
          >
            <div className="w-16 h-16 rounded-full bg-[#17352D] border border-[#B08D3C]/40 flex items-center justify-center text-[#B08D3C] mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#17352D] mb-2">
              Add Your First Portfolio Pieces
            </h3>
            <p className="text-sm text-[#242424]/75 max-w-md mx-auto mb-6">
              Upload screenshots of your carousels, feed aesthetic layouts, reel covers, or graphics. All images are displayed in full uncropped resolution.
            </p>
            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B08D3C] text-[#0F2922] font-semibold text-xs uppercase tracking-wider rounded-sm shadow-md">
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Select Images to Showcase</span>
            </span>
          </div>
        )}

        {/* Authenticity Notice */}
        <div className="p-4 bg-[#17352D] text-[#F7F1E6] border border-[#B08D3C]/30 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-md">
          <p className="text-xs text-[#E9DDC9]/80 flex items-center justify-center sm:justify-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#B08D3C] flex-shrink-0" />
            <span>
              Strict portfolio integrity: Features real client strategy decks, brand guides, event flyers, and operational calendars by Deborah Odion.
            </span>
          </p>
          <button
            type="button"
            onClick={() => quickUploadInputRef.current?.click()}
            className="text-xs text-[#B08D3C] hover:underline whitespace-nowrap cursor-pointer"
          >
            + Upload work screenshots
          </button>
        </div>

      </div>

      {/* ============================================================
          INTERACTIVE STRATEGY DECK VIEWER MODAL
          Matches Google Slides / Pitch presentation layout exactly
      ============================================================ */}
      {activeDeckItem && activeDeckItem.slides && (
        <div
          id="strategy-deck-modal"
          className="fixed inset-0 z-50 bg-[#0A1A16]/95 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6"
          onClick={() => setActiveDeckItem(null)}
        >
          {/* Top Bar: Title, Slide Counter & Controls */}
          <div
            className="w-full max-w-6xl flex items-center justify-between pb-3 border-b border-[#B08D3C]/20 text-[#F7F1E6]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="p-1.5 rounded-sm bg-[#17352D] text-[#B08D3C] border border-[#B08D3C]/40">
                <Presentation className="w-4 h-4" />
              </span>
              <div className="min-w-0">
                <h3 className="font-serif text-base sm:text-lg text-[#F7F1E6] truncate font-medium">
                  {activeDeckItem.title}
                </h3>
                <p className="text-[11px] text-[#B08D3C]">
                  Interactive Strategy Presentation Deck • Slide {activeSlideIndex + 1} of{' '}
                  {activeDeckItem.slides.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {activeDeckItem.imageUrl && (
                <button
                  type="button"
                  onClick={() => {
                    const idx = filteredItems.findIndex((i) => i.id === activeDeckItem.id);
                    setActiveDeckItem(null);
                    if (idx !== -1) setActiveLightboxIndex(idx);
                  }}
                  className="px-3 py-1.5 text-xs bg-[#17352D] hover:bg-[#20473d] text-[#B08D3C] hover:text-[#F7F1E6] rounded-sm border border-[#B08D3C]/30 hidden sm:inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>View Original Deck Cover</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setActiveDeckItem(null)}
                className="p-2 rounded-full bg-[#17352D] hover:bg-[#B08D3C] text-[#F7F1E6] hover:text-[#0F2922] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Slide Canvas (16:9 Presentation Format) */}
          <div
            className="w-full max-w-5xl my-auto py-2 flex items-center justify-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Slide Arrow */}
            <button
              type="button"
              onClick={handlePrevSlide}
              className="absolute -left-2 sm:-left-6 z-20 p-2.5 rounded-full bg-[#17352D]/90 hover:bg-[#B08D3C] text-[#F7F1E6] hover:text-[#0F2922] transition-colors border border-[#B08D3C]/40 shadow-xl cursor-pointer"
              title="Previous Slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Active Slide Renderer */}
            {(() => {
              const currentSlide = activeDeckItem.slides[activeSlideIndex];
              if (!currentSlide) return null;

              // Cover Slide Archetype
              if (currentSlide.visualType === 'cover') {
                return (
                  <div className="w-full aspect-[16/9] max-h-[65vh] bg-[#0E231D] text-[#F7F1E6] rounded-sm border border-[#B08D3C]/40 shadow-2xl relative overflow-hidden flex flex-col justify-between p-8 sm:p-14 text-center">
                    {/* Artistic Chromatic Eye Glow background */}
                    <div className="absolute inset-0 pointer-events-none opacity-40">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-tr from-[#9e2a2b] via-[#c2593f] to-[#2a9d8f] blur-3xl" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 rounded-full border-2 border-[#B08D3C]/40" />
                    </div>

                    <div className="relative z-10 flex items-center justify-between text-xs text-[#B08D3C] uppercase tracking-widest font-semibold">
                      <span>Presentation Deck</span>
                      <span>Slide {currentSlide.slideNumber}</span>
                    </div>

                    <div className="relative z-10 my-auto">
                      <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#F7F1E6] leading-tight mb-2">
                        {currentSlide.title}
                      </h1>
                      <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-light text-[#E9DDC9] tracking-tight mb-6">
                        {currentSlide.subtitle}
                      </h2>

                      {currentSlide.badge && (
                        <div className="inline-block px-4 py-1.5 rounded-sm bg-[#17352D]/80 border border-[#B08D3C]/60 text-[#B08D3C] text-xs sm:text-sm font-medium tracking-wider">
                          {currentSlide.badge}
                        </div>
                      )}
                    </div>

                    <div className="relative z-10 text-xs text-[#E9DDC9]/70">
                      Deborah Odion • Verified Social Media Strategy
                    </div>
                  </div>
                );
              }

              // Standard Content Slide with Optional Stylized Eye/Graphic on the Right
              return (
                <div className="w-full aspect-[16/9] max-h-[65vh] bg-[#F7F1E6] text-[#242424] rounded-sm border border-[#B08D3C]/40 shadow-2xl relative overflow-hidden flex flex-col justify-between p-6 sm:p-10 text-left">
                  {/* Top Slide Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#E9DDC9]">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#17352D] text-[#B08D3C] text-xs flex items-center justify-center font-serif font-bold">
                        {currentSlide.slideNumber}
                      </span>
                      <span className="text-[11px] uppercase tracking-wider text-[#17352D] font-semibold">
                        {activeDeckItem.title.split('—')[0]}
                      </span>
                    </div>

                    {currentSlide.badge && (
                      <span className="px-2.5 py-0.5 rounded-sm bg-[#17352D] text-[#B08D3C] text-[10px] uppercase tracking-wider font-semibold">
                        {currentSlide.badge}
                      </span>
                    )}
                  </div>

                  {/* Slide Body */}
                  <div className="my-auto py-2 flex items-center justify-between gap-6">
                    <div className="flex-1 max-w-2xl">
                      <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl text-[#17352D] font-medium tracking-tight mb-2">
                        {currentSlide.title}
                      </h2>

                      {currentSlide.subtitle && (
                        <p className="text-xs sm:text-sm text-[#17352D]/80 font-medium mb-4">
                          {currentSlide.subtitle}
                        </p>
                      )}

                      {currentSlide.mainText && (
                        <p className="font-serif text-base sm:text-xl text-[#17352D] leading-relaxed italic bg-[#FFFFFF] p-5 rounded-sm border border-[#E9DDC9]">
                          "{currentSlide.mainText}"
                        </p>
                      )}

                      {currentSlide.bulletPoints && (
                        <div className="space-y-2 sm:space-y-2.5 max-h-[38vh] overflow-y-auto pr-2">
                          {currentSlide.bulletPoints.map((bp, bpIdx) => (
                            <div
                              key={bpIdx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-[#242424]/90"
                            >
                              <span className="text-[#B08D3C] text-base leading-none font-bold mt-0.5">
                                •
                              </span>
                              <div>
                                {bp.label && (
                                  <strong className="text-[#17352D] font-semibold mr-1.5">
                                    {bp.label}:
                                  </strong>
                                )}
                                <span>{bp.text}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Stylized Eye Motif for Slides with visualType === 'eye' */}
                    {currentSlide.visualType === 'eye' && (
                      <div className="hidden md:flex flex-col items-center justify-center w-44 h-44 rounded-full bg-[#FFFFFF] border-2 border-[#E9DDC9] p-4 shadow-sm flex-shrink-0">
                        <div className="relative w-32 h-16 flex items-center justify-center">
                          <div className="w-28 h-14 border-2 border-[#17352D] rounded-[50%_50%_50%_50%_/_100%_100%_0%_0%] rotate-45 transform flex items-center justify-center overflow-hidden bg-gradient-to-tr from-[#9e2a2b] via-[#c2593f] to-[#2a9d8f]/30">
                            <div className="w-8 h-8 rounded-full bg-[#17352D] border-2 border-[#B08D3C] flex items-center justify-center">
                              <div className="w-3 h-3 rounded-full bg-[#B08D3C]" />
                            </div>
                          </div>
                        </div>
                        <span className="text-[9px] uppercase tracking-widest text-[#17352D]/60 mt-3 font-semibold">
                          Vision &amp; Focus
                        </span>
                      </div>
                    )}

                    {/* Metrics Icon for slides with visualType === 'metrics' */}
                    {currentSlide.visualType === 'metrics' && (
                      <div className="hidden md:flex flex-col items-center justify-center w-40 h-40 rounded-sm bg-[#17352D] text-[#F7F1E6] p-4 shadow-md flex-shrink-0 border border-[#B08D3C]/40">
                        <Target className="w-10 h-10 text-[#B08D3C] mb-2" />
                        <span className="text-xs uppercase tracking-widest text-[#F7F1E6] font-semibold text-center">
                          Growth Targets
                        </span>
                      </div>
                    )}

                    {/* Thank You Graphic */}
                    {currentSlide.visualType === 'thankyou' && (
                      <div className="hidden md:flex flex-col items-center justify-center w-40 h-40 rounded-sm bg-[#17352D] text-[#B08D3C] p-4 shadow-md flex-shrink-0 border border-[#B08D3C]/40">
                        <CheckCircle className="w-10 h-10 text-[#B08D3C] mb-2" />
                        <span className="text-xs uppercase tracking-widest text-[#F7F1E6] font-semibold text-center">
                          Verified Strategy
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Slide Footer */}
                  <div className="pt-3 border-t border-[#E9DDC9] flex items-center justify-between text-[10px] text-[#242424]/60">
                    <span>{activeDeckItem.platform || 'Social Media Posting Strategy'}</span>
                    <span>Deborah Odion Social Architecture</span>
                  </div>
                </div>
              );
            })()}

            {/* Next Slide Arrow */}
            <button
              type="button"
              onClick={handleNextSlide}
              className="absolute -right-2 sm:-right-6 z-20 p-2.5 rounded-full bg-[#17352D]/90 hover:bg-[#B08D3C] text-[#F7F1E6] hover:text-[#0F2922] transition-colors border border-[#B08D3C]/40 shadow-xl cursor-pointer"
              title="Next Slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnail Strip (Matching Google Slides/Pitch layout from screenshot) */}
          <div
            className="w-full max-w-6xl pt-3 border-t border-[#B08D3C]/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-start gap-2 overflow-x-auto pb-2 px-1">
              {activeDeckItem.slides.map((slide, sIdx) => {
                const isCurrent = sIdx === activeSlideIndex;
                return (
                  <button
                    key={slide.slideNumber}
                    type="button"
                    onClick={() => setActiveSlideIndex(sIdx)}
                    className={`flex-shrink-0 w-28 sm:w-32 h-16 sm:h-18 p-1.5 rounded-sm border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isCurrent
                        ? 'bg-[#17352D] border-[#B08D3C] shadow-lg ring-1 ring-[#B08D3C]'
                        : 'bg-[#0F2922] border-[#B08D3C]/20 opacity-60 hover:opacity-100 hover:border-[#B08D3C]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[9px]">
                      <span className={`font-semibold ${isCurrent ? 'text-[#B08D3C]' : 'text-[#E9DDC9]'}`}>
                        {slide.slideNumber}
                      </span>
                      <span className="text-[8px] text-[#E9DDC9]/50 truncate max-w-[70px]">
                        {slide.badge || 'Slide'}
                      </span>
                    </div>

                    <p
                      className={`text-[10px] font-medium leading-tight truncate ${
                        isCurrent ? 'text-[#F7F1E6]' : 'text-[#E9DDC9]/80'
                      }`}
                    >
                      {slide.title}
                    </p>

                    <div className="w-full bg-[#17352D] h-1 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${isCurrent ? 'bg-[#B08D3C]' : 'bg-[#B08D3C]/30'}`}
                        style={{ width: `${((sIdx + 1) / activeDeckItem.slides.length) * 100}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen Lightbox Modal for Images without Slides */}
      {activeLightboxItem && (
        <div
          id="work-lightbox-modal"
          className="fixed inset-0 z-50 bg-[#0F2922]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <div className="w-full max-w-5xl flex items-center justify-between pb-4 text-[#F7F1E6]">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#B08D3C] font-semibold block mb-0.5">
                {activeLightboxItem.categoryLabel}
              </span>
              <h4 className="font-serif text-xl text-[#F7F1E6]">
                {activeLightboxItem.title}
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setActiveLightboxIndex(null)}
              className="p-2 rounded-full bg-[#17352D] hover:bg-[#B08D3C] text-[#F7F1E6] hover:text-[#0F2922] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative max-w-5xl w-full flex items-center justify-center">
            {/* Lightbox Content Card */}
            <div
              className="max-w-4xl max-h-[85vh] overflow-auto rounded-sm border border-[#B08D3C]/40 bg-[#FFFFFF] shadow-2xl p-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {activeLightboxItem.imageUrl ? (
                <img
                  src={activeLightboxItem.imageUrl}
                  alt={activeLightboxItem.title}
                  className="w-full h-auto max-h-[70vh] object-contain mx-auto rounded-sm"
                />
              ) : (
                <div className="py-20 text-[#17352D]">
                  <ImageIcon className="w-16 h-16 mx-auto mb-3 text-[#B08D3C]" />
                  <p className="text-sm">High-resolution piece preview</p>
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-[#E9DDC9] text-left">
                <p className="text-xs text-[#242424]/80">
                  {activeLightboxItem.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Custom Project Piece Modal */}
      {isUploadModalOpen && (
        <div
          id="work-upload-modal"
          className="fixed inset-0 z-50 bg-[#0F2922]/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsUploadModalOpen(false)}
        >
          <div
            className="bg-[#17352D] border border-[#B08D3C] text-[#F7F1E6] rounded-sm p-6 sm:p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-4 right-4 text-[#E9DDC9]/70 hover:text-[#B08D3C] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-1">
              <Plus className="w-4 h-4" />
              <span>Add Work Piece</span>
            </div>
            <h3 className="font-serif text-2xl text-[#F7F1E6] mb-1">
              Upload Portfolio Piece
            </h3>
            <p className="text-xs text-[#E9DDC9]/70 mb-6">
              Add a new carousel, reel cover, strategy deck, flyer, or graphic to your portfolio.
            </p>

            <form onSubmit={handleCreateNewItem} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fintech Carousel Series"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#0F2922] border border-[#B08D3C]/40 text-[#F7F1E6] px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#B08D3C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-1">
                    Format / Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-[#0F2922] border border-[#B08D3C]/40 text-[#F7F1E6] px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#B08D3C]"
                  >
                    <option value="strategy">Strategy Decks &amp; Frameworks</option>
                    <option value="carousels">Carousels &amp; Multi-Slide</option>
                    <option value="feed">Feed &amp; Content Operations</option>
                    <option value="graphics">Flyers &amp; Single Graphics</option>
                    <option value="reels">Reels &amp; Video Covers</option>
                    <option value="stories">Stories &amp; Layouts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-1">
                    Platform
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Instagram &amp; LinkedIn"
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value)}
                    className="w-full bg-[#0F2922] border border-[#B08D3C]/40 text-[#F7F1E6] px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#B08D3C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-1">
                  Deliverables (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 5-Slide Carousel, Copywriting, Visual Direction"
                  value={newDeliverables}
                  onChange={(e) => setNewDeliverables(e.target.value)}
                  className="w-full bg-[#0F2922] border border-[#B08D3C]/40 text-[#F7F1E6] px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#B08D3C]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe the objective, target audience, or result of this piece..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full bg-[#0F2922] border border-[#B08D3C]/40 text-[#F7F1E6] px-3 py-2 text-xs rounded-sm focus:outline-none focus:border-[#B08D3C]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#B08D3C] font-semibold mb-1">
                  Upload Visual Screenshot
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="w-full text-xs text-[#E9DDC9] file:mr-2 file:py-1.5 file:px-3 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-[#B08D3C] file:text-[#0F2922] hover:file:bg-[#c29d47]"
                />
                {newImagePreview && (
                  <div className="mt-3 p-2 bg-[#0F2922] rounded-sm border border-[#B08D3C]/30 text-center">
                    <img
                      src={newImagePreview}
                      alt="Preview"
                      className="max-h-32 object-contain mx-auto rounded-sm"
                    />
                  </div>
                )}
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#B08D3C] text-[#0F2922] font-semibold text-xs uppercase tracking-wider rounded-sm hover:bg-[#c29d47] transition-colors cursor-pointer"
                >
                  Save Piece to Work Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
