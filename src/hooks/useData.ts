import { useSyncExternalStore, useMemo } from "react";
import {
  subscribe,
  getTools,
  getCategories,
  getPopularIds,
  getRecentIds,
  Tool,
  CategoryWithTools,
  isToolEnabled,
} from "@/data/mockData";

export function useTools() {
  return useSyncExternalStore(subscribe, getTools);
}

export function useCategories() {
  return useSyncExternalStore(subscribe, getCategories);
}

export function usePopularIds() {
  return useSyncExternalStore(subscribe, getPopularIds);
}

export function useRecentIds() {
  return useSyncExternalStore(subscribe, getRecentIds);
}

export function usePopularTools(): Tool[] {
  const tools = useTools();
  const popularIds = usePopularIds();

  return useMemo(
    () =>
      popularIds
        .map((id) => tools.find((t) => t.id === id))
        .filter((tool): tool is Tool => Boolean(tool && isToolEnabled(tool))),
    [tools, popularIds]
  );
}

export function useRecentTools(): Tool[] {
  const tools = useTools();
  const recentIds = useRecentIds();

  return useMemo(
    () =>
      recentIds
        .map((id) => tools.find((t) => t.id === id))
        .filter((tool): tool is Tool => Boolean(tool && isToolEnabled(tool))),
    [tools, recentIds]
  );
}

export function useCategoriesWithTools(): CategoryWithTools[] {
  const tools = useTools();
  const categories = useCategories();

  return useMemo(
    () =>
      categories
        .map((cat) => ({
          ...cat,
          tools: tools.filter((t) => t.categoryIds.includes(cat.id) && isToolEnabled(t)),
        }))
        .filter((cat) => cat.tools.length > 0),
    [tools, categories]
  );
}
