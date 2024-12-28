import { PropsWithChildren, ReactElement } from "react";
import { useAuthStore } from "../../../store/authentication";
import { Card, CardContent } from "../../atoms/card/card";
import { Github } from "lucide-react";

interface AuthGuardProps extends PropsWithChildren {
  fallback?: ReactElement;
}

const AuthGuard = ({ children, fallback }: AuthGuardProps) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    if (fallback) {
      return fallback;
    }

    return (
      <div className="flex items-center justify-center p-4 mt-6">
        <Card className="w-full max-w-md">
          <CardContent className="space-y-6 p-8">
            <div className="text-center  space-y-4">
              <h2 className="text-2xl text-main font-semibold">Authentication Required</h2>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={useAuthStore.getState().initiateGitHubAuth}
                className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
              >
                <Github className="mr-2 h-5 w-5" />
                Sign in with GitHub
              </button>
              <p className="mt-4 text-sm text-white/50">Your data will be handled according to our privacy policy.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return children;
};

export default AuthGuard;
