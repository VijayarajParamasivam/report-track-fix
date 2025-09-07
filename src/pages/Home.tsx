import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, User, Star, Trophy, MapIcon } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

// Mock data for complaints on map
const mockComplaints = [
  { id: 1, lat: 11.0168, lng: 76.9558, status: "pending", type: "road" },
  { id: 2, lat: 11.0178, lng: 76.9568, status: "in-progress", type: "water" },
  { id: 3, lat: 11.0158, lng: 76.9548, status: "resolved", type: "electricity" },
];

const Home = () => {
  const navigate = useNavigate();
  const [userPoints] = useState(1250);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleNewComplaint = () => {
    navigate("/new-complaint");
  };

  const handleComplaintClick = (complaintId: number) => {
    navigate(`/complaint/${complaintId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4 bg-card border-b border-border">
        <Button variant="ghost" size="sm" onClick={handleProfileClick}>
          <User className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            <Star className="h-3 w-3 mr-1" />
            {userPoints} pts
          </Badge>
          <Button variant="ghost" size="sm" onClick={() => navigate("/leaderboard")}>
            <Trophy className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Map Area */}
      <div className="relative h-[calc(100vh-8rem)] bg-muted">
        {/* Map Placeholder - In a real app, this would be an actual map component */}
        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative">
          <div className="text-center text-muted-foreground">
            <MapIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-sm">Interactive Map</p>
            <p className="text-xs">Showing complaints in your area</p>
          </div>

          {/* Mock complaint pins */}
          {mockComplaints.map((complaint) => (
            <Button
              key={complaint.id}
              size="sm"
              variant="secondary"
              className={`absolute w-8 h-8 rounded-full p-0 ${
                complaint.status === "pending" ? "bg-destructive text-destructive-foreground" :
                complaint.status === "in-progress" ? "bg-warning text-warning-foreground" :
                "bg-success text-success-foreground"
              }`}
              style={{
                left: `${50 + (complaint.id - 2) * 10}%`,
                top: `${50 + (complaint.id - 2) * 8}%`
              }}
              onClick={() => handleComplaintClick(complaint.id)}
            >
              {complaint.id}
            </Button>
          ))}
        </div>

        {/* Floating Action Button */}
        <Button
          size="lg"
          onClick={handleNewComplaint}
          className="absolute bottom-6 right-6 rounded-full w-14 h-14 shadow-lg"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      {/* Current Location Info */}
      <div className="p-4 bg-card border-t border-border">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Showing complaints in</p>
          <p className="font-semibold text-foreground">Coimbatore - Gandhipuram</p>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Home;