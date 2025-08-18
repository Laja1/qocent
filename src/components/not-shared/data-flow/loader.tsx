import { PuffLoader } from "react-spinners";

export const DataFlowLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]  rounded-lg p-8">
      {/* Main loader container */}
      <PuffLoader
        color="red"
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
