
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Clock, 
  CheckCircle, 
  XCircle,
  Download,
  Calendar,
  Filter
} from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedMetric, setSelectedMetric] = useState("executions");

  // Sample data for charts
  const executionData = [
    { date: "Mon", executions: 45, success: 42, failed: 3 },
    { date: "Tue", executions: 52, success: 49, failed: 3 },
    { date: "Wed", executions: 38, success: 36, failed: 2 },
    { date: "Thu", executions: 61, success: 58, failed: 3 },
    { date: "Fri", executions: 55, success: 53, failed: 2 },
    { date: "Sat", executions: 29, success: 28, failed: 1 },
    { date: "Sun", executions: 41, success: 39, failed: 2 }
  ];

  const performanceData = [
    { name: "Email Automation", value: 35, color: "#3B82F6" },
    { name: "Data Processing", value: 25, color: "#10B981" },
    { name: "Client Intake", value: 20, color: "#F59E0B" },
    { name: "Document Gen", value: 15, color: "#EF4444" },
    { name: "Other", value: 5, color: "#8B5CF6" }
  ];

  const timeData = [
    { date: "Week 1", timeSaved: 24 },
    { date: "Week 2", timeSaved: 31 },
    { date: "Week 3", timeSaved: 28 },
    { date: "Week 4", timeSaved: 39 }
  ];

  const topWorkflows = [
    { name: "Client Intake Process", executions: 156, successRate: 98.5, avgTime: "2.3m" },
    { name: "Invoice Automation", executions: 142, successRate: 97.2, avgTime: "1.8m" },
    { name: "Lead Nurturing", executions: 98, successRate: 96.9, avgTime: "4.1m" },
    { name: "Document Processing", executions: 87, successRate: 99.1, avgTime: "3.2m" },
    { name: "Email Campaigns", executions: 76, successRate: 94.7, avgTime: "1.5m" }
  ];

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your analytics data is being prepared for download.",
    });
  };

  const handleRefreshData = () => {
    toast({
      title: "Data Refreshed",
      description: "Analytics data has been updated with the latest information.",
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-600">Monitor your workflow performance and insights</p>
            </div>
            <div className="flex items-center space-x-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handleRefreshData}>
                <Activity className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button onClick={handleExportData}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
                <Activity className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +12.5% from last week
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">97.8%</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +0.8% from last week
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Execution Time</CardTitle>
                <Clock className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4m</div>
                <div className="flex items-center text-xs text-red-600">
                  <TrendingDown className="mr-1 h-3 w-3" />
                  -0.3m from last week
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Failed Executions</CardTitle>
                <XCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">27</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingDown className="mr-1 h-3 w-3" />
                  -15% from last week
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Execution Trends</CardTitle>
                <CardDescription>Daily workflow executions over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={executionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="executions" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
                    <Area type="monotone" dataKey="success" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Workflow Distribution</CardTitle>
                <CardDescription>Execution breakdown by workflow type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={performanceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {performanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Time Saved Analysis</CardTitle>
                <CardDescription>Weekly time savings from automation</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={timeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} hours`, "Time Saved"]} />
                    <Bar dataKey="timeSaved" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Workflows</CardTitle>
                <CardDescription>Most active workflows this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topWorkflows.map((workflow, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">{workflow.name}</p>
                        <Badge variant="secondary">{workflow.executions}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{workflow.successRate}% success</span>
                        <span>{workflow.avgTime} avg</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div 
                          className="bg-blue-600 h-1 rounded-full" 
                          style={{ width: `${workflow.successRate}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
