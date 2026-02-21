import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchProduct,
  transformToScannedFood,
} from "@/services/openFoodFactsApi";
import type { ScannedFood } from "@/data/mockData";

export function useProductLookup() {
  const [barcode, setBarcode] = useState<string | null>(null);

  const query = useQuery({
    queryKey: ["product", barcode],
    queryFn: () => fetchProduct(barcode!),
    enabled: !!barcode,
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 1 hour — keep cache longer than staleTime
    retry: 1,
    refetchOnWindowFocus: false, // don't refetch when app comes to foreground
    refetchOnReconnect: false, // don't refetch on network reconnect
  });

  const scannedFood: ScannedFood | null =
    query.data?.status === 1 && query.data.product
      ? transformToScannedFood(barcode!, query.data.product)
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
    isNotFound: query.data?.status === 0,
    rawProduct: query.data?.product ?? null,
  };
}
