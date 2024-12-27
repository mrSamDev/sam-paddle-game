import { Loader } from "../ui/loader";

export default function Callback() {
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <Loader />
      <h2 className="text-2xl text-main font-semibold tracking-tight">Completing authentication...</h2>
      <p className="text-sm text-white/50">Please wait while we verify your credentials</p>
    </div>
  );
}
