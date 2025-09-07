import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Clock } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

const MyComplaints = () => {
  const navigate = useNavigate();

  const mockComplaints = [
    {
      id: 1,
      title: "Broken Street Light",
      location: "Main Street, Gandhipuram",
      status: "in-progress",
      createdAt: "2024-01-15",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200"
    },
    {
      id: 2,
      title: "Pothole on Road",
      location: "RS Puram, Coimbatore",
      status: "pending",
      createdAt: "2024-01-14",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200"
    },
    {
      id: 3,
      title: "Water Leakage",
      location: "Peelamedu, Coimbatore",
      status: "resolved",
      createdAt: "2024-01-10",
      image: "https://images.unsplash.com/photo-1583240031704-fa81d904e4b8?w=200"
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

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending": return "Pending";
      case "in-progress": return "In Progress";
      case "resolved": return "Resolved";
      default: return "Unknown";
    }
  };

  const filterComplaints = (status: string) => {
    if (status === "all") return mockComplaints;
    return mockComplaints.filter(complaint => complaint.status === status);
  };

  const ComplaintCard = ({ complaint }: { complaint: any }) => (
    <Card 
      className="cursor-pointer hover:bg-accent/50 transition-colors"
      onClick={() => navigate(`/complaint/${complaint.id}`)}
    >
      <CardContent className="p-4">
        <div className="flex gap-3">
          <img 
            src={complaint.image} 
            alt={complaint.title}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-foreground text-sm">
                {complaint.title}
              </h3>
              <Badge className={`${getStatusColor(complaint.status)} text-white text-xs`}>
                {getStatusText(complaint.status)}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <MapPin className="h-3 w-3" />
              <span>{complaint.location}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Reported on {complaint.createdAt}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-card border-b border-border">
        <Button variant="ghost" size="sm" onClick={() => navigate("/home")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">My Complaints</h1>
      </div>

      <div className="p-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="pending" className="text-xs">Pending</TabsTrigger>
            <TabsTrigger value="in-progress" className="text-xs">In Progress</TabsTrigger>
            <TabsTrigger value="resolved" className="text-xs">Resolved</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-3 mt-4">
            {filterComplaints("all").map(complaint => (
              <ComplaintCard key={complaint.id} complaint={complaint} />
            ))}
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-3 mt-4">
            {filterComplaints("pending").map(complaint => (
              <ComplaintCard key={complaint.id} complaint={complaint} />
            ))}
          </TabsContent>
          
          <TabsContent value="in-progress" className="space-y-3 mt-4">
            {filterComplaints("in-progress").map(complaint => (
              <ComplaintCard key={complaint.id} complaint={complaint} />
            ))}
          </TabsContent>
          
          <TabsContent value="resolved" className="space-y-3 mt-4">
            {filterComplaints("resolved").map(complaint => (
              <ComplaintCard key={complaint.id} complaint={complaint} />
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default MyComplaints;