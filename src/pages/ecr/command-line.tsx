import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Terminal, Check } from "lucide-react";
import { useState } from "react";

export function CommandDisplay() {
  const [copied, setCopied] = useState(false);

  const command =
    "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full  p-3 bg-red-100 ">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/10 rounded-lg">
            <Terminal className="h-5 w-5 text-black" />
          </div>
          <CardTitle className="text-sm font-semibold">
            AWS ECR Login Command
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-muted rounded-lg p-4 relative group">
          <code className="text-xs font-mono text-foreground break-all">
            {command}
          </code>
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4 text-primary" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Use this command to authenticate Docker with your AWS ECR registry
          before pushing or pulling images.
        </p>
      </CardContent>
    </div>
  );
}
