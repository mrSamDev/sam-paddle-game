import { Fragment } from "react";
import { Button } from "../../components/atoms/button/button";
import { useNavigate } from "react-router";

export default function ComingSoon() {
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="w-full max-w-2xl mx-auto mt-20 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Coming Soon</h1>
        <p className="text-lg text-white/80 mb-8">We're working hard to bring you something amazing. Stay tuned!</p>
        <div className="space-y-4">
          <Button onClick={() => navigate("/")}>Go Back</Button>
        </div>
      </div>
    </Fragment>
  );
}
