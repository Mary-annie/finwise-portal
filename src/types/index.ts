export interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "ended";
  platform: "instagram" | "twitter" | "facebook" | "tiktok" | "linkedin";
  clicks: number;
  conversions: number;
  revenue: number;
  createdAt: string;
  type: "app_download" | "service" | "product";
}

export interface GeneratedLink {
  id: string;
  campaignId: string;
  campaignName: string;
  platform: "instagram" | "twitter" | "facebook" | "tiktok" | "linkedin" | "all";
  destination: "appstore" | "playstore" | "website" | "custom";
  shortUrl: string;
  originalUrl: string;
  clicks: number;
  createdAt: string;
  utm: {
    source: string;
    medium: string;
    campaign: string;
  };
}

export interface Creative {
  id: string;
  campaignId: string;
  campaignName: string;
  type: "poster" | "video" | "story" | "banner";
  title: string;
  platform: string;
  status: "draft" | "approved" | "live" | "archived";
  thumbnail: string;
  createdAt: string;
  dimensions: string;
  fileSize: string;
}

export interface AnalyticsData {
  date: string;
  clicks: number;
  conversions: number;
  revenue: number;
  instagram: number;
  twitter: number;
  facebook: number;
  tiktok: number;
  linkedin: number;
}

export interface User {
  name: string;
  email: string;
  role: string;
  avatar: string;
}
