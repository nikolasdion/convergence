import { Spinner } from "@heroui/react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center align-middle items-center min-h-lvh">
      <Spinner size="lg" label="Fetching data..." />
    </div>
  );
};

export default LoadingSpinner;
