import { Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
const CanvasGame = lazy(() => import("./pages/game"));

export default function App() {
  return (
    <Routes>
      <Route
        index
        element={
          <Suspense fallback={<div>Loading</div>}>
            <CanvasGame />
          </Suspense>
        }
      />
    </Routes>
  );
}
