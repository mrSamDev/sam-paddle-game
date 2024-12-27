import "./index.css";

export function Loader() {
  return (
    <div className="loading-wave">
      <div className="loading-bar"></div>
      <div className="loading-bar"></div>
      <div className="loading-bar"></div>
      <div className="loading-bar"></div>
    </div>
  );
}

export function PageCenterLoader() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex space-x-2">
        <Loader />
      </div>
    </div>
  );
}
