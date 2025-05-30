
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar } from "@/components/Sidebar";
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
  Cell
} from "recharts";

const Analytics = () => {
  const workflowData = [
    { name: 'Jan', workflows: 65, automations: 234 },
    { name: 'Feb', workflows: 59, automations: 267 },
    { name: 'Mar', workflows: 80, automations: 398 },
    { name: 'Apr', workflows: 81, automations: 445 },
    { name: 'May', workflows: 56, automations: 321 },
    { name: 'Jun', workflows: 95, automations: 567 }
  ];

  const successRateData = [
    { name: 'Week 1', rate: 98.2 },
    { name: 'Week 2', rate: 97.8 },
    { name: 'Week 3', rate: 99.1 },
    { name: 'Week 4', rate: 98.5 }
  ];

  const categoryData = [
    { name: 'Email Automation', value: 35, color: '#3B82F6' },
    { name: 'Data Processing', value: 25, color: '#10B981' },
    { name: 'CRM Integration', value: 20, color: '#F59E0B' },
    { name: 'Document Gen', value: 12, color: '#EF4444' },
    { name: 'Other', value: 8, color: '#8B5CF6' }
  ];

  const stats = [
    { title: "Total Workflows", value: "156", change: "+12%", changeType: "positive" },
    { title: "Successful Runs", value: "2,847", change: "+8%", changeType: "positive" },
    { title: "Time Saved", value: "342h", change: "+15%", changeType: "positive" },
    { title: "Error Rate", value: "1.2%", change: "-0.3%", changeType: "positive" }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Reports</h1>
            <p className="text-gray-600">Track your workflow performance and automation metrics</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className={`text-xs ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Workflow Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Workflow Activity</CardTitle>
                <CardDescription>Monthly workflow creation and automation runs</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={workflowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="workflows" fill="#3B82F6" name="Workflows Created" />
                    <Bar dataKey="automations" fill="#10B981" name="Automations Run" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Success Rate Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Success Rate Trend</CardTitle>
                <CardDescription>Weekly workflow success percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={successRateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[95, 100]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="rate" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      name="Success Rate (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Workflow Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Workflow Categories</CardTitle>
                <CardDescription>Distribution of workflow types</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {categoryData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        {item.name}
                      </div>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Workflows */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Top Performing Workflows</CardTitle>
                <CardDescription>Most successful workflows this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Client Intake Process", runs: 234, success: 99.1 },
                    { name: "Invoice Automation", runs: 187, success: 98.9 },
                    { name: "Lead Nurturing Campaign", runs: 145, success: 97.8 },
                    { name: "Document Processing", runs: 123, success: 98.2 },
                    { name: "Appointment Scheduling", runs: 98, success: 99.5 }
                  ].map((workflow, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{workflow.name}</p>
                        <p className="text-sm text-gray-600">{workflow.runs} runs</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">{workflow.success}%</p>
                        <p className="text-sm text-gray-600">Success Rate</p>
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
