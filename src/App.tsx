import type { NavigateOptions } from "react-router";

import { Route, Routes, useNavigate, useHref } from "react-router";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./ErrorBoundary";
import NewEventPage from "./pages/NewEventPage";
import { getHeroUiLocale } from "./lib/locale";
import ViewEventPage from "./pages/ViewEventPage";
import EditEventPage from "./pages/EditEventPage";
import NewAttendeePage from "./pages/NewAttendeePage";
import EditAttendeePage from "./pages/EditAttendeePage";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

function App() {
  const navigate = useNavigate();

  return (
    <HeroUIProvider
      navigate={navigate}
      useHref={useHref}
      locale={getHeroUiLocale()}
    >
      <ToastProvider placement="top-center" />
      <ErrorBoundary>
        <Navbar />
        <div className="max-w-5xl m-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/event/new" element={<NewEventPage />} />
            <Route path="/event/:id/view/" element={<ViewEventPage />} />
            <Route path="/event/:id/edit/" element={<EditEventPage />} />
            <Route path="/event/:id/attend/" element={<NewAttendeePage />} />
            <Route
              path="/event/:id/attend/:attendeeId/edit/"
              element={<EditAttendeePage />}
            />
          </Routes>
        </div>
      </ErrorBoundary>
    </HeroUIProvider>
  );
}

export default App;
