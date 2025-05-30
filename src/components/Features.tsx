
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Settings, Calendar, Bell } from "lucide-react";

const features = [
  {
    icon: Code,
    title: "No-Code Builder",
    description: "Drag and drop interface to build complex workflows without writing a single line of code."
  },
  {
    icon: Settings,
    title: "AI-Powered Automation",
    description: "Smart document parsing, email summarization, and lead scoring using advanced AI."
  },
  {
    icon: Calendar,
    title: "Industry Templates",
    description: "Pre-built workflows for law firms, accountants, real estate, healthcare, and more."
  },
  {
    icon: Bell,
    title: "Smart Integrations",
    description: "Connect with Gmail, Slack, CRMs, calendars, and 100+ other business tools."
  }
];

export const Features = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Automate
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed specifically for small and medium enterprises
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
