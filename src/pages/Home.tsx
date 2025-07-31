import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, BarChart3, ImageIcon, FileText } from "lucide-react";

const plants = [
  { 
    id: "plant-1", 
    name: "Plant Alpha", 
    description: "Primary production facility - Zone A",
    status: "online" 
  },
  { 
    id: "plant-2", 
    name: "Plant Beta", 
    description: "Secondary production facility - Zone B",
    status: "online" 
  },
  { 
    id: "plant-3", 
    name: "Plant Gamma", 
    description: "Research and development facility - Zone C",
    status: "maintenance" 
  },
];

const features = [
  {
    icon: BarChart3,
    title: "Live Dashboard",
    description: "Real-time monitoring with auto-refresh every 30 seconds"
  },
  {
    icon: ImageIcon,
    title: "Daily Gallery",
    description: "Browse historical dashboards with zoom functionality"
  },
  {
    icon: FileText,
    title: "Plant Information",
    description: "Access layouts, documents, and technical specifications"
  }
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Leaf className="h-10 w-10 text-primary" />
          Plant Monitoring System
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Monitor and track the behavior of your industrial plants with real-time dashboards, 
          historical data, and comprehensive documentation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader className="text-center">
              <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Select a Plant to Monitor</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plants.map((plant) => (
            <Card key={plant.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-primary" />
                    {plant.name}
                  </CardTitle>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    plant.status === 'online' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {plant.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{plant.description}</p>
                <Button asChild className="w-full">
                  <Link to={`/plant/${plant.id}`}>
                    Monitor Plant
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}