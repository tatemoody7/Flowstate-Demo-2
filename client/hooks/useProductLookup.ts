import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getApiUrl } from "@/lib/query-client";
import type { ScannedFood } from "@/data/mockData";

interface ProductResponse {
  status: "found" | "not_found" | "under_review" | "error";
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

const CLIENT_TIMEOUT_MS = 8000;
const MAX_UNDER_REVIEW_POLLS = 3;
const POLL_INTERVAL_MS = 2000;

async function fetchProductFromServer(barcode: string): Promise<ProductResponse> {
  const baseUrl = getApiUrl();
  const url = new URL(`/api/products/${barcode}`, baseUrl);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS);

  try {
    const res = await fetch(url, { signal: controller.signal });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    return await res.json();
  } finally {
    clearTimeout(timeout);
  }
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
  const pollCount = useRef(0);

  // Reset poll count when barcode changes
  useEffect(() => {
    pollCount.current = 0;
  }, [barcode]);

  const query = useQuery({
    queryKey: ["product", barcode],
    queryFn: () => fetchProductFromServer(barcode!),
    enabled: !!barcode,
    staleTime: 0,
    gcTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: (query) => {
      if (
        query.state.data?.status === "under_review" &&
        pollCount.current < MAX_UNDER_REVIEW_POLLS
      ) {
        pollCount.current++;
        return POLL_INTERVAL_MS;
      }
      return false;
    },
  });

  const isPolling =
    query.data?.status === "under_review" &&
    pollCount.current < MAX_UNDER_REVIEW_POLLS;

  const isUnderReviewDone =
    query.data?.status === "under_review" &&
    pollCount.current >= MAX_UNDER_REVIEW_POLLS;

  const scannedFood: ScannedFood | null =
    query.data?.status === "found" && query.data.product
      ? mapToScannedFood(barcode!, query.data.product)
      : null;

  const lookupBarcode = (code: string) => setBarcode(code);
  const reset = () => {
    pollCount.current = 0;
    setBarcode(null);
  };

  return {
    lookupBarcode,
    reset,
    scannedFood,
    isLoading: query.isFetching && !!barcode && !isPolling,
    isError: query.isError,
    isNotFound: query.data?.status === "not_found",
    isUnderReview: query.data?.status === "under_review",
    isPolling,
    isUnderReviewDone,
    rawProduct: query.data?.product ?? null,
  };
}
