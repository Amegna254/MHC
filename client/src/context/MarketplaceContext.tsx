import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { categories, creatorData } from "../data/marketplace";
import { getPublicMedia } from "../services/mediaService";

export interface MarketplaceItem {
  id: number | string;
  mediaId?: number | string;
  title: string;
  creator: string;
  fileType: string;
  mimeType: string;
  creatorSlug: string;
  price: string;
  rating: number;
  category: string;
  categorySlug: string;
  image: string;
  likes: number;
  views?: number;
  comments?: number;
}

export interface CreatorProfileData {
  name: string;
  role: string;
  followers: string;
  uploads: number;
  bio: string[];
  location: string;
}

interface MarketplaceContextType {
  categories: typeof categories;
  marketplaceItems: MarketplaceItem[];
  creatorData: Record<string, CreatorProfileData>;
  loading: boolean;
  addListing: (listing: Omit<MarketplaceItem, "likes" | "rating">) => void;
  updateListingStats?: (
    id: number | string,
    updates: Partial<Pick<MarketplaceItem, "views" | "likes" | "comments">>
  ) => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMarketplace = async () => {
      try {
        const items = await getPublicMedia();
        setMarketplaceItems(items);
      } catch (error) {
        console.error("Failed to load marketplace items", error);
      } finally {
        setLoading(false);
      }
    };

    loadMarketplace();
  }, []);

  const addListing = (listing: Omit<MarketplaceItem, "likes" | "rating">) => {
    const newListing: MarketplaceItem = {
      id: listing.id ?? Date.now(),
      likes: 0,
      rating: 5,
      views: listing.views ?? 0,
      comments: listing.comments ?? 0,
      ...listing,
    };

    setMarketplaceItems((currentItems) => [newListing, ...currentItems]);
  };

  const updateListingStats = (
    id: number | string,
    updates: Partial<Pick<MarketplaceItem, "views" | "likes">>
  ) => {
    setMarketplaceItems((items) =>
      items.map((it) => (String(it.id) === String(id) ? { ...it, ...updates } : it))
    );
  };

  return (
    <MarketplaceContext.Provider
      value={{ categories, marketplaceItems, creatorData, loading, addListing, updateListingStats }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);

  if (!context) {
    throw new Error("useMarketplace must be used inside MarketplaceProvider");
  }

  return context;
}
