"use client";

import { useSyncExternalStore, useEffect } from "react";
import { flagshipProduct } from "@/data/products";

interface LiveState {
  price: number;
  inStock: boolean;
  stock: number;
  isLoaded: boolean;
}

let state: LiveState = {
  price: flagshipProduct.price,
  inStock: flagshipProduct.inStock,
  stock: flagshipProduct.inStock ? 100 : 0,
  isLoaded: false,
};

const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

let isInitialized = false;

function initGlobalStore() {
  if (typeof window === "undefined" || isInitialized) return;
  isInitialized = true;

  // 1. Immediately read localStorage
  try {
    const storedInStock = localStorage.getItem("rugby_live_instock");
    const storedStock = localStorage.getItem("rugby_live_stock");
    const storedPrice = localStorage.getItem("rugby_live_price");

    let s = state.stock;
    if (storedStock !== null) {
      const parsed = parseInt(storedStock, 10);
      if (!isNaN(parsed)) s = parsed;
    }

    let inS = state.inStock;
    if (storedInStock !== null) {
      inS = storedInStock === "true" && s > 0;
    } else if (s <= 0) {
      inS = false;
    }

    let p = state.price;
    if (storedPrice !== null) {
      const parsed = Number(storedPrice);
      if (!isNaN(parsed) && parsed > 0) p = parsed;
    }

    state = { ...state, price: p, inStock: inS, stock: s };
    emitChange();
  } catch {}

  // 2. Fetch live data from /api/inventory
  const fetchLive = async () => {
    try {
      const res = await fetch("/api/inventory", {
        cache: "no-store",
        headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.success) {
        const p = typeof data.price === "number" ? data.price : state.price;
        const s = typeof data.stock === "number" ? data.stock : state.stock;
        const inS = typeof data.inStock === "boolean" ? (data.inStock && s > 0) : state.inStock;
        state = { price: p, inStock: inS, stock: s, isLoaded: true };
        emitChange();
      }
    } catch {}
  };

  fetchLive();

  // 3. Listen to storage events from other tabs
  const syncFromStorage = () => {
    try {
      const storedInStock = localStorage.getItem("rugby_live_instock");
      const storedStock = localStorage.getItem("rugby_live_stock");
      const storedPrice = localStorage.getItem("rugby_live_price");

      let s = state.stock;
      if (storedStock !== null) {
        const parsed = parseInt(storedStock, 10);
        if (!isNaN(parsed)) s = parsed;
      }

      let inS = state.inStock;
      if (storedInStock !== null) {
        inS = storedInStock === "true" && s > 0;
      } else if (s <= 0) {
        inS = false;
      }

      let p = state.price;
      if (storedPrice !== null) {
        const parsed = Number(storedPrice);
        if (!isNaN(parsed) && parsed > 0) p = parsed;
      }

      state = { ...state, price: p, inStock: inS, stock: s };
      emitChange();
    } catch {}
  };

  window.addEventListener("storage", syncFromStorage);
  window.addEventListener("rugby_inventory_updated", syncFromStorage);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return state;
}

function getServerSnapshot() {
  return {
    price: flagshipProduct.price,
    inStock: flagshipProduct.inStock,
    stock: flagshipProduct.inStock ? 100 : 0,
    isLoaded: false,
  };
}

export function useLivePrice() {
  useEffect(() => {
    initGlobalStore();
  }, []);

  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return snapshot;
}
