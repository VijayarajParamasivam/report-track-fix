import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Camera, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NewComplaint = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "Gandhipuram, Coimbatore - Auto detected",
    photo: null as File | null
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Complaint Submitted",
        description: "Your complaint has been successfully submitted and assigned ID #C001.",
      });
      navigate("/complaint/1");
    }, 2000);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-card border-b border-border">
        <Button variant="ghost" size="sm" onClick={() => navigate("/home")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">New Complaint</h1>
      </div>

      <div className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Report an Issue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Photo Upload */}
            <div className="space-y-2">
              <Label>Photo Evidence</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-3">
                  {formData.photo ? formData.photo.name : "Upload or take a photo"}
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <Label htmlFor="photo-upload">
                  <Button variant="outline" size="sm" asChild>
                    <span>Choose Photo</span>
                  </Button>
                </Label>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Issue Title</Label>
              <Input
                id="title"
                placeholder="Briefly describe the issue"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea
                id="description"
                placeholder="Provide more details about the issue..."
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label>Location</Label>
              <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{formData.location}</span>
                <Button variant="ghost" size="sm" className="ml-auto text-xs">
                  Adjust
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit} 
          className="w-full" 
          size="lg"
          disabled={isSubmitting || !formData.title || !formData.description}
        >
          {isSubmitting ? (
            <>Submitting...</>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Report Issue
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default NewComplaint;