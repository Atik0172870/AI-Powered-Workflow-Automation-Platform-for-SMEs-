
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/Sidebar";
import { useNavigate } from "react-router-dom";
import { 
  Plus, 
  Play, 
  Pause, 
  BarChart3, 
  Users, 
  Clock,
  TrendingUp,
  FileText,
  Settings,
  RefreshCw,
  Download
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [refreshing, setRefreshing] = useState(false);

  const stats = [
    {
      title: "Active Workflows",
      value: "12",
      description: "Currently running",
      icon: Play,
      color: "text-green-600",
      change: "+2 from yesterday"
    },
    {
      title: "Total Automations",
      value: "847",
      description: "This month",
      icon: BarChart3,
      color: "text-blue-600",
      change: "+67 from last month"
    },
    {
      title: "Time Saved",
      value: "156h",
      description: "This month",
      icon: Clock,
      color: "text-purple-600",
      change: "+24h from last month"
    },
    {
      title: "Success Rate",
      value: "98.5%",
      description: "Workflow completion",
      icon: TrendingUp,
      color: "text-orange-600",
      change: "+1.2% from last month"
    }
  ];

  const recentWorkflows = [
    { id: 1, name: "Client Intake Process", status: "Active", runs: 45, lastRun: "2 minutes ago" },
    { id: 2, name: "Invoice Automation", status: "Active", runs: 23, lastRun: "5 minutes ago" },
    { id: 3, name: "Lead Nurturing", status: "Paused", runs: 12, lastRun: "1 hour ago" },
    { id: 4, name: "Document Processing", status: "Active", runs: 67, lastRun: "10 minutes ago" }
  ];

  const handleWorkflowToggle = (workflow) => {
    const newStatus = workflow.status === 'Active' ? 'Paused' : 'Active';
    toast({
      title: `Workflow ${newStatus}`,
      description: `"${workflow.name}" has been ${newStatus.toLowerCase()}`,
    });
  };

  const handleRefreshDashboard = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      toast({
        title: "Dashboard Refreshed",
        description: "All data has been updated with the latest information",
      });
    }, 2000);
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your dashboard data is being prepared for download",
    });
  };

  const handleViewWorkflow = (workflow) => {
    toast({
      title: "Opening Workflow",
      description: `Loading "${workflow.name}" in the workflow builder`,
    });
    navigate('/workflows');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your workflows.</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                onClick={handleRefreshDashboard}
                disabled={refreshing}
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" onClick={handleExportData}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button onClick={() => navigate('/workflows')} className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Create Workflow
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <IconComponent className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                    <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Recent Workflows */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Workflows</CardTitle>
                    <CardDescription>Your most recently active workflows</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate('/workflows')}>
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentWorkflows.map((workflow) => (
                    <div key={workflow.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1 cursor-pointer" onClick={() => handleViewWorkflow(workflow)}>
                        <p className="font-medium">{workflow.name}</p>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>{workflow.runs} runs</span>
                          <span>{workflow.lastRun}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          workflow.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {workflow.status}
                        </span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleWorkflowToggle(workflow)}
                        >
                          {workflow.status === 'Active' ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Get started with these common tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/workflows')}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Workflow
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/templates')}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Browse Templates
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/analytics')}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/settings')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest workflow executions and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { action: "Workflow completed", workflow: "Client Intake Process", time: "2 minutes ago", status: "success" },
                  { action: "Workflow started", workflow: "Invoice Automation", time: "5 minutes ago", status: "running" },
                  { action: "Workflow failed", workflow: "Lead Nurturing", time: "15 minutes ago", status: "error" },
                  { action: "New template created", workflow: "Document Processing", time: "1 hour ago", status: "info" },
                  { action: "User logged in", workflow: "System", time: "2 hours ago", status: "info" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'success' ? 'bg-green-500' :
                        activity.status === 'error' ? 'bg-red-500' :
                        activity.status === 'running' ? 'bg-blue-500' :
                        'bg-gray-400'
                      }`}></div>
                      <div>
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-600">{activity.workflow}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
