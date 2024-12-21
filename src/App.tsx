import { Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import BaseLayout from "./layouts/base";
const CanvasGame = lazy(() => import("./pages/game"));
const LeaderBoard = lazy(() => import("./pages/leaderboard"));

export default function App() {
  return (
    <BaseLayout>
      <Routes>
        <Route
          index
          element={
            <Suspense fallback={<div>Loading</div>}>
              <CanvasGame />
            </Suspense>
          }
        />
        <Route
          path="leader-board"
          element={
            <Suspense fallback={<div>Loading</div>}>
              <LeaderBoard />
            </Suspense>
          }
        />
      </Routes>
    </BaseLayout>
  );
}
