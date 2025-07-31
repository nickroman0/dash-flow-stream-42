import { useParams } from "react-router-dom";
import { AutoRefreshImage } from "@/components/AutoRefreshImage";
import { PlantNavigation } from "@/components/PlantNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Mock plant data - replace with your actual plant names
const plantNames: Record<string, string> = {
  "plant-1": "Plant Alpha",
  "plant-2": "Plant Beta", 
  "plant-3": "Plant Gamma"
};

export default function PlantDashboard() {
  const { plantId } = useParams<{ plantId: string }>();
  
  if (!plantId || !plantNames[plantId]) {
    return <div>Plant not found</div>;
  }

  const plantName = plantNames[plantId];
  
  // Replace this with the actual path to your dashboard images
  const dashboardImagePath = `/dashboards/${plantId}/current-dashboard.png`;

  return (
    <div className="min-h-screen bg-background">
      <PlantNavigation plantId={plantId} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{plantName} - Live Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time monitoring dashboard (updates every 30 seconds)
          </p>
        </div>

        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Setup Instructions:</strong> Place your dashboard PNG files in the 
            <code className="mx-1 px-1 py-0.5 bg-muted rounded">/public/dashboards/{plantId}/current-dashboard.png</code> 
            path. The image will auto-refresh every 30 seconds to show the latest data.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Current Status Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <AutoRefreshImage
              src={dashboardImagePath}
              alt={`${plantName} Dashboard`}
              refreshInterval={30000} // 30 seconds
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}