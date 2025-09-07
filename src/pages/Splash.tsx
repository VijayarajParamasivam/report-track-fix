import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/auth");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8 animate-pulse">
          <img 
            src={logo} 
            alt="FixItUp Logo" 
            className="w-32 h-32 mx-auto mb-6"
          />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">FixItUp</h1>
        <p className="text-lg text-muted-foreground mb-8">Report. Track. Fix.</p>
        <div className="w-16 h-1 bg-primary rounded-full mx-auto animate-pulse"></div>
      </div>
    </div>
  );
};

export default Splash;