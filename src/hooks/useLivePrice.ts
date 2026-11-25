"use client";

import { useState, useEffect } from "react";
import { flagshipProduct } from "@/data/products";

export function useLivePrice() {
  const [price, setPrice] = useState<number>(flagshipProduct.price);
  const [inStock, setInStock] = useState<boolean>(flagshipProduct.inStock);
  const [stock, setStock] = useState<number>(100);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const fetchLivePrice = async () => {
      try {
        const res = await fetch("/api/inventory", {
          cache: "no-store",
          headers: { Pragma: "no-cache" },
        });
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && data.success && typeof data.price === "number") {
          setPrice(data.price);
          if (typeof data.inStock === "boolean") setInStock(data.inStock);
          if (typeof data.stock === "number") setStock(data.stock);
          setIsLoaded(true);
        }
      } catch (err) {
        // Silently keep default
      }
    };

    fetchLivePrice();

    // Listen to local price updates if saved in the same browser session
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "rugby_live_price") {
        try {
          const val = Number(e.newValue);
          if (!isNaN(val) && val > 0) setPrice(val);
        } catch {}
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      isMounted = false;
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return { price, inStock, stock, isLoaded };
}
