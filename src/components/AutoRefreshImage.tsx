import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AutoRefreshImageProps {
  src: string;
  alt: string;
  refreshInterval?: number; // in milliseconds, default 30 seconds
}

export function AutoRefreshImage({ 
  src, 
  alt, 
  refreshInterval = 30000 
}: AutoRefreshImageProps) {
  const [imageKey, setImageKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const refreshImage = () => {
    setIsLoading(true);
    setImageKey(prev => prev + 1);
    setLastRefresh(new Date());
  };

  useEffect(() => {
    const interval = setInterval(refreshImage, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Last updated: {lastRefresh.toLocaleTimeString()}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={refreshImage}
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      
      <div className="relative border rounded-lg overflow-hidden bg-muted">
        <img
          key={imageKey}
          src={`${src}?t=${imageKey}`}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className="w-full h-auto"
        />
        {isLoading && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
      </div>
    </div>
  );
}