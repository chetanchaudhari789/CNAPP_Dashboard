
import { Button } from "@/components/ui/button";
import { Settings, Plus } from "lucide-react";
import { AddWidgetDialog } from "./AddWidgetDialog";
import { useDashboardStore } from "@/store/dashboardData";

const DashboardHeader = () => {
  const { dashboard, addWidget } = useDashboardStore();
  
  // Get the first category to add widgets to from the header
  const firstCategoryId = dashboard.categories.length > 0 ? dashboard.categories[0].id : '';
  
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">CNAPP Dashboard</h1>
            <p className="text-sm text-gray-500">CSPM Executive Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            {firstCategoryId && (
              <AddWidgetDialog categoryId={firstCategoryId} onAddWidget={addWidget} />
            )}
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
