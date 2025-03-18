import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { getLocalTimeZone } from "@internationalized/date";
import { useState } from "react";
import type { NavigateOptions } from "react-router";
import { Route, Routes, useHref, useNavigate } from "react-router";

import Navbar from "./components/Navbar";
import ErrorBoundary from "./ErrorBoundary";
import { getHeroUiLocale } from "./lib/locale";
import EditAttendeePage from "./pages/EditAttendeePage";
import EditEventPage from "./pages/EditEventPage";
import HomePage from "./pages/HomePage";
import NewAttendeePage from "./pages/NewAttendeePage";
import NewEventPage from "./pages/NewEventPage";
import NotFoundPage from "./pages/NotFoundPage";
import TestPage from "./pages/TestPage";
import ViewEventPage from "./pages/ViewEventPage";
import { TimezoneContext } from "./TimezoneContext";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

function App() {
  const navigate = useNavigate();
  const [timezone, setTimezone] = useState(getLocalTimeZone());

  return (
    <HeroUIProvider
      navigate={navigate}
      useHref={useHref}
      locale={getHeroUiLocale()}
    >
      <TimezoneContext value={timezone}>
        <ToastProvider placement="top-center" />
        <ErrorBoundary>
          <Navbar onTimezoneChange={setTimezone} />
          <div className="max-w-4xl m-auto">
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
              <Route path="/test/" element={<TestPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </ErrorBoundary>
      </TimezoneContext>
    </HeroUIProvider>
  );
}

export default App;
