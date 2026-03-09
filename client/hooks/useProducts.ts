import { useInfiniteQuery } from "@tanstack/react-query";
import { getApiUrl } from "@/lib/query-client";
import type { ScannedFood } from "@/data/mockData";
import { getHealthTier } from "@/utils/healthTier";

interface ProductRaw {
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
}

interface ProductsPage {
  products: ProductRaw[];
  nextCursor: string | null;
  hasMore: boolean;
}

function mapProductsToScannedFood(
  products: ProductRaw[],
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
  cursor?: string,
): Promise<ProductsPage> {
  const baseUrl = getApiUrl();
  const url = new URL("/api/products", baseUrl);

  if (search?.trim()) url.searchParams.set("search", search.trim());
  if (tier && tier !== "all") url.searchParams.set("tier", tier);
  if (store && store !== "all") url.searchParams.set("store", store);
  url.searchParams.set("limit", "30");
  if (cursor) url.searchParams.set("cursor", cursor);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return await res.json();
}

export function useProducts(search?: string, tier?: string, store?: string) {
  const query = useInfiniteQuery({
    queryKey: ["products", search ?? "", tier ?? "all", store ?? "all"],
    queryFn: ({ pageParam }) =>
      fetchProducts(search, tier, store, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? (lastPage.nextCursor ?? undefined) : undefined,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 15, // 15 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Flatten all pages into a single products array
  const allRawProducts =
    query.data?.pages.flatMap((page) => page.products) ?? [];
  const mapped = mapProductsToScannedFood(allRawProducts);

  // Client-side post-filter ensures card colors always match the selected tier tab
  const products: ScannedFood[] =
    tier && tier !== "all"
      ? mapped.filter((p) => getHealthTier(p.ingredients).tier === tier)
      : mapped;

  return {
    products,
    isLoading: query.isFetching && !query.isFetchingNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isError: query.isError,
    refetch: query.refetch,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
  };
}
