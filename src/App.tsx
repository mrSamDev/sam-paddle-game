import { Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import BaseLayout from "./layouts/base";
import { PageCenterLoader } from "./components/atoms/loader";
import { ProtectedRoute } from "./components/atoms/protected-route";

const pages = {
  CanvasGame: lazy(() => import("./pages/game")),
  LeaderBoard: lazy(() => import("./pages/coming-soon")),
  Callback: lazy(() => import("./pages/callback")),
  NotFound: lazy(() => import("./pages/404")),
};

function App() {
  const withSuspense = (Component: React.ComponentType, isProtected = false, basicLayout = false) => (
    <Suspense
      fallback={
        <BaseLayout basicLayout>
          <PageCenterLoader />
        </BaseLayout>
      }
    >
      <BaseLayout basicLayout={basicLayout}>
        {isProtected ? (
          <ProtectedRoute>
            <Component />
          </ProtectedRoute>
        ) : (
          <Component />
        )}
      </BaseLayout>
    </Suspense>
  );

  return (
    <Routes>
      <Route index element={withSuspense(pages.CanvasGame)} />
      <Route path="leader-board" element={withSuspense(pages.LeaderBoard, true)} />
      <Route path="/:provider/callback" element={withSuspense(pages.Callback, false, true)} />
      <Route path="*" element={withSuspense(pages.NotFound)} />
    </Routes>
  );
}

export default App;
