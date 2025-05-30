
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm border-b px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          FlowlyAI
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/templates" className="text-gray-600 hover:text-gray-900">
            Templates
          </Link>
          <Link to="/pricing" className="text-gray-600 hover:text-gray-900">
            Pricing
          </Link>
          <Link to="/analytics" className="text-gray-600 hover:text-gray-900">
            Analytics
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/login')}
          >
            Sign In
          </Button>
          <Button onClick={() => navigate('/register')}>
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};
