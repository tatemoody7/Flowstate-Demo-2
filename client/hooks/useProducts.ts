import { useQuery } from "@tanstack/react-query";
import { getApiUrl } from "@/lib/query-client";
import type { ScannedFood } from "@/data/mockData";
import { getHealthTier } from "@/utils/healthTier";

interface ProductsResponse {
  products: {
    barcode: string;
    name: string;
    brand: string;
    image: string;
    healthScore: number;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
    ingredients: { name: string; flag: string; reason?: string }[] | null;
    ingredientsRaw: string | null;
    allergens: string | null;
    additives: string[] | null;
    nutritionGrade: string | null;
    servingSize: string | null;
    stores: string[] | null;
  }[];
}

function mapProductsToScannedFood(
  products: ProductsResponse["products"],
): ScannedFood[] {
  return products.map((p) => ({
    id: `db-${p.barcode}`,
    name: p.name,
    brand: p.brand,
    image: p.image,
    healthScore: p.healthScore,
    calories: p.calories,
    protein: p.protein,
    carbs: p.carbs,
    fat: p.fat,
    fiber: p.fiber,
    sugar: p.sugar,
    sodium: p.sodium,
    prices: [],
    ingredients: p.ingredients as ScannedFood["ingredients"],
    ingredientsRaw: p.ingredientsRaw ?? undefined,
    allergens: p.allergens ?? undefined,
    additives: p.additives ?? undefined,
    nutritionGrade: p.nutritionGrade ?? undefined,
    barcode: p.barcode,
    servingSize: p.servingSize ?? undefined,
    stores: p.stores ?? undefined,
  }));
}

async function fetchProducts(
  search?: string,
  tier?: string,
  store?: string,
): Promise<ProductsResponse> {
  const baseUrl = getApiUrl();
  const url = new URL("/api/products", baseUrl);

  if (search?.trim()) url.searchParams.set("search", search.trim());
  if (tier && tier !== "all") url.searchParams.set("tier", tier);
  if (store && store !== "all") url.searchParams.set("store", store);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return await res.json();
}

export function useProducts(search?: string, tier?: string, store?: string) {
  const query = useQuery({
    queryKey: ["products", search ?? "", tier ?? "all", store ?? "all"],
    queryFn: () => fetchProducts(search, tier, store),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 15, // 15 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const mapped: ScannedFood[] = query.data?.products
    ? mapProductsToScannedFood(query.data.products)
    : [];

  // Client-side post-filter ensures card colors always match the selected tier tab
  const products: ScannedFood[] =
    tier && tier !== "all"
      ? mapped.filter((p) => getHealthTier(p.ingredients).tier === tier)
      : mapped;

  return {
    products,
    isLoading: query.isFetching,
    isError: query.isError,
    refetch: query.refetch,
  };
}
