import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import onboarding1 from "@/assets/onboarding-1.png";
import onboarding2 from "@/assets/onboarding-2.png";
import onboarding3 from "@/assets/onboarding-3.png";

const onboardingData = [
  {
    image: onboarding1,
    title: "Spot an Issue?",
    subtitle: "Just Click and Report",
    description: "Easily report civic issues in your area with just a few taps. Upload photos and provide details to help your local government respond quickly."
  },
  {
    image: onboarding2,
    title: "Track Updates",
    subtitle: "Like a Delivery Status",
    description: "Follow your complaint's progress from submission to resolution. Get real-time updates on when action is being taken."
  },
  {
    image: onboarding3,
    title: "Earn Rewards & Connect",
    subtitle: "Chat with Your Community",
    description: "Earn points for reporting issues and engage with neighbors in location-based discussions about your community."
  }
];

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    if (currentSlide < onboardingData.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/home");
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const skip = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <Button variant="ghost" onClick={prevSlide} disabled={currentSlide === 0}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" onClick={skip}>
          Skip
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <img 
            src={onboardingData[currentSlide].image}
            alt={onboardingData[currentSlide].title}
            className="w-64 h-48 mx-auto mb-8 object-contain"
          />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {onboardingData[currentSlide].title}
          </h2>
          <h3 className="text-lg text-primary font-semibold mb-4">
            {onboardingData[currentSlide].subtitle}
          </h3>
          <p className="text-muted-foreground text-center leading-relaxed">
            {onboardingData[currentSlide].description}
          </p>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center space-x-2 mb-6">
        {onboardingData.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="p-6">
        <Button onClick={nextSlide} className="w-full" size="lg">
          {currentSlide === onboardingData.length - 1 ? "Get Started" : "Next"}
          {currentSlide < onboardingData.length - 1 && <ChevronRight className="h-4 w-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;