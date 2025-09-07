import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Crown, Medal, Award, Plus } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

const Leaderboard = () => {
  const navigate = useNavigate();
  
  const leaderboardData = [
    { 
      id: 1, 
      name: "CitizenHero", 
      points: 2850, 
      rank: 1, 
      complaints: 28, 
      badge: "Community Champion" 
    },
    { 
      id: 2, 
      name: "SafetyFirst", 
      points: 2340, 
      rank: 2, 
      complaints: 24, 
      badge: "Safety Guardian" 
    },
    { 
      id: 3, 
      name: "LocalReporter", 
      points: 1980, 
      rank: 3, 
      complaints: 19, 
      badge: "Active Reporter" 
    },
    { 
      id: 4, 
      name: "CivicMinded", 
      points: 1750, 
      rank: 4, 
      complaints: 17, 
      badge: "Community Helper" 
    },
    { 
      id: 5, 
      name: "You", 
      points: 1250, 
      rank: 8, 
      complaints: 12, 
      badge: "Rising Star" 
    },
    { 
      id: 6, 
      name: "NeighborhoodWatch", 
      points: 1150, 
      rank: 9, 
      complaints: 11, 
      badge: "Vigilant Citizen" 
    },
    { 
      id: 7, 
      name: "UrbanImprover", 
      points: 890, 
      rank: 12, 
      complaints: 9, 
      badge: "City Improver" 
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Award className="h-5 w-5 text-amber-600" />;
      default: return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number, isCurrentUser: boolean) => {
    if (isCurrentUser) return "bg-primary/10 border-primary/30";
    if (rank <= 3) return "bg-accent/10";
    return "bg-card";
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-card border-b border-border">
        <Button variant="ghost" size="sm" onClick={() => navigate("/home")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Leaderboard</h1>
      </div>

      <div className="p-4">
        {/* Your Rank Card */}
        <Card className="mb-6 bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl font-bold text-primary">#8</span>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Your Rank
                </Badge>
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">1,250 pts</p>
              <p className="text-sm text-muted-foreground mb-3">
                12 complaints reported • Rising Star
              </p>
              <Button onClick={() => navigate("/new-complaint")} size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Report Issue to Climb Up!
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard List */}
        <div className="space-y-3">
          {leaderboardData.map((user) => {
            const isCurrentUser = user.name === "You";
            return (
              <Card 
                key={user.id} 
                className={`${getRankBg(user.rank, isCurrentUser)} transition-all`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10">
                      {getRankIcon(user.rank)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-medium ${isCurrentUser ? 'text-primary' : 'text-foreground'}`}>
                          {user.name}
                        </span>
                        {isCurrentUser && (
                          <Badge variant="outline" className="text-xs border-primary text-primary">
                            You
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {user.complaints} complaints • {user.badge}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-foreground">{user.points}</p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Points Info */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <h3 className="font-medium text-sm mb-3">How to Earn Points</h3>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Report a new complaint</span>
                <span className="font-medium">+50 pts</span>
              </div>
              <div className="flex justify-between">
                <span>Receive an upvote</span>
                <span className="font-medium">+10 pts</span>
              </div>
              <div className="flex justify-between">
                <span>Complaint gets resolved</span>
                <span className="font-medium">+100 pts</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Leaderboard;