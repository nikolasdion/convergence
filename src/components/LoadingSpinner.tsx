import { Spinner } from "@heroui/react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center align-middle items-center min-h-5xl">
      <Spinner size="lg" variant="gradient" label="Fetching data..." />
    </div>
  );
};

export default LoadingSpinner;
