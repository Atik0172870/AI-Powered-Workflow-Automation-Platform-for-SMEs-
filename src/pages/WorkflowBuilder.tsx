
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/Sidebar";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Save, 
  Plus, 
  Mail, 
  Database, 
  FileText, 
  Clock,
  Zap,
  Settings,
  Trash2,
  Copy,
  Share,
  Download,
  Upload,
  Undo,
  Redo
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const WorkflowBuilder = () => {
  const [workflowName, setWorkflowName] = useState("Untitled Workflow");
  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const nodeTypes = [
    { type: "trigger", label: "Email Trigger", icon: Mail, color: "bg-green-100 text-green-700", description: "Triggers when an email is received" },
    { type: "action", label: "Database Action", icon: Database, color: "bg-blue-100 text-blue-700", description: "Perform database operations" },
    { type: "condition", label: "Decision Point", icon: Settings, color: "bg-yellow-100 text-yellow-700", description: "Add conditional logic" },
    { type: "delay", label: "Wait/Delay", icon: Clock, color: "bg-purple-100 text-purple-700", description: "Add time delays" },
    { type: "integration", label: "API Call", icon: Zap, color: "bg-orange-100 text-orange-700", description: "Call external APIs" },
    { type: "document", label: "Generate Document", icon: FileText, color: "bg-pink-100 text-pink-700", description: "Create documents" }
  ];

  const templates = [
    { name: "Client Intake Flow", description: "Automated client onboarding process" },
    { name: "Invoice Processing", description: "Automated invoice generation and tracking" },
    { name: "Lead Nurturing", description: "Automated lead follow-up sequence" },
    { name: "Document Review", description: "Automated document processing workflow" }
  ];

  const handleAddNode = (nodeType) => {
    const newNode = {
      id: Date.now(),
      type: nodeType.type,
      label: nodeType.label,
      x: Math.random() * 400 + 50,
      y: Math.random() * 300 + 50,
      config: {}
    };
    setNodes([...nodes, newNode]);
    toast({
      title: "Node Added",
      description: `${nodeType.label} has been added to your workflow`,
    });
  };

  const handleDeleteNode = (nodeId) => {
    setNodes(nodes.filter(node => node.id !== nodeId));
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
    toast({
      title: "Node Deleted",
      description: "Node has been removed from the workflow",
    });
  };

  const handleSelectNode = (node) => {
    setSelectedNode(node);
  };

  const handleSave = () => {
    toast({
      title: "Workflow Saved",
      description: `"${workflowName}" has been saved successfully`,
    });
  };

  const handleRun = async () => {
    if (nodes.length === 0) {
      toast({
        title: "Cannot Run Workflow",
        description: "Please add at least one node to your workflow",
        variant: "destructive"
      });
      return;
    }

    setIsRunning(true);
    toast({
      title: "Workflow Started",
      description: `"${workflowName}" is now running`,
    });

    // Simulate workflow execution
    setTimeout(() => {
      setIsRunning(false);
      toast({
        title: "Workflow Completed",
        description: "Your workflow has finished executing successfully",
      });
    }, 3000);
  };

  const handleDuplicate = () => {
    toast({
      title: "Workflow Duplicated",
      description: `Copy of "${workflowName}" has been created`,
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Link Generated",
      description: "Workflow share link has been copied to clipboard",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Workflow is being exported as JSON",
    });
  };

  const handleImport = () => {
    toast({
      title: "Import Workflow",
      description: "Select a JSON file to import a workflow",
    });
  };

  const loadTemplate = (template) => {
    // Simulate loading a template
    const templateNodes = [
      {
        id: Date.now(),
        type: "trigger",
        label: "Email Trigger",
        x: 100,
        y: 100,
        config: {}
      },
      {
        id: Date.now() + 1,
        type: "action",
        label: "Database Action",
        x: 300,
        y: 100,
        config: {}
      }
    ];
    
    setNodes(templateNodes);
    setWorkflowName(template.name);
    toast({
      title: "Template Loaded",
      description: `"${template.name}" template has been loaded`,
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
                className="text-xl font-semibold border-none shadow-none p-0 h-auto max-w-md"
              />
              <Badge variant={isRunning ? "default" : "secondary"}>
                {isRunning ? "Running" : "Draft"}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleImport}>
                <Upload className="mr-1 h-3 w-3" />
                Import
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="mr-1 h-3 w-3" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={handleDuplicate}>
                <Copy className="mr-1 h-3 w-3" />
                Duplicate
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share className="mr-1 h-3 w-3" />
                Share
              </Button>
              <Button variant="outline" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button onClick={handleRun} disabled={isRunning}>
                <Play className="mr-2 h-4 w-4" />
                {isRunning ? "Running..." : "Run"}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-1">
          {/* Node Palette */}
          <div className="w-80 bg-white border-r p-4 overflow-y-auto">
            <h3 className="font-semibold mb-4">Workflow Nodes</h3>
            <div className="space-y-2 mb-8">
              {nodeTypes.map((nodeType, index) => {
                const IconComponent = nodeType.icon;
                return (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto p-3 text-left"
                    onClick={() => handleAddNode(nodeType)}
                  >
                    <div className={`p-2 rounded mr-3 ${nodeType.color}`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{nodeType.label}</div>
                      <div className="text-xs text-gray-500">{nodeType.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>

            <h4 className="font-medium mb-3">Quick Templates</h4>
            <div className="space-y-2">
              {templates.map((template, index) => (
                <Button 
                  key={index}
                  variant="ghost" 
                  className="w-full justify-start text-sm h-auto p-2 text-left"
                  onClick={() => loadTemplate(template)}
                >
                  <div>
                    <div className="font-medium">{template.name}</div>
                    <div className="text-xs text-gray-500">{template.description}</div>
                  </div>
                </Button>
              ))}
            </div>

            {/* Node Properties Panel */}
            {selectedNode && (
              <div className="mt-8 pt-4 border-t">
                <h4 className="font-medium mb-3">Node Properties</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Node Type</label>
                    <p className="text-sm text-gray-600">{selectedNode.label}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Node ID</label>
                    <p className="text-sm text-gray-600">{selectedNode.id}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleDeleteNode(selectedNode.id)}
                  >
                    <Trash2 className="mr-1 h-3 w-3" />
                    Delete Node
                  </Button>
                </div>
              </div>
            )}
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
                      <Button className="w-full" onClick={() => handleAddNode(nodeTypes[0])}>
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
                      className={`absolute bg-white border rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-all ${
                        selectedNode?.id === node.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
                      }`}
                      style={{ left: node.x, top: node.y }}
                      onClick={() => handleSelectNode(node)}
                    >
                      <div className="flex items-center space-x-2">
                        <div className={`p-1 rounded ${nodeTypes.find(t => t.type === node.type)?.color}`}>
                          {/* Icon would go here */}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{node.label}</div>
                          <div className="text-xs text-gray-500 capitalize">{node.type}</div>
                        </div>
                      </div>
                      {selectedNode?.id === node.id && (
                        <div className="mt-2 pt-2 border-t">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteNode(node.id);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Connection lines between nodes */}
                  {nodes.length > 1 && (
                    <svg className="absolute inset-0 pointer-events-none">
                      {nodes.slice(0, -1).map((node, index) => {
                        const nextNode = nodes[index + 1];
                        return (
                          <line
                            key={`line-${node.id}-${nextNode.id}`}
                            x1={node.x + 100}
                            y1={node.y + 30}
                            x2={nextNode.x + 100}
                            y2={nextNode.y + 30}
                            stroke="#3B82F6"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                          />
                        );
                      })}
                    </svg>
                  )}
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
