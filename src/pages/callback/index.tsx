import { FC, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../store/authentication";
import { validateGithubToken } from "../../api/authentication";
import CallbackCard from "../../components/molecules/auth-callback/Callback";
import { AuthResponse } from "../../types/authentication";

const TwitchAuthCallback: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setToken, setUser, setError } = useAuthStore();

  const { mutate: exchangeCode, status } = useMutation<AuthResponse, Error, string>({
    mutationFn: validateGithubToken,
    onSuccess: (data) => {
      setToken(data.token);
      setUser(data.user);
      navigate("/");
    },
    onError: (error: Error) => {
      setError(error.message);
      navigate("/");
    },
  });

  useEffect(() => {
    const code = searchParams.get("code");
    const oauthError = searchParams.get("error");

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
  }, []);

  if (status === "pending") {
    return <CallbackCard />;
  }

  return null;
};

export default TwitchAuthCallback;
