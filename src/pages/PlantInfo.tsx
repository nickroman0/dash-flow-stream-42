import { useParams } from "react-router-dom";
import { PlantNavigation } from "@/components/PlantNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Mock plant data
const plantNames: Record<string, string> = {
  "plant-1": "Plant Alpha",
  "plant-2": "Plant Beta", 
  "plant-3": "Plant Gamma"
};

const plantInfo: Record<string, any> = {
  "plant-1": {
    description: "Primary production facility located in Zone A. This facility handles the main manufacturing processes and operates 24/7.",
    specifications: {
      "Capacity": "10,000 units/day",
      "Operating Temperature": "20-25°C",
      "Power Consumption": "500 kW",
      "Staff": "25 operators",
      "Maintenance Schedule": "Weekly"
    },
    documents: [
      { name: "Plant Layout", type: "PDF", path: `/documents/plant-1/layout.pdf` },
      { name: "Operating Manual", type: "PDF", path: `/documents/plant-1/manual.pdf` },
      { name: "Performance Data", type: "Excel", path: `/documents/plant-1/performance.xlsx` },
      { name: "Maintenance Log", type: "Excel", path: `/documents/plant-1/maintenance.xlsx` }
    ]
  },
  "plant-2": {
    description: "Secondary production facility in Zone B. Focuses on specialized manufacturing and quality control processes.",
    specifications: {
      "Capacity": "7,500 units/day",
      "Operating Temperature": "18-22°C", 
      "Power Consumption": "350 kW",
      "Staff": "18 operators",
      "Maintenance Schedule": "Bi-weekly"
    },
    documents: [
      { name: "Plant Layout", type: "PDF", path: `/documents/plant-2/layout.pdf` },
      { name: "Quality Manual", type: "PDF", path: `/documents/plant-2/quality.pdf` },
      { name: "Production Data", type: "Excel", path: `/documents/plant-2/production.xlsx` }
    ]
  },
  "plant-3": {
    description: "Research and development facility in Zone C. Used for testing new processes and product development.",
    specifications: {
      "Capacity": "500 units/day",
      "Operating Temperature": "15-30°C",
      "Power Consumption": "150 kW", 
      "Staff": "12 researchers",
      "Maintenance Schedule": "Monthly"
    },
    documents: [
      { name: "Lab Layout", type: "PDF", path: `/documents/plant-3/lab-layout.pdf` },
      { name: "Research Protocols", type: "PDF", path: `/documents/plant-3/protocols.pdf` },
      { name: "Test Results", type: "Excel", path: `/documents/plant-3/results.xlsx` }
    ]
  }
};

export default function PlantInfo() {
  const { plantId } = useParams<{ plantId: string }>();
  
  if (!plantId || !plantNames[plantId]) {
    return <div>Plant not found</div>;
  }

  const plantName = plantNames[plantId];
  const info = plantInfo[plantId];

  const handleDocumentDownload = (path: string, name: string) => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = path;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      <PlantNavigation plantId={plantId} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{plantName} - Information</h1>
          <p className="text-muted-foreground">
            Technical specifications, layouts, and documentation
          </p>
        </div>

        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Setup Instructions:</strong> Place your documents in 
            <code className="mx-1 px-1 py-0.5 bg-muted rounded">/public/documents/{plantId}/</code> 
            folder with PDF layouts and Excel files as shown below.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Plant Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{info.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technical Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                {Object.entries(info.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <dt className="font-medium">{key}:</dt>
                    <dd className="text-muted-foreground">{String(value)}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Documents & Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {info.documents.map((doc: any, index: number) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-medium">{doc.name}</h3>
                      <p className="text-sm text-muted-foreground">{doc.type} file</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDocumentDownload(doc.path, doc.name)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}