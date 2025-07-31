import { useParams } from "react-router-dom";
import { PlantNavigation } from "@/components/PlantNavigation";
import { ImageGallery } from "@/components/ImageGallery";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Mock plant data
const plantNames: Record<string, string> = {
  "plant-1": "Plant Alpha",
  "plant-2": "Plant Beta", 
  "plant-3": "Plant Gamma"
};

// Mock gallery images - replace with your actual image paths
const generateMockImages = (plantId: string) => {
  const images = [];
  const today = new Date();
  
  for (let i = 1; i <= 15; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    images.push({
      src: `/dashboards/${plantId}/daily/dashboard-${date.toISOString().split('T')[0]}.png`,
      date: date.toLocaleDateString(),
      title: `Daily Dashboard - ${date.toLocaleDateString()}`
    });
  }
  
  return images;
};

export default function PlantGallery() {
  const { plantId } = useParams<{ plantId: string }>();
  
  if (!plantId || !plantNames[plantId]) {
    return <div>Plant not found</div>;
  }

  const plantName = plantNames[plantId];
  const galleryImages = generateMockImages(plantId);

  return (
    <div className="min-h-screen bg-background">
      <PlantNavigation plantId={plantId} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{plantName} - Daily Gallery</h1>
          <p className="text-muted-foreground">
            Browse historical dashboard images from previous days
          </p>
        </div>

        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Setup Instructions:</strong> Place your daily dashboard PNG files in 
            <code className="mx-1 px-1 py-0.5 bg-muted rounded">/public/dashboards/{plantId}/daily/</code> 
            with filenames like <code className="mx-1 px-1 py-0.5 bg-muted rounded">dashboard-YYYY-MM-DD.png</code>
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Historical Dashboards</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageGallery images={galleryImages} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}