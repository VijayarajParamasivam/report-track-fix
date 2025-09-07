import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, ArrowLeft, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";

const Chat = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages] = useState([
    {
      id: 1,
      user: "Citizen123",
      message: "Has anyone reported the street light issue on Main Street?",
      timestamp: "10:30 AM",
      complaintId: 1
    },
    {
      id: 2,
      user: "LocalResident",
      message: "Yes, I saw that complaint. Already has 20+ upvotes!",
      timestamp: "10:35 AM",
      complaintId: null
    },
    {
      id: 3,
      user: "CommunityHelper",
      message: "The pothole near the school is getting worse. Someone should report it.",
      timestamp: "10:40 AM",
      complaintId: null
    },
    {
      id: 4,
      user: "SafetyFirst",
      message: "I just reported it! Here's the complaint: #C002",
      timestamp: "10:45 AM",
      complaintId: 2
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to the server
      setMessage("");
    }
  };

  const handleComplaintClick = (complaintId: number) => {
    navigate(`/complaint/${complaintId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center gap-3 mb-2">
          <Button variant="ghost" size="sm" onClick={() => navigate("/home")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Community Chat</h1>
            <p className="text-sm text-muted-foreground">Coimbatore - Gandhipuram</p>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Users className="h-3 w-3" />
            24 online
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4">
        {messages.map((msg) => (
          <Card key={msg.id} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium text-sm text-primary">{msg.user}</span>
              <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
            </div>
            <p className="text-sm text-foreground mb-2">{msg.message}</p>
            {msg.complaintId && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleComplaintClick(msg.complaintId!)}
                className="mt-2 h-8 text-xs"
              >
                View Complaint #{msg.complaintId}
              </Button>
            )}
          </Card>
        ))}
      </div>

      {/* Message Input */}
      <div className="fixed bottom-16 left-0 right-0 bg-card border-t border-border p-4">
        <div className="flex gap-2 max-w-md mx-auto">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Chat;