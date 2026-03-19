import { Campaign, GeneratedLink, Creative, AnalyticsData } from "@/types";

export const mockCampaigns: Campaign[] = [
  { id: "c1", name: "Summer App Launch", status: "active", platform: "instagram", clicks: 24830, conversions: 1842, revenue: 92100, createdAt: "2024-06-01", type: "app_download" },
  { id: "c2", name: "Premium Service Promo", status: "active", platform: "facebook", clicks: 18204, conversions: 1103, revenue: 55150, createdAt: "2024-06-10", type: "service" },
  { id: "c3", name: "TikTok Viral Push", status: "paused", platform: "tiktok", clicks: 43200, conversions: 2100, revenue: 63000, createdAt: "2024-05-20", type: "app_download" },
  { id: "c4", name: "LinkedIn B2B Drive", status: "active", platform: "linkedin", clicks: 8920, conversions: 670, revenue: 134000, createdAt: "2024-06-15", type: "service" },
  { id: "c5", name: "Twitter Brand Awareness", status: "ended", platform: "twitter", clicks: 31000, conversions: 800, revenue: 24000, createdAt: "2024-05-01", type: "product" },
  { id: "c6", name: "Holiday App Bundle", status: "active", platform: "instagram", clicks: 11200, conversions: 980, revenue: 49000, createdAt: "2024-06-18", type: "app_download" },
];

export const mockLinks: GeneratedLink[] = [
  { id: "l1", campaignId: "c1", campaignName: "Summer App Launch", platform: "instagram", destination: "appstore", shortUrl: "go.brand.co/app-ig", originalUrl: "https://apps.apple.com/app/brand", clicks: 12400, createdAt: "2024-06-01", utm: { source: "instagram", medium: "social", campaign: "summer-launch" } },
  { id: "l2", campaignId: "c1", campaignName: "Summer App Launch", platform: "instagram", destination: "playstore", shortUrl: "go.brand.co/app-ig-gp", originalUrl: "https://play.google.com/store/apps/brand", clicks: 12430, createdAt: "2024-06-01", utm: { source: "instagram", medium: "social", campaign: "summer-launch" } },
  { id: "l3", campaignId: "c2", campaignName: "Premium Service Promo", platform: "facebook", destination: "website", shortUrl: "go.brand.co/svc-fb", originalUrl: "https://brand.co/premium", clicks: 18204, createdAt: "2024-06-10", utm: { source: "facebook", medium: "paid", campaign: "premium-promo" } },
  { id: "l4", campaignId: "c3", campaignName: "TikTok Viral Push", platform: "tiktok", destination: "playstore", shortUrl: "go.brand.co/viral-tt", originalUrl: "https://play.google.com/store/apps/brand", clicks: 43200, createdAt: "2024-05-20", utm: { source: "tiktok", medium: "social", campaign: "viral-push" } },
  { id: "l5", campaignId: "c4", campaignName: "LinkedIn B2B Drive", platform: "linkedin", destination: "website", shortUrl: "go.brand.co/b2b-li", originalUrl: "https://brand.co/enterprise", clicks: 8920, createdAt: "2024-06-15", utm: { source: "linkedin", medium: "social", campaign: "b2b-drive" } },
  { id: "l6", campaignId: "c6", campaignName: "Holiday App Bundle", platform: "all", destination: "appstore", shortUrl: "go.brand.co/holiday", originalUrl: "https://apps.apple.com/app/brand-holiday", clicks: 11200, createdAt: "2024-06-18", utm: { source: "multi", medium: "social", campaign: "holiday-bundle" } },
];

export const mockCreatives: Creative[] = [
  { id: "cr1", campaignId: "c1", campaignName: "Summer App Launch", type: "poster", title: "Summer Vibes Poster", platform: "instagram", status: "live", thumbnail: "/api/placeholder/400/500", createdAt: "2024-06-01", dimensions: "1080×1350", fileSize: "2.4 MB" },
  { id: "cr2", campaignId: "c1", campaignName: "Summer App Launch", type: "story", title: "App Story Template", platform: "instagram", status: "live", thumbnail: "/api/placeholder/400/700", createdAt: "2024-06-02", dimensions: "1080×1920", fileSize: "1.8 MB" },
  { id: "cr3", campaignId: "c2", campaignName: "Premium Service Promo", type: "banner", title: "Premium Banner Ad", platform: "facebook", status: "approved", thumbnail: "/api/placeholder/600/300", createdAt: "2024-06-10", dimensions: "1200×628", fileSize: "890 KB" },
  { id: "cr4", campaignId: "c3", campaignName: "TikTok Viral Push", type: "video", title: "15s App Demo", platform: "tiktok", status: "live", thumbnail: "/api/placeholder/400/700", createdAt: "2024-05-20", dimensions: "1080×1920", fileSize: "18.2 MB" },
  { id: "cr5", campaignId: "c4", campaignName: "LinkedIn B2B Drive", type: "poster", title: "Enterprise Solution", platform: "linkedin", status: "draft", thumbnail: "/api/placeholder/600/400", createdAt: "2024-06-15", dimensions: "1200×627", fileSize: "1.2 MB" },
  { id: "cr6", campaignId: "c6", campaignName: "Holiday App Bundle", type: "video", title: "Holiday Promo 30s", platform: "instagram", status: "approved", thumbnail: "/api/placeholder/400/400", createdAt: "2024-06-18", dimensions: "1080×1080", fileSize: "42.6 MB" },
];

export const mockAnalytics: AnalyticsData[] = [
  { date: "Jun 1", clicks: 4200, conversions: 310, revenue: 15500, instagram: 1800, twitter: 600, facebook: 1100, tiktok: 500, linkedin: 200 },
  { date: "Jun 3", clicks: 5800, conversions: 420, revenue: 21000, instagram: 2200, twitter: 800, facebook: 1500, tiktok: 900, linkedin: 400 },
  { date: "Jun 5", clicks: 7200, conversions: 520, revenue: 26000, instagram: 2800, twitter: 900, facebook: 1800, tiktok: 1300, linkedin: 400 },
  { date: "Jun 7", clicks: 6100, conversions: 440, revenue: 22000, instagram: 2400, twitter: 700, facebook: 1600, tiktok: 1000, linkedin: 400 },
  { date: "Jun 9", clicks: 8900, conversions: 630, revenue: 31500, instagram: 3200, twitter: 1100, facebook: 2100, tiktok: 1800, linkedin: 700 },
  { date: "Jun 11", clicks: 11200, conversions: 810, revenue: 40500, instagram: 4100, twitter: 1400, facebook: 2600, tiktok: 2400, linkedin: 700 },
  { date: "Jun 13", clicks: 9800, conversions: 720, revenue: 36000, instagram: 3600, twitter: 1200, facebook: 2300, tiktok: 2100, linkedin: 600 },
  { date: "Jun 15", clicks: 13400, conversions: 980, revenue: 49000, instagram: 4800, twitter: 1700, facebook: 3100, tiktok: 2900, linkedin: 900 },
  { date: "Jun 17", clicks: 12100, conversions: 890, revenue: 44500, instagram: 4400, twitter: 1500, facebook: 2900, tiktok: 2600, linkedin: 700 },
  { date: "Jun 19", clicks: 15800, conversions: 1150, revenue: 57500, instagram: 5800, twitter: 2000, facebook: 3700, tiktok: 3400, linkedin: 900 },
];

export const platformColors: Record<string, string> = {
  instagram: "#E1306C",
  twitter: "#1DA1F2",
  facebook: "#1877F2",
  tiktok: "#69C9D0",
  linkedin: "#0A66C2",
};
