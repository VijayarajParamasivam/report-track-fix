import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Clock, ThumbsUp, MessageSquare, TrendingUp } from "lucide-react";

const ComplaintDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock complaint data
  const complaint = {
    id: id,
    title: "Broken Street Light",
    description: "The street light on Main Street near the park has been non-functional for over a week. This creates safety concerns for pedestrians during evening hours.",
    reporter: "Anonymous",
    location: "Main Street, Gandhipuram, Coimbatore",
    department: "Electricity Board",
    status: "in-progress",
    upvotes: 23,
    createdAt: "2024-01-15",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-destructive";
      case "in-progress": return "bg-warning";
      case "resolved": return "bg-success";
      default: return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Pending";
      case "in-progress": return "In Progress";
      case "resolved": return "Resolved";
      default: return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-card border-b border-border">
        <Button variant="ghost" size="sm" onClick={() => navigate("/home")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Complaint #{complaint.id}</h1>
      </div>

      <div className="p-4 space-y-6">
        <Card>
          <CardContent className="p-6">
            {/* Status Badge */}
            <div className="flex items-center justify-between mb-4">
              <Badge className={`${getStatusColor(complaint.status)} text-white`}>
                {getStatusText(complaint.status)}
              </Badge>
              <span className="text-sm text-muted-foreground">#{complaint.id}</span>
            </div>

            {/* Image */}
            <div className="mb-4">
              <img 
                src={complaint.image} 
                alt="Complaint" 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>

            {/* Title and Description */}
            <h2 className="text-xl font-semibold text-foreground mb-2">
              {complaint.title}
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {complaint.description}
            </p>

            {/* Details */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{complaint.location}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">Reported on {complaint.createdAt}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Assigned to:</span>
                <span className="font-medium text-foreground">{complaint.department}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Reporter:</span>
                <span className="text-foreground">{complaint.reporter}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => navigate(`/complaint/${id}/progress`)}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            View Progress Tracker
          </Button>
          
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Upvote ({complaint.upvotes})
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => navigate("/chat")}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Mention in Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;