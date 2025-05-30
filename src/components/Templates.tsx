
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scale, Calculator, Home, Heart } from "lucide-react";

const templates = [
  {
    icon: Scale,
    title: "Law Firms",
    description: "Client intake to CRM automation",
    workflows: ["Client Onboarding", "Document Review", "Billing Automation"],
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: Calculator,
    title: "Accounting",
    description: "Invoice processing and reminders",
    workflows: ["Invoice Processing", "Payment Reminders", "Expense Tracking"],
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Home,
    title: "Real Estate",
    description: "Lead nurturing and follow-ups",
    workflows: ["Lead Qualification", "Property Alerts", "Client Follow-up"],
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Heart,
    title: "Healthcare",
    description: "Patient intake and scheduling",
    workflows: ["Patient Onboarding", "Appointment Reminders", "Follow-up Care"],
    color: "bg-red-100 text-red-600"
  }
];

export const Templates = () => {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Industry-Specific Templates
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started instantly with pre-built workflows designed for your industry
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template, index) => {
            const IconComponent = template.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 ${template.color} rounded-lg flex items-center justify-center mb-4`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {template.workflows.map((workflow, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                        {workflow}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full">
                    View Templates
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
