
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FlowlyAI</h3>
            <p className="text-gray-400 mb-4">
              Empowering SMEs with intelligent workflow automation.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="#" className="hover:text-white">Features</Link></li>
              <li><Link to="#" className="hover:text-white">Templates</Link></li>
              <li><Link to="#" className="hover:text-white">Integrations</Link></li>
              <li><Link to="#" className="hover:text-white">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Industries</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="#" className="hover:text-white">Law Firms</Link></li>
              <li><Link to="#" className="hover:text-white">Accounting</Link></li>
              <li><Link to="#" className="hover:text-white">Real Estate</Link></li>
              <li><Link to="#" className="hover:text-white">Healthcare</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="#" className="hover:text-white">Documentation</Link></li>
              <li><Link to="#" className="hover:text-white">Help Center</Link></li>
              <li><Link to="#" className="hover:text-white">Contact</Link></li>
              <li><Link to="#" className="hover:text-white">Status</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 FlowlyAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
