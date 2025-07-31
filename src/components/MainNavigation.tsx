import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

// Add your plants here - you can modify this list
const plants = [
  { id: "plant-1", name: "Plant Alpha" },
  { id: "plant-2", name: "Plant Beta" },
  { id: "plant-3", name: "Plant Gamma" },
];

export function MainNavigation() {
  const location = useLocation();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Plant Monitor</span>
          </Link>
          
          <div className="flex space-x-1">
            <Button
              variant={location.pathname === "/" ? "default" : "ghost"}
              asChild
            >
              <Link to="/">Home</Link>
            </Button>
            
            {plants.map((plant) => {
              const isActive = location.pathname.startsWith(`/plant/${plant.id}`);
              return (
                <Button
                  key={plant.id}
                  variant={isActive ? "default" : "ghost"}
                  asChild
                >
                  <Link to={`/plant/${plant.id}`}>{plant.name}</Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}