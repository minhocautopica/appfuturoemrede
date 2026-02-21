import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import HomeScreen from "./pages/HomeScreen";
import ArchiveScreen from "./pages/ArchiveScreen";
import ContributionDetail from "./pages/ContributionDetail";
import ContributeScreen from "./pages/ContributeScreen";
import WorkshopListScreen from "./pages/WorkshopListScreen";
import WorkshopFormScreen from "./pages/WorkshopFormScreen";
import MessagesScreen from "./pages/MessagesScreen";
import LibraryScreen from "./pages/LibraryScreen";
import CalendarScreen from "./pages/CalendarScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/archive" element={<ArchiveScreen />} />
            <Route path="/archive/:id" element={<ContributionDetail />} />
            <Route path="/contribute" element={<ContributeScreen />} />
            <Route path="/workshops" element={<WorkshopListScreen />} />
            <Route path="/workshops/:slug" element={<WorkshopFormScreen />} />
            <Route path="/messages" element={<MessagesScreen />} />
            <Route path="/library" element={<LibraryScreen />} />
            <Route path="/calendar" element={<CalendarScreen />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
