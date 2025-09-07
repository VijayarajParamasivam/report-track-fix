import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Map, FileText, MessageCircle, Trophy } from "lucide-react";

const navigationItems = [
  { icon: Map, label: "Map", path: "/home" },
  { icon: FileText, label: "My Complaints", path: "/my-complaints" },
  { icon: MessageCircle, label: "Chat", path: "/chat" },
  { icon: Trophy, label: "Leaderboard", path: "/leaderboard" }
];

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex items-center justify-around py-2 px-1 max-w-md mx-auto">
        {navigationItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Button
              key={path}
              variant="ghost"
              size="sm"
              onClick={() => navigate(path)}
              className={`flex-1 flex-col h-auto py-2 px-2 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 mb-1 ${isActive ? "text-primary" : ""}`} />
              <span className="text-xs">{label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;