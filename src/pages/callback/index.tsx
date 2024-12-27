import { FC, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../store/authentication";
import { validateGithubToken } from "../../api/authentication";
import CallbackCard from "../../components/auth/Callback";
import { AuthResponse } from "../../types/authentication";

const AuthCallback: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setToken, setUser, setError } = useAuthStore();

  const code = searchParams.get("code");
  console.log("code: ", code);

  const oauthError = searchParams.get("error");

  const { mutate: exchangeCode, status } = useMutation<AuthResponse, Error, string>({
    mutationFn: validateGithubToken,
    onSuccess: (data) => {
      setToken(data.token);
      setUser(data.user);
      navigate("/leader-board");
    },
    onError: (error: Error) => {
      setError(error.message);
      navigate("/");
    },
  });

  const handleAuth = useCallback(() => {
    if (oauthError) {
      setError(oauthError);
      navigate("/");
      return;
    }

    if (code) {
      exchangeCode(code);
    } else {
      navigate("/");
    }
  }, [code, oauthError, navigate, setError, exchangeCode]);

  useEffect(() => {
    handleAuth();
  }, [handleAuth]);

  if (true || status === "pending") {
    return <CallbackCard />;
  }

  return null;
};

export default AuthCallback;
