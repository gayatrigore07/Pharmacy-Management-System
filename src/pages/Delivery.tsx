import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Search, Truck, MapPin, Clock, CheckCircle, PauseCircle } from "lucide-react";

type DeliveryItem = {
  id: string;
  orderId: string;
  recipient: string;
  address: string;
  date: string;
  status: "pending" | "in-transit" | "delivered" | "delayed";
};

const Delivery = () => {
  const [tab, setTab] = useState<string>("overview");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const [deliveries, setDeliveries] = useState<DeliveryItem[]>([
    { id: "DLV-001", orderId: "ORD-001", recipient: "John Doe", address: "12 Park Ave, City", date: "2025-11-08", status: "delivered" },
    { id: "DLV-002", orderId: "ORD-002", recipient: "Jane Smith", address: "45 River Rd, City", date: "2025-11-10", status: "in-transit" },
    { id: "DLV-003", orderId: "ORD-003", recipient: "Acme Clinic", address: "88 Health St, City", date: "2025-11-11", status: "pending" },
  ]);

  const filtered = deliveries.filter(d => {
    if (filter !== "all" && d.status !== filter) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return d.recipient.toLowerCase().includes(q) || d.address.toLowerCase().includes(q) || d.orderId.toLowerCase().includes(q) || d.id.toLowerCase().includes(q);
  });

  const updateStatus = (id: string, status: DeliveryItem["status"]) => {
    setDeliveries(prev => prev.map(d => d.id === id ? { ...d, status } : d));
    alert(`Delivery ${id} marked as ${status}`);
  };

  const scheduleDelivery = (id: string) => {
    const date = prompt("Enter new delivery date (YYYY-MM-DD):");
    if (date) {
      setDeliveries(prev => prev.map(d => d.id === id ? { ...d, date } : d));
      alert(`Delivery ${id} rescheduled to ${date}`);
    }
  };

  const viewDetails = (d: DeliveryItem) => {
    const details = `Delivery: ${d.id}\nOrder: ${d.orderId}\nRecipient: ${d.recipient}\nAddress: ${d.address}\nDate: ${d.date}\nStatus: ${d.status}`;
    alert(details);
  };

  const getBadgeVariant = (status: DeliveryItem["status"]) => {
    switch (status) {
      case "delivered": return "default";
      case "in-transit": return "secondary";
      case "pending": return "outline";
      case "delayed": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-xl">
            <Truck className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Delivery Dashboard</h1>
            <p className="text-muted-foreground">Track and manage outgoing deliveries</p>
          </div>
        </div>

        <Card>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-4 items-start">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-10" placeholder="Search by delivery id, order id, recipient or address..." value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
              </div>

              <div className="w-full lg:w-64">
                <Select onValueChange={(v) => setFilter(v)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-transit">In Transit</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="delayed">Delayed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Button className="bg-gradient-primary" onClick={() => setTab(tab === "overview" ? "map" : "overview")}>
                  {tab === "overview" ? <MapPin className="h-4 w-4 mr-2" /> : <Clock className="h-4 w-4 mr-2" />}
                  {tab === "overview" ? "Show Map View" : "Show Overview"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="deliveries">
          <TabsList>
            <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="deliveries" className="space-y-4">
            <div className="grid gap-4">
              {filtered.map(d => (
                <Card key={d.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Truck className="h-4 w-4" />
                          {d.id} — {d.orderId}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{d.recipient} • {d.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getBadgeVariant(d.status)}>{d.status.toUpperCase()}</Badge>
                        <div className="flex flex-col items-end">
                          <span className="text-sm font-medium">{d.date}</span>
                          <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm" onClick={() => viewDetails(d)}>View</Button>
                            <Button size="sm" onClick={() => updateStatus(d.id, "in-transit")}>Start</Button>
                            <Button variant="ghost" size="sm" onClick={() => scheduleDelivery(d.id)}>Reschedule</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}

              {filtered.length === 0 && (
                <Card>
                  <CardContent className="text-center text-muted-foreground">No deliveries found for current filters.</CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4">
                    <h3 className="text-sm text-muted-foreground">Total Deliveries</h3>
                    <p className="text-2xl font-bold">{deliveries.length}</p>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm text-muted-foreground">In Transit</h3>
                    <p className="text-2xl font-bold">{deliveries.filter(d => d.status === "in-transit").length}</p>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm text-muted-foreground">Delivered</h3>
                    <p className="text-2xl font-bold">{deliveries.filter(d => d.status === "delivered").length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Delivery;
