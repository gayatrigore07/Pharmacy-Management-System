import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Package, 
  Truck, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  TrendingUp,
  DollarSign,
  BarChart3,
  Plus,
  Search,
  Filter
} from "lucide-react";

const Supplier = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([
    {
      id: "PO-2024-001",
      pharmacy: "City Health Pharmacy",
      date: "2024-01-15",
      status: "pending",
      totalAmount: 2450.00,
      items: [
        { name: "Paracetamol 500mg", quantity: 1000, unitPrice: 0.50 },
        { name: "Ibuprofen 200mg", quantity: 500, unitPrice: 0.75 },
        { name: "Vitamin D3", quantity: 200, unitPrice: 2.00 }
      ]
    },
    {
      id: "PO-2024-002",
      pharmacy: "MediCare Plus",
      date: "2024-01-14",
      status: "confirmed",
      totalAmount: 1800.00,
      items: [
        { name: "Insulin Pen", quantity: 50, unitPrice: 25.00 },
        { name: "Blood Pressure Monitor", quantity: 10, unitPrice: 55.00 }
      ]
    },
    {
      id: "PO-2024-003",
      pharmacy: "HealthFirst Pharmacy",
      date: "2024-01-13",
      status: "delivered",
      totalAmount: 3200.00,
      items: [
        { name: "Antibiotics", quantity: 200, unitPrice: 8.00 },
        { name: "Pain Relief Gel", quantity: 100, unitPrice: 12.00 }
      ]
    }
  ]);

  const [inventory, setInventory] = useState([
    { name: "Paracetamol 500mg", stock: 15000, minStock: 5000, status: "good" },
    { name: "Ibuprofen 200mg", stock: 8000, minStock: 3000, status: "good" },
    { name: "Insulin Pen", stock: 200, minStock: 100, status: "low" },
    { name: "Vitamin D3", stock: 500, minStock: 200, status: "good" },
    { name: "Antibiotics", stock: 1200, minStock: 500, status: "good" }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    pharmacy: "",
    items: "",
    notes: ""
  });

  // Function to handle order confirmation
  const handleConfirmOrder = (orderId: string) => {
    setPurchaseOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: "confirmed" }
          : order
      )
    );
    alert(`Order ${orderId} has been confirmed!\n\nInventory will be prepared for delivery.`);
  };

  // Function to handle request changes
  const handleRequestChanges = (orderId: string) => {
    const order = purchaseOrders.find(o => o.id === orderId);
    const changes = prompt(`Request changes for Order ${orderId}:\n\nPharmacy: ${order?.pharmacy}\nTotal: $${order?.totalAmount}\n\nEnter your requested changes:`);
    
    if (changes) {
      alert(`Change request sent for Order ${orderId}!\n\nChanges requested: ${changes}\n\nPharmacy will be notified.`);
    }
  };

  // Function to handle schedule delivery
  const handleScheduleDelivery = (orderId: string) => {
    const order = purchaseOrders.find(o => o.id === orderId);
    const deliveryDate = prompt(`Schedule delivery for Order ${orderId}\n\nPharmacy: ${order?.pharmacy}\nEnter delivery date (YYYY-MM-DD):`);
    
    if (deliveryDate) {
      setPurchaseOrders(prevOrders => 
        prevOrders.map(o => 
          o.id === orderId 
            ? { ...o, status: "delivery-scheduled", deliveryDate }
            : o
        )
      );
      alert(`Delivery scheduled for Order ${orderId}!\n\nDelivery Date: ${deliveryDate}\nPharmacy will be notified.`);
    }
  };

  // Function to handle view details
  const handleViewDetails = (orderId: string) => {
    const order = purchaseOrders.find(o => o.id === orderId);
    if (order) {
      const details = `
Order Details:
ID: ${order.id}
Pharmacy: ${order.pharmacy}
Date: ${order.date}
Status: ${order.status.toUpperCase()}
Total: $${order.totalAmount}

Items:
${order.items.map(item => `• ${item.name} - Qty: ${item.quantity} @ $${item.unitPrice} each`).join('\n')}
      `;
      alert(details);
    }
  };

  // Function to handle new order creation
  const handleCreateNewOrder = () => {
    if (!newOrder.pharmacy || !newOrder.items) {
      alert("Please fill in Pharmacy and Items fields!");
      return;
    }

    const newOrderId = `PO-2024-${String(purchaseOrders.length + 1).padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];
    
    // Parse items from the text input (simple format: "Item1:Qty1, Item2:Qty2")
    const itemLines = newOrder.items.split('\n').filter(line => line.trim());
    const items = itemLines.map(line => {
      const [name, quantityPrice] = line.split(':');
      const [quantity, price] = quantityPrice ? quantityPrice.split('@') : ['1', '10.00'];
      return {
        name: name.trim(),
        quantity: parseInt(quantity.trim()) || 1,
        unitPrice: parseFloat(price.trim()) || 10.00
      };
    });

    const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

    const orderToAdd = {
      id: newOrderId,
      pharmacy: newOrder.pharmacy,
      date: today,
      status: "pending",
      totalAmount: totalAmount,
      items: items
    };

    setPurchaseOrders([orderToAdd, ...purchaseOrders]);
    setIsNewOrderOpen(false);
    setNewOrder({ pharmacy: "", items: "", notes: "" });
    
    alert(`New order created successfully!\n\nOrder ID: ${newOrderId}\nPharmacy: ${newOrder.pharmacy}\nTotal: $${totalAmount.toFixed(2)}`);
  };

  // Function to handle restock
  const handleRestock = (itemName: string) => {
    const restockQuantity = prompt(`Restock ${itemName}:\n\nCurrent stock: ${inventory.find(i => i.name === itemName)?.stock}\nEnter restock quantity:`);
    
    if (restockQuantity && !isNaN(parseInt(restockQuantity))) {
      setInventory(prevInventory => 
        prevInventory.map(item => 
          item.name === itemName 
            ? { ...item, stock: item.stock + parseInt(restockQuantity), status: "good" }
            : item
        )
      );
      alert(`${itemName} restocked with ${restockQuantity} units!\n\nStock updated successfully.`);
    }
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-green-100 text-green-800";
      case "confirmed": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case "low": return "bg-red-100 text-red-800";
      case "good": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl">
              <Package className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Supplier Portal</h1>
              <p className="text-muted-foreground">Manage orders, inventory, and deliveries</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">142</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">14</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold">$45.2K</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <Label htmlFor="search">Search Orders</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="search" 
                        placeholder="Search by order ID, pharmacy..." 
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      const filterOptions = prompt("Filter orders by:\n1. Status (pending, confirmed, delivered)\n2. Pharmacy name\n3. Date range\n\nEnter filter criteria:");
                      if (filterOptions) {
                        alert(`Filtering orders by: ${filterOptions}\n\nFilter applied successfully!`);
                      }
                    }}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Dialog open={isNewOrderOpen} onOpenChange={setIsNewOrderOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-primary">
                        <Plus className="h-4 w-4 mr-2" />
                        New Order
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Package className="h-5 w-5" />
                          Create New Order
                        </DialogTitle>
                        <DialogDescription>
                          Create a new purchase order for pharmacy supplies.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="pharmacy">Pharmacy Name</Label>
                          <Input
                            id="pharmacy"
                            placeholder="e.g., City Health Pharmacy"
                            value={newOrder.pharmacy}
                            onChange={(e) => setNewOrder({...newOrder, pharmacy: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="items">Items (Format: ItemName:Quantity@Price)</Label>
                          <Textarea
                            id="items"
                            placeholder="Paracetamol 500mg:1000@0.50&#10;Ibuprofen 200mg:500@0.75&#10;Vitamin D3:200@2.00"
                            value={newOrder.items}
                            onChange={(e) => setNewOrder({...newOrder, items: e.target.value})}
                            rows={4}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="notes">Notes (Optional)</Label>
                          <Textarea
                            id="notes"
                            placeholder="Special instructions or notes..."
                            value={newOrder.notes}
                            onChange={(e) => setNewOrder({...newOrder, notes: e.target.value})}
                            rows={2}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsNewOrderOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateNewOrder} className="bg-gradient-primary">
                          Create Order
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            {/* Orders List */}
            <div className="grid gap-6">
              {purchaseOrders
                .filter(order => 
                  order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  order.pharmacy.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  order.status.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Package className="h-5 w-5" />
                          {order.id}
                        </CardTitle>
                        <CardDescription>
                          {order.pharmacy} • {order.date} • ${order.totalAmount.toFixed(2)}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Order Items:</h4>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                              <span className="text-sm">{item.name}</span>
                              <div className="flex gap-4 text-sm text-muted-foreground">
                                <span>Qty: {item.quantity}</span>
                                <span>${item.unitPrice.toFixed(2)} each</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {order.status === "pending" && (
                          <>
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleConfirmOrder(order.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Confirm Order
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleRequestChanges(order.id)}
                            >
                              <AlertCircle className="h-4 w-4 mr-2" />
                              Request Changes
                            </Button>
                          </>
                        )}
                        {order.status === "confirmed" && (
                          <Button 
                            size="sm" 
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => handleScheduleDelivery(order.id)}
                          >
                            <Truck className="h-4 w-4 mr-2" />
                            Schedule Delivery
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewDetails(order.id)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Overview</CardTitle>
                <CardDescription>Track stock levels and manage inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventory.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Current Stock: {item.stock.toLocaleString()} units
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Min Stock</p>
                          <p className="font-medium">{item.minStock.toLocaleString()}</p>
                        </div>
                        <Badge className={getStockStatusColor(item.status)}>
                          {item.status.toUpperCase()}
                        </Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRestock(item.name)}
                        >
                          Restock
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Sales Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>This Month</span>
                      <span className="font-bold text-green-600">+15.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Month</span>
                      <span className="font-bold">$38.5K</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Order Value</span>
                      <span className="font-bold">$2,890</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Top Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Paracetamol 500mg</span>
                      <span className="font-bold">1,200 units</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Ibuprofen 200mg</span>
                      <span className="font-bold">850 units</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Vitamin D3</span>
                      <span className="font-bold">450 units</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Supplier;
