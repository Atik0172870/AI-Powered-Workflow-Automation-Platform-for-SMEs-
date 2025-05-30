
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Automate Your Business?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of SMEs who have transformed their workflows with AI-powered automation. 
          Start your free trial today - no credit card required.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            variant="secondary" 
            className="px-8 py-3"
            onClick={() => navigate('/register')}
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600"
            onClick={() => window.open('https://calendly.com/demo', '_blank')}
          >
            Schedule Demo
          </Button>
        </div>
        
        <p className="text-blue-200 text-sm mt-4">
          14-day free trial • No setup fees • Cancel anytime
        </p>
      </div>
    </section>
  );
};
