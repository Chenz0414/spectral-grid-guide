import { useSyncExternalStore } from "react";
import {
  subscribe,
  getTools,
  getCategories,
  getPopularTools,
  getRecentTools,
  getCategoriesWithTools,
  getPopularIds,
} from "@/data/mockData";

export function useTools() {
  return useSyncExternalStore(subscribe, getTools);
}

export function useCategories() {
  return useSyncExternalStore(subscribe, getCategories);
}

export function usePopularTools() {
  return useSyncExternalStore(subscribe, getPopularTools);
}

export function useRecentTools() {
  return useSyncExternalStore(subscribe, getRecentTools);
}

export function useCategoriesWithTools() {
  return useSyncExternalStore(subscribe, getCategoriesWithTools);
}

export function usePopularIds() {
  return useSyncExternalStore(subscribe, getPopularIds);
}
