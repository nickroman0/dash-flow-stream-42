import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import logoImage from "@/assets/logo.png";

// Add your plants here - you can modify this list
const plants = [
  { id: "plant-1", name: "Poland - Belsk" },
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
            <img src={logoImage} alt="I2B Logo" className="h-6 w-6" />
            <span className="font-bold text-xl">I2B Plant Monitor</span>
          </Link>
          
          <div className="flex space-x-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                  Plants List
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[200px]">
                <DropdownMenuItem asChild>
                  <Link to="/" className="w-full">Home</Link>
                </DropdownMenuItem>
                {plants.map((plant) => (
                  <DropdownMenuItem key={plant.id} asChild>
                    <Link to={`/plant/${plant.id}`} className="w-full">{plant.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}