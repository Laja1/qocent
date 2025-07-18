import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-9xl font-light text-gray-900 mb-8 tracking-tight">
          404
        </h1>
        <h2 className="text-2xl font-normal text-gray-700 mb-4">
          Page not found
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button variant="outline" className="inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Button>
        </Link>
      </div>
    </div>
  );
}
