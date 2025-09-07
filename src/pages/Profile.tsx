import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, Mail, Phone, Edit, LogOut, Award, FileText } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  
  const [userProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    joinDate: "January 2024",
    totalComplaints: 12,
    resolvedComplaints: 8,
    points: 1250,
    rank: 8,
    badge: "Rising Star"
  });

  const recentComplaints = [
    {
      id: 1,
      title: "Broken Street Light",
      status: "in-progress",
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Pothole on Road",
      status: "pending",
      date: "2024-01-14"
    },
    {
      id: 3,
      title: "Water Leakage",
      status: "resolved",
      date: "2024-01-10"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-destructive";
      case "in-progress": return "bg-warning";
      case "resolved": return "bg-success";
      default: return "bg-muted";
    }
  };

  const handleLogout = () => {
    // In a real app, this would clear auth tokens
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-card border-b border-border">
        <Button variant="ghost" size="sm" onClick={() => navigate("/home")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Profile</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Info */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-foreground">{userProfile.name}</h2>
                <p className="text-sm text-muted-foreground">Member since {userProfile.joinDate}</p>
                <Badge className="mt-2 bg-primary/10 text-primary">
                  {userProfile.badge}
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{userProfile.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{userProfile.phone}</span>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{userProfile.points}</p>
              <p className="text-sm text-muted-foreground">Total Points</p>
              <p className="text-xs text-primary">Rank #{userProfile.rank}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 text-success mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{userProfile.totalComplaints}</p>
              <p className="text-sm text-muted-foreground">Complaints Filed</p>
              <p className="text-xs text-success">{userProfile.resolvedComplaints} resolved</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Complaints */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Complaints</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {recentComplaints.map((complaint, index) => (
              <div 
                key={complaint.id} 
                className={`p-4 cursor-pointer hover:bg-accent/50 ${
                  index !== recentComplaints.length - 1 ? "border-b border-border" : ""
                }`}
                onClick={() => navigate(`/complaint/${complaint.id}`)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{complaint.title}</p>
                    <p className="text-xs text-muted-foreground">{complaint.date}</p>
                  </div>
                  <Badge className={`${getStatusColor(complaint.status)} text-white text-xs`}>
                    {complaint.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full" onClick={() => navigate("/my-complaints")}>
            View All My Complaints
          </Button>
          <Button variant="outline" className="w-full" onClick={() => navigate("/leaderboard")}>
            View Full Leaderboard
          </Button>
          <Button variant="destructive" className="w-full" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;