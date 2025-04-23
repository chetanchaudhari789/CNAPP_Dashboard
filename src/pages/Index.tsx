
import { Card } from "@/components/ui/card";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useDashboardStore } from "@/store/dashboardData";
import { AddWidgetDialog } from "@/components/dashboard/AddWidgetDialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CloudAccountsChart } from "@/components/dashboard/CloudAccountsChart";
import { RiskAssessmentChart } from "@/components/dashboard/RiskAssessmentChart";
import { WorkloadAlerts } from "@/components/dashboard/WorkloadAlerts";
import RegistryScan from "@/components/dashboard/RegistryScan";

const WidgetContent = ({ content }: { content: string }) => {
  switch (content) {
    case '<CloudAccountsChart />':
      return <CloudAccountsChart />;
    case '<RiskAssessmentChart />':
      return <RiskAssessmentChart />;
    case '<WorkloadAlerts />':
      return <WorkloadAlerts />;
    case '<RegistryScan />':
      return <RegistryScan />;
    default:
      return <div>{content}</div>;
  }
};

const Index = () => {
  const { dashboard, addWidget, removeWidget } = useDashboardStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        {dashboard.categories.map((category) => (
          <div key={category.id} className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{category.name}</h2>
              <AddWidgetDialog categoryId={category.id} onAddWidget={addWidget} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {category.widgets.map((widget) => (
                <Card key={widget.id} className="p-6 relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => removeWidget(category.id, widget.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <h3 className="text-lg font-semibold mb-4">{widget.name}</h3>
                  <WidgetContent content={widget.content} />
                </Card>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Index;
