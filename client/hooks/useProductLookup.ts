import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getApiUrl } from "@/lib/query-client";
import type { ScannedFood } from "@/data/mockData";

interface ProductResponse {
  status: "found" | "not_found" | "error";
  product?: {
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
  };
  source?: "cache" | "api";
  message?: string;
}

async function fetchProductFromServer(barcode: string): Promise<ProductResponse> {
  const baseUrl = getApiUrl();
  const url = new URL(`/api/products/${barcode}`, baseUrl);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return await res.json();
}

function mapToScannedFood(barcode: string, product: ProductResponse["product"]): ScannedFood | null {
  if (!product) return null;

  return {
    id: `off-${barcode}`,
    name: product.name,
    brand: product.brand,
    image: product.image,
    healthScore: product.healthScore,
    calories: product.calories,
    protein: product.protein,
    carbs: product.carbs,
    fat: product.fat,
    fiber: product.fiber,
    sugar: product.sugar,
    sodium: product.sodium,
    prices: [],
    ingredients: product.ingredients as ScannedFood["ingredients"],
    ingredientsRaw: product.ingredientsRaw ?? undefined,
    allergens: product.allergens ?? undefined,
    additives: product.additives ?? undefined,
    nutritionGrade: product.nutritionGrade ?? undefined,
    barcode: product.barcode,
    servingSize: product.servingSize ?? undefined,
  };
}

export function useProductLookup() {
  const [barcode, setBarcode] = useState<string | null>(null);

  const query = useQuery({
    queryKey: ["product", barcode],
    queryFn: () => fetchProductFromServer(barcode!),
    enabled: !!barcode,
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const scannedFood: ScannedFood | null =
    query.data?.status === "found" && query.data.product
      ? mapToScannedFood(barcode!, query.data.product)
      : null;

  const lookupBarcode = (code: string) => setBarcode(code);
  const reset = () => {
    setBarcode(null);
  };

  return {
    lookupBarcode,
    reset,
    scannedFood,
    isLoading: query.isFetching && !!barcode,
    isError: query.isError,
    isNotFound: query.data?.status === "not_found",
    rawProduct: query.data?.product ?? null,
  };
}
