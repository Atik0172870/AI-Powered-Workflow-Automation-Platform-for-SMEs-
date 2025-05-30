
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Download, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface Template {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: any;
  rating: number;
  downloads: number;
  tags: string[];
  color: string;
}

interface TemplatePreviewProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TemplatePreview = ({ template, isOpen, onClose }: TemplatePreviewProps) => {
  const navigate = useNavigate();

  if (!template) return null;

  const handleUseTemplate = () => {
    localStorage.setItem('selectedTemplate', JSON.stringify(template));
    toast({
      title: "Template Loaded",
      description: `"${template.title}" has been loaded into the workflow builder`,
    });
    navigate('/workflows');
    onClose();
  };

  const IconComponent = template.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg ${template.color}`}>
              <IconComponent className="h-6 w-6" />
            </div>
            <span>{template.title}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <p className="text-gray-600 mb-4">{template.description}</p>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{template.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Download className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{template.downloads.toLocaleString()} uses</span>
                </div>
              </div>
              <Badge variant="outline">{template.category}</Badge>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {template.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Workflow Preview</CardTitle>
              <CardDescription>This template includes the following workflow steps:</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-green-700">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-green-900">Trigger Event</p>
                    <p className="text-sm text-green-700">Email received or form submitted</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-700">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">Process Data</p>
                    <p className="text-sm text-blue-700">Extract and validate information</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-purple-700">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-purple-900">Take Action</p>
                    <p className="text-sm text-purple-700">Send notifications and update records</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close Preview
            </Button>
            <Button onClick={handleUseTemplate} className="flex-1">
              <Play className="mr-2 h-4 w-4" />
              Use This Template
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
