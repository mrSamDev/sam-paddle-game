import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useAuthStore } from "../../store/authentication";
import CallbackCard from "../../components/molecules/auth-callback/Callback";
import { useGithubAuth } from "../../hooks/use-github-auth";

const TwitchAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { setToken, setUser, setError } = useAuthStore();

  const { mutate: exchangeCode, status } = useGithubAuth();

  useEffect(() => {
    const code = searchParams.get("code");
    const oauthError = searchParams.get("error");

    if (oauthError) {
      setError(oauthError);
      navigate("/");
      return;
    }

    if (code) {
      exchangeCode(code, {
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
    } else {
      navigate("/");
    }
  }, []);

  if (status === "pending") {
    return <CallbackCard />;
  }

  // needs to handle error
  return null;
};

export default TwitchAuthCallback;
