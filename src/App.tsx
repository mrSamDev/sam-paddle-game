import { Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import BaseLayout from "./layouts/base";
import { PageCenterLoader } from "./components/atoms/loader";
import { ProtectedRoute } from "./components/atoms/protected-route";

const CanvasGame = lazy(() => import("./pages/game"));
const LeaderBoard = lazy(() => import("./pages/coming-soon"));
const Callback = lazy(() => import("./pages/callback"));
const NotFound = lazy(() => import("./pages/404"));

const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => <Suspense fallback={<PageCenterLoader />}>{children}</Suspense>;

export default function App() {
  return (
    <Routes>
      <Route
        index
        element={
          <SuspenseWrapper>
            <BaseLayout>
              <CanvasGame />
            </BaseLayout>
          </SuspenseWrapper>
        }
      />
      <Route
        path="leader-board"
        element={
          <SuspenseWrapper>
            <ProtectedRoute>
              <BaseLayout>
                <LeaderBoard />
              </BaseLayout>
            </ProtectedRoute>
          </SuspenseWrapper>
        }
      />
      <Route
        path="/:provider/callback"
        element={
          <SuspenseWrapper>
            <BaseLayout basicLayout>
              <Callback />
            </BaseLayout>
          </SuspenseWrapper>
        }
      />
      <Route
        path="*"
        element={
          <SuspenseWrapper>
            <BaseLayout>
              <NotFound />
            </BaseLayout>
          </SuspenseWrapper>
        }
      />
    </Routes>
  );
}
