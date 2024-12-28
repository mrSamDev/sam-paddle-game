import { Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import BaseLayout from "./layouts/base";
import { PageCenterLoader } from "./components/atoms/loader";
import { ProtectedRoute } from "./components/atoms/protected-route";

const CanvasGame = lazy(() => import("./pages/game"));
const LeaderBoard = lazy(() => import("./pages/leaderboard"));
const Callback = lazy(() => import("./pages/callback"));
const NotFound = lazy(() => import("./pages/404"));

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => <Suspense fallback={<PageCenterLoader />}>{children}</Suspense>;

export default function App() {
  return (
    <BaseLayout>
      <Routes>
        <Route
          index
          element={
            <SuspenseWrapper>
              <CanvasGame />
            </SuspenseWrapper>
          }
        />
        <Route
          path="leader-board"
          element={
            <SuspenseWrapper>
              <ProtectedRoute>
                <LeaderBoard />
              </ProtectedRoute>
            </SuspenseWrapper>
          }
        />
        <Route
          path="/:provider/callback"
          element={
            <SuspenseWrapper>
              <Callback />
            </SuspenseWrapper>
          }
        />
        <Route
          path="*"
          element={
            <SuspenseWrapper>
              <NotFound />
            </SuspenseWrapper>
          }
        />
      </Routes>
    </BaseLayout>
  );
}
