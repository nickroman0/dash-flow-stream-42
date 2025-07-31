import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GalleryImage {
  src: string;
  date: string;
  title: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <Card 
            key={index} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedImage(image)}
          >
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge 
                  variant="secondary" 
                  className="absolute bottom-2 right-2"
                >
                  {image.date}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-sm">{image.title}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog 
        open={!!selectedImage} 
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          {selectedImage && (
            <div className="p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">{selectedImage.title}</h2>
                <p className="text-muted-foreground">{selectedImage.date}</p>
              </div>
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}