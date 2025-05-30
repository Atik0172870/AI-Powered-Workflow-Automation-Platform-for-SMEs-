
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/Sidebar";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Star, 
  Download, 
  Eye,
  Scale,
  Calculator,
  Home,
  Heart,
  Briefcase,
  Users
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const templates = [
    {
      id: 1,
      title: "Client Intake Automation",
      description: "Automatically process new client inquiries and route them to the appropriate team member",
      category: "Law Firms",
      icon: Scale,
      rating: 4.8,
      downloads: 1234,
      tags: ["CRM", "Email", "Legal"],
      color: "bg-purple-100 text-purple-600"
    },
    {
      id: 2,
      title: "Invoice Processing Workflow",
      description: "Streamline invoice creation, approval, and payment reminder processes",
      category: "Accounting",
      icon: Calculator,
      rating: 4.9,
      downloads: 987,
      tags: ["Finance", "Automation", "Payments"],
      color: "bg-green-100 text-green-600"
    },
    {
      id: 3,
      title: "Property Lead Management",
      description: "Capture, qualify, and nurture real estate leads through automated sequences",
      category: "Real Estate",
      icon: Home,
      rating: 4.7,
      downloads: 756,
      tags: ["CRM", "Lead Gen", "Email"],
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 4,
      title: "Patient Appointment System",
      description: "Automate patient scheduling, reminders, and follow-up communications",
      category: "Healthcare",
      icon: Heart,
      rating: 4.6,
      downloads: 543,
      tags: ["Scheduling", "Healthcare", "SMS"],
      color: "bg-red-100 text-red-600"
    },
    {
      id: 5,
      title: "Employee Onboarding",
      description: "Complete workflow for new employee setup and documentation",
      category: "HR",
      icon: Users,
      rating: 4.5,
      downloads: 432,
      tags: ["HR", "Onboarding", "Documents"],
      color: "bg-orange-100 text-orange-600"
    },
    {
      id: 6,
      title: "Marketing Campaign Automation",
      description: "Multi-channel marketing sequences with lead scoring and segmentation",
      category: "Marketing",
      icon: Briefcase,
      rating: 4.8,
      downloads: 821,
      tags: ["Marketing", "Email", "Analytics"],
      color: "bg-pink-100 text-pink-600"
    }
  ];

  const categories = ["All", "Law Firms", "Accounting", "Real Estate", "Healthcare", "HR", "Marketing"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (template) => {
    toast({
      title: "Template Loaded",
      description: `"${template.title}" has been loaded into the workflow builder`,
    });
    navigate('/workflows');
  };

  const handlePreview = (template) => {
    toast({
      title: "Template Preview",
      description: `Previewing "${template.title}"`,
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Workflow Templates</h1>
            <p className="text-gray-600">Pre-built workflows to get you started quickly</p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => {
              const IconComponent = template.icon;
              return (
                <Card key={template.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-lg ${template.color} mb-4`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{template.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{template.title}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {template.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Download className="h-4 w-4" />
                        <span>{template.downloads.toLocaleString()} uses</span>
                      </div>
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handlePreview(template)}
                      >
                        <Eye className="mr-1 h-3 w-3" />
                        Preview
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleUseTemplate(template)}
                      >
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No templates found matching your criteria</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Templates;
