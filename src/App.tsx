import { Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import BaseLayout from "./layouts/base";
import AuthGuard from "./components/auth/SignWith";
import { PageCenterLoader } from "./components/ui/loader";

const CanvasGame = lazy(() => import("./pages/game"));
const LeaderBoard = lazy(() => import("./pages/leaderboard"));
const Callback = lazy(() => import("./pages/callback"));

export default function App() {
  return (
    <BaseLayout>
      <Routes>
        <Route
          index
          element={
            <Suspense fallback={<PageCenterLoader />}>
              <CanvasGame />
            </Suspense>
          }
        />
        <Route
          path="leader-board"
          element={
            <Suspense fallback={<PageCenterLoader />}>
              <AuthGuard>
                <LeaderBoard />
              </AuthGuard>
            </Suspense>
          }
        />
        <Route
          path="/:provider/callback"
          element={
            <Suspense fallback={<PageCenterLoader />}>
              <Callback />
            </Suspense>
          }
        />
      </Routes>
    </BaseLayout>
  );
}
