import { ClipLoader } from "react-spinners";

type InlineLoaderProps = {
  label?: string;
};

export const InlineLoader = ({ label = "Loading" }: InlineLoaderProps) => (
  <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
    <ClipLoader size={14} color="currentColor" />
    {label}
  </span>
);
