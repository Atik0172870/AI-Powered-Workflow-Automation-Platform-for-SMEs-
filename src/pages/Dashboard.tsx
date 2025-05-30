
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
  TrendingUp
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Active Workflows",
      value: "12",
      description: "Currently running",
      icon: Play,
      color: "text-green-600"
    },
    {
      title: "Total Automations",
      value: "847",
      description: "This month",
      icon: BarChart3,
      color: "text-blue-600"
    },
    {
      title: "Time Saved",
      value: "156h",
      description: "This month",
      icon: Clock,
      color: "text-purple-600"
    },
    {
      title: "Success Rate",
      value: "98.5%",
      description: "Workflow completion",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  const recentWorkflows = [
    { name: "Client Intake Process", status: "Active", runs: 45 },
    { name: "Invoice Automation", status: "Active", runs: 23 },
    { name: "Lead Nurturing", status: "Paused", runs: 12 },
    { name: "Document Processing", status: "Active", runs: 67 }
  ];

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
            <Button onClick={() => navigate('/workflows')} className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Create Workflow
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <IconComponent className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Recent Workflows */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Workflows</CardTitle>
                <CardDescription>Your most recently created workflows</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentWorkflows.map((workflow, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{workflow.name}</p>
                        <p className="text-sm text-gray-600">{workflow.runs} runs</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          workflow.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {workflow.status}
                        </span>
                        <Button size="sm" variant="outline">
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
