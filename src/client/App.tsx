import type { NavigateOptions } from "react-router";

import { Route, Routes, useNavigate, useHref } from "react-router";
import { HeroUIProvider } from "@heroui/react";
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import Navbar from "./Navbar";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

function App() {
  const navigate = useNavigate();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event/:id" element={<EventPage />} />
      </Routes>
    </HeroUIProvider>
  );
}

export default App;
