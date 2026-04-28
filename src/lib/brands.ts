import brandsData from "@/data/brands.json";
import type { EquipmentCategory } from "@/lib/taxonomy";

export type BrandTier = "flagship" | "tier2" | "tier3" | "tier4";

export type BrandRecord = {
  id: string;
  name: string;
  nameZh: string;
  tier: BrandTier;
  regions: string[];
  officialUrl: string;
  founded: number;
  country: string;
  knownFor: string;
  knownForZh: string;
  categoriesCovered: EquipmentCategory[];
};

export const brands: BrandRecord[] = brandsData as BrandRecord[];

export function getBrand(id: string): BrandRecord | undefined {
  return brands.find((b) => b.id === id);
}

export function brandsByTier(tier: BrandTier): BrandRecord[] {
  return brands.filter((b) => b.tier === tier);
}

export const BRAND_TIER_LABELS: Record<BrandTier, { en: string; zh: string }> = {
  flagship: {
    en: "Flagship — global market leaders",
    zh: "旗舰品牌 · 全球领导厂商",
  },
  tier2: {
    en: "Major secondary — strong regional or specialist presence",
    zh: "主要二线 · 区域或专项强势品牌",
  },
  tier3: {
    en: "Established niche — solid regional or value brands",
    zh: "成熟小众 · 区域或性价比品牌",
  },
  tier4: {
    en: "Specialist — niche or single-category makers",
    zh: "专项品牌 · 小众或单品类厂商",
  },
};
