import { Spinner } from "@heroui/react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center m-28">
      <Spinner size="lg" variant="gradient" label="Fetching data..." />
    </div>
  );
};

export default LoadingSpinner;
