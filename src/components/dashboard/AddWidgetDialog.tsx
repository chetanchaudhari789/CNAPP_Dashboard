
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface AddWidgetFormData {
  name: string;
  content: string;
}

interface AddWidgetDialogProps {
  categoryId: string;
  onAddWidget: (categoryId: string, widget: { name: string; content: string }) => void;
}

export function AddWidgetDialog({ categoryId, onAddWidget }: AddWidgetDialogProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>([]);

  const availableWidgets = [
    { id: "cloud-accounts", name: "Cloud Accounts", category: "CSPM", content: "<CloudAccountsChart />" },
    { id: "risk-assessment", name: "Cloud Account Risk Assessment", category: "CSPM", content: "<RiskAssessmentChart />" },
    { id: "workload-alerts", name: "Workload Alerts", category: "CWPP", content: "<WorkloadAlerts />" },
    { id: "registry-scan", name: "Registry Scan", category: "Image", content: "<RegistryScan />" },
    { id: "ticket-overview", name: "Ticket Overview", category: "Ticket", content: "Ticket Overview content placeholder" },
  ];

  const filteredWidgets = availableWidgets.filter(widget => 
    widget.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleWidgetToggle = (widgetId: string) => {
    if (selectedWidgets.includes(widgetId)) {
      setSelectedWidgets(prev => prev.filter(id => id !== widgetId));
    } else {
      setSelectedWidgets(prev => [...prev, widgetId]);
    }
  };

  const handleConfirm = () => {
    selectedWidgets.forEach(widgetId => {
      const widget = availableWidgets.find(w => w.id === widgetId);
      if (widget) {
        onAddWidget(categoryId, {
          name: widget.name,
          content: widget.content
        });
      }
    });
    setOpen(false);
    setSelectedWidgets([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Widget
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Widget</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search widgets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Tabs defaultValue="CSPM">
            <TabsList className="w-full">
              <TabsTrigger value="CSPM">CSPM</TabsTrigger>
              <TabsTrigger value="CWPP">CWPP</TabsTrigger>
              <TabsTrigger value="Image">Image</TabsTrigger>
              <TabsTrigger value="Ticket">Ticket</TabsTrigger>
            </TabsList>
            {["CSPM", "CWPP", "Image", "Ticket"].map((category) => (
              <TabsContent key={category} value={category} className="pt-4">
                <div className="space-y-2">
                  {filteredWidgets
                    .filter(widget => widget.category === category)
                    .map(widget => (
                      <div
                        key={widget.id}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-md border",
                          selectedWidgets.includes(widget.id) && "border-primary bg-primary/5"
                        )}
                      >
                        <span>{widget.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleWidgetToggle(widget.id)}
                        >
                          {selectedWidgets.includes(widget.id) ? (
                            <X className="h-4 w-4" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
