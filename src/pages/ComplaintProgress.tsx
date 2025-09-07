import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Clock, Wrench, FileCheck } from "lucide-react";

const ComplaintProgress = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const progressSteps = [
    {
      id: 1,
      title: "Complaint Submitted",
      description: "Your complaint has been received and logged in our system",
      timestamp: "2024-01-15 10:30 AM",
      status: "completed",
      icon: FileCheck
    },
    {
      id: 2,
      title: "Assigned to Department",
      description: "Complaint forwarded to Electricity Board for review",
      timestamp: "2024-01-15 02:15 PM",
      status: "completed",
      icon: CheckCircle
    },
    {
      id: 3,
      title: "Work In Progress",
      description: "Field team dispatched to assess and fix the issue",
      timestamp: "2024-01-16 09:00 AM",
      status: "current",
      icon: Wrench
    },
    {
      id: 4,
      title: "Resolved",
      description: "Issue has been fixed and complaint marked as resolved",
      timestamp: "Expected: 2024-01-18",
      status: "pending",
      icon: CheckCircle
    }
  ];

  const getStepColor = (status: string) => {
    switch (status) {
      case "completed": return "text-success";
      case "current": return "text-warning";
      case "pending": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const getStepBg = (status: string) => {
    switch (status) {
      case "completed": return "bg-success/20";
      case "current": return "bg-warning/20";
      case "pending": return "bg-muted";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-card border-b border-border">
        <Button variant="ghost" size="sm" onClick={() => navigate(`/complaint/${id}`)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Progress Tracker</h1>
      </div>

      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Complaint #{id} Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {progressSteps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === progressSteps.length - 1;
                
                return (
                  <div key={step.id} className="flex gap-4">
                    {/* Timeline Line */}
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStepBg(step.status)}`}>
                        <Icon className={`h-5 w-5 ${getStepColor(step.status)}`} />
                      </div>
                      {!isLast && (
                        <div className={`w-0.5 h-8 mt-2 ${
                          step.status === "completed" ? "bg-success" : "bg-muted"
                        }`} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-medium ${getStepColor(step.status)}`}>
                          {step.title}
                        </h3>
                        {step.status === "completed" && (
                          <CheckCircle className="h-4 w-4 text-success" />
                        )}
                        {step.status === "current" && (
                          <Clock className="h-4 w-4 text-warning" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {step.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {step.timestamp}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium text-sm mb-2">Need Help?</h4>
          <p className="text-xs text-muted-foreground mb-3">
            If you have questions about the progress, you can contact the assigned department.
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Contact Electricity Board
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintProgress;