
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/Sidebar";
import { 
  Play, 
  Save, 
  Plus, 
  Mail, 
  Database, 
  FileText, 
  Clock,
  Zap,
  Settings
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const WorkflowBuilder = () => {
  const [workflowName, setWorkflowName] = useState("Untitled Workflow");
  const [nodes, setNodes] = useState([]);

  const nodeTypes = [
    { type: "trigger", label: "Email Trigger", icon: Mail, color: "bg-green-100 text-green-700" },
    { type: "action", label: "Database Action", icon: Database, color: "bg-blue-100 text-blue-700" },
    { type: "condition", label: "Decision Point", icon: Settings, color: "bg-yellow-100 text-yellow-700" },
    { type: "delay", label: "Wait/Delay", icon: Clock, color: "bg-purple-100 text-purple-700" },
    { type: "integration", label: "API Call", icon: Zap, color: "bg-orange-100 text-orange-700" },
    { type: "document", label: "Generate Document", icon: FileText, color: "bg-pink-100 text-pink-700" }
  ];

  const handleAddNode = (nodeType) => {
    const newNode = {
      id: Date.now(),
      type: nodeType.type,
      label: nodeType.label,
      x: Math.random() * 400,
      y: Math.random() * 300
    };
    setNodes([...nodes, newNode]);
    toast({
      title: "Node Added",
      description: `${nodeType.label} has been added to your workflow`,
    });
  };

  const handleSave = () => {
    toast({
      title: "Workflow Saved",
      description: `"${workflowName}" has been saved successfully`,
    });
  };

  const handleRun = () => {
    toast({
      title: "Workflow Started",
      description: `"${workflowName}" is now running`,
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Input
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                className="text-xl font-semibold border-none shadow-none p-0 h-auto"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button onClick={handleRun}>
                <Play className="mr-2 h-4 w-4" />
                Run
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-1">
          {/* Node Palette */}
          <div className="w-80 bg-white border-r p-4">
            <h3 className="font-semibold mb-4">Workflow Nodes</h3>
            <div className="space-y-2">
              {nodeTypes.map((nodeType, index) => {
                const IconComponent = nodeType.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto p-3"
                    onClick={() => handleAddNode(nodeType)}
                  >
                    <div className={`p-2 rounded mr-3 ${nodeType.color}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{nodeType.label}</div>
                      <div className="text-xs text-gray-500 capitalize">{nodeType.type}</div>
                    </div>
                  </Button>
                );
              })}
            </div>

            <div className="mt-8">
              <h4 className="font-medium mb-3">Quick Templates</h4>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Client Intake Flow
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Invoice Processing
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  Lead Nurturing
                </Button>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 bg-gray-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="relative h-full p-8">
              {nodes.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <Card className="max-w-md text-center">
                    <CardHeader>
                      <CardTitle>Start Building Your Workflow</CardTitle>
                      <CardDescription>
                        Drag and drop nodes from the left panel to create your automation workflow
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Your First Node
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="relative">
                  {nodes.map((node) => (
                    <div
                      key={node.id}
                      className="absolute bg-white border rounded-lg p-4 shadow-sm cursor-move hover:shadow-md transition-shadow"
                      style={{ left: node.x, top: node.y }}
                    >
                      <div className="font-medium">{node.label}</div>
                      <div className="text-xs text-gray-500 mt-1">{node.type}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
