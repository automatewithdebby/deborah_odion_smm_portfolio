export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface HeroData {
  title: string;
  headline: string;
  positioning: string;
  primaryCta: string;
  secondaryCta: string;
  specializations: string[];
}

export interface ServicePackage {
  id: string;
  title: string;
  price: number;
  durationOrTurnaround: string;
  description: string;
  badge?: string;
  deliverables: string[];
  isPopular?: boolean;
}

export interface ServiceRegistration {
  id: string;
  serviceId: string;
  serviceTitle: string;
  servicePrice: number;
  clientName: string;
  clientEmail: string;
  clientHandle: string;
  platform: string;
  notes: string;
  submittedAt: string;
}
