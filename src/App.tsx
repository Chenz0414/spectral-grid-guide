import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import { useEffect } from "react";
import { getTools, saveTools } from "@/data/mockData";
import { getDefaultCover } from "@/components/ToolCard";

function useBackfillCovers() {
  useEffect(() => {
    const tools = getTools();
    let changed = false;
    const updated = tools.map((t) => {
      if (!t.coverLandscape || !t.coverSquare) {
        changed = true;
        const cover = getDefaultCover(t.id);
        return {
          ...t,
          coverLandscape: t.coverLandscape || cover,
          coverSquare: t.coverSquare || cover,
        };
      }
      return t;
    });
    if (changed) saveTools(updated);
  }, []);
}

const queryClient = new QueryClient();

const AppInner = () => {
  useBackfillCovers();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppInner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
