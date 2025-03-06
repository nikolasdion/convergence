import type { NavigateOptions } from "react-router";

import { Route, Routes, useNavigate, useHref } from "react-router";
import { HeroUIProvider, Spinner } from "@heroui/react";
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import Navbar from "./Navbar";
import ErrorBoundary from "./ErrorBoundary";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

function App() {
  const navigate = useNavigate();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <ErrorBoundary>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/event/:id" element={<EventPage />} />
        </Routes>
      </ErrorBoundary>
    </HeroUIProvider>
  );
}

export default App;
