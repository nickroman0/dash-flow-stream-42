import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PlantNavigationProps {
  plantId: string;
}

const subPages = [
  { id: "dashboard", label: "Live Dashboard", path: "" },
  { id: "gallery", label: "Daily Gallery", path: "/gallery" },
  { id: "info", label: "Plant Information", path: "/info" },
];

export function PlantNavigation({ plantId }: PlantNavigationProps) {
  const location = useLocation();
  const basePath = `/plant/${plantId}`;

  return (
    <div className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1">
          {subPages.map((page) => {
            const fullPath = `${basePath}${page.path}`;
            const isActive = location.pathname === fullPath;
            
            return (
              <Button
                key={page.id}
                variant={isActive ? "default" : "ghost"}
                asChild
                className={cn(
                  "rounded-none border-b-2 border-transparent",
                  isActive && "border-primary"
                )}
              >
                <Link to={fullPath}>{page.label}</Link>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}