import { useParams } from "react-router-dom";
import { useState } from "react";
import { AutoRefreshImage } from "@/components/AutoRefreshImage";
import { PlantNavigation } from "@/components/PlantNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock plant data - replace with your actual plant names
const plantNames: Record<string, string> = {
  "plant-1": "Poland - Belsk",
  "plant-2": "Italy - Sant'Angelo", 
  "plant-3": "France - Villers Ecalles"
};

export default function PlantDashboard() {
  const { plantId } = useParams<{ plantId: string }>();
  const [selectedDashboard, setSelectedDashboard] = useState("PL1");
  
  if (!plantId || !plantNames[plantId]) {
    return <div>Plant not found</div>;
  }

  const plantName = plantNames[plantId];
  
  // Dynamic dashboard path based on selection
  const dashboardImagePath = `/dashboards/${plantId}/current-dashboard-${selectedDashboard}.png`;

  return (
    <div className="min-h-screen bg-background">
      <PlantNavigation plantId={plantId} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{plantName} - Live Dashboard</h1>
              <p className="text-muted-foreground">
                Real-time monitoring dashboard (updates every 30 seconds)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Dashboard:</span>
              <Select value={selectedDashboard} onValueChange={setSelectedDashboard}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PL1">PL1</SelectItem>
                  <SelectItem value="PL2">PL2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current Status Dashboard - {selectedDashboard}</CardTitle>
          </CardHeader>
          <CardContent>
            <AutoRefreshImage
              src={dashboardImagePath}
              alt={`${plantName} Dashboard ${selectedDashboard}`}
              refreshInterval={30000} // 30 seconds
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
